// 12500 → "12.500 Kz"
export function kz(valor: number): string {
  const inteiro = Math.round(valor).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return `${inteiro} Kz`
}

const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
const DIAS = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado']

// "2026-10-03" → partes, sem depender do fuso do dispositivo
export function partesData(iso: string) {
  const [a, m, d] = iso.split('-').map(Number)
  const semana = new Date(Date.UTC(a, m - 1, d)).getUTCDay()
  return { ano: a, mes: m, dia: d, semana, mesCurto: MESES[m - 1], diaSemana: DIAS[semana] }
}

// "2026-10-03" → "sábado, 03/10/2026"
export function dataLonga(iso: string): string {
  const p = partesData(iso)
  return `${p.diaSemana}, ${String(p.dia).padStart(2, '0')}/${String(p.mes).padStart(2, '0')}/${p.ano}`
}
