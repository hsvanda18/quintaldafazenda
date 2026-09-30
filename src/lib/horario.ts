import { FUSO, HORARIO, NOMES_DIAS } from '../data/horario'

// Hora actual em Luanda, independente do fuso do telemóvel
export function agoraLuanda(data = new Date()) {
  const partes = new Intl.DateTimeFormat('en-GB', {
    timeZone: FUSO,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'short',
    hourCycle: 'h23',
  }).formatToParts(data)
  const v = (t: string) => partes.find((p) => p.type === t)?.value ?? ''
  const semana = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(v('weekday'))
  return {
    iso: `${v('year')}-${v('month')}-${v('day')}`,
    semana,
    minutos: Number(v('hour')) * 60 + Number(v('minute')),
  }
}

const min = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

export interface Estado {
  aberto: boolean
  // Frase curta: "Fecha às 23h", "Abre hoje às 12h", "Abre terça às 12h"
  detalhe: string
}

const horaCurta = (hhmm: string) => (hhmm.endsWith(':00') ? `${Number(hhmm.slice(0, 2))}h` : hhmm.replace(':', 'h'))

export function estadoAgora(data = new Date()): Estado {
  const { semana, minutos } = agoraLuanda(data)
  const hoje = HORARIO[semana]
  const ontem = HORARIO[(semana + 6) % 7]

  // Ainda no turno de ontem, que passa da meia-noite
  if (ontem && min(ontem.fecha) < min(ontem.abre) && minutos < min(ontem.fecha)) {
    return { aberto: true, detalhe: `Fecha à ${horaCurta(ontem.fecha)}` }
  }
  if (hoje) {
    const abre = min(hoje.abre)
    const passaMeiaNoite = min(hoje.fecha) < abre
    const fecha = passaMeiaNoite ? min(hoje.fecha) + 1440 : min(hoje.fecha)
    if (minutos >= abre && minutos < fecha) {
      return { aberto: true, detalhe: `Fecha ${passaMeiaNoite ? 'à' : 'às'} ${horaCurta(hoje.fecha)}` }
    }
    if (minutos < abre) return { aberto: false, detalhe: `Abre hoje às ${horaCurta(hoje.abre)}` }
  }
  for (let i = 1; i <= 7; i++) {
    const d = (semana + i) % 7
    const turno = HORARIO[d]
    if (turno) {
      const quando = i === 1 ? 'amanhã' : NOMES_DIAS[d].toLowerCase()
      return { aberto: false, detalhe: `Abre ${quando} às ${horaCurta(turno.abre)}` }
    }
  }
  return { aberto: false, detalhe: 'Fechado' }
}

export function textoTurno(dia: number): string {
  const t = HORARIO[dia]
  if (!t) return 'Fechado'
  return `${t.abre} – ${t.fecha}`
}

export function abertoNoDia(iso: string): boolean {
  const [a, m, d] = iso.split('-').map(Number)
  return HORARIO[new Date(Date.UTC(a, m - 1, d)).getUTCDay()] !== null
}
