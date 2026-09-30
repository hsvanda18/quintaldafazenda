// ÚNICO sítio para os números oficiais do restaurante (só dígitos, com o indicativo 244).
// WhatsApp: recebe as reservas e os pré-pedidos.
export const WHATSAPP_NUMERO = '244934968282'
// Telefones para ligar: o primeiro é o principal (vai também para o Google).
export const TELEFONES = ['244934968282', '244934682121']
export const TELEMOVEL_NUMERO = TELEFONES[0]

// Formato legível: "+244 934 968 282"
export function formatarTelemovel(numero: string): string {
  const local = numero.replace(/^244/, '')
  return `+244 ${local.slice(0, 3)} ${local.slice(3, 6)} ${local.slice(6)}`
}
