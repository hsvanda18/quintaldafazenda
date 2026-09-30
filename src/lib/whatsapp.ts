import { WHATSAPP_NUMERO } from '../config'
import { ZONAS, type Zona } from '../data/reserva'
import { dataLonga, kz } from './format'

export interface LinhaPedido {
  nome: string
  quantidade: number
  preco: number
}

export interface DadosReserva {
  data: string
  hora: string
  pessoas: number
  zona: Zona
  evento?: string
  pedido: LinhaPedido[]
  servir: 'chegada' | 'aviso'
  nome: string
  telemovel: string
  observacoes: string
}

export function mensagemReserva(r: DadosReserva): string {
  const zona = ZONAS.find((z) => z.id === r.zona)?.nome ?? r.zona
  const linhas = [
    '*NOVA RESERVA · Quintal da Fazenda*',
    '',
    `Data: ${dataLonga(r.data)}`,
    `Hora de chegada: ${r.hora}`,
    `Pessoas: ${r.pessoas}`,
    `Zona: ${zona}`,
  ]
  if (r.evento) linhas.push(`Evento: ${r.evento}`)

  linhas.push('', '*PRÉ-PEDIDO*')
  if (r.pedido.length === 0) {
    linhas.push('Sem pré-pedido. Pedem à mesa.')
  } else {
    const total = r.pedido.reduce((s, l) => s + l.preco * l.quantidade, 0)
    for (const l of r.pedido) linhas.push(`${l.quantidade}x ${l.nome} — ${kz(l.preco * l.quantidade)}`)
    linhas.push(`*Total: ${kz(total)}*`)
    linhas.push(r.servir === 'chegada' ? `Servir: logo que cheguem (${r.hora})` : 'Servir: esperar pelo aviso do cliente à mesa')
  }

  linhas.push('', `Nome: ${r.nome}`, `Telemóvel: +244 ${r.telemovel}`)
  if (r.observacoes.trim()) linhas.push(`Observações: ${r.observacoes.trim()}`)
  return linhas.join('\n')
}

export function linkWhatsApp(texto?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMERO}`
  return texto ? `${base}?text=${encodeURIComponent(texto)}` : base
}
