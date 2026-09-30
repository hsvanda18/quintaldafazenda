// Opções do formulário de reserva.

export type Zona = 'nao-fumadores' | 'fumadores' | 'esplanada'

export const ZONAS: { id: Zona; nome: string; detalhe: string }[] = [
  { id: 'nao-fumadores', nome: 'Não fumadores', detalhe: 'Sala interior, mais sossegada.' },
  { id: 'fumadores', nome: 'Fumadores', detalhe: 'Alpendre coberto, junto à brasa.' },
  { id: 'esplanada', nome: 'Esplanada', detalhe: 'Ao ar livre, perto da música e dos eventos.' },
]

export const HORAS_ALMOCO = ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30']
export const HORAS_JANTAR = ['19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00']

export const MAX_PESSOAS = 20

export const NOTAS_RAPIDAS = ['Aniversário', 'Alergias', 'Cadeira de bebé', 'Mesa acessível']
