// DADOS DE DEMONSTRAÇÃO — agenda por confirmar.
// Os eventos com data anterior a hoje (hora de Luanda) desaparecem sozinhos.
// data: "AAAA-MM-DD", hora: "HH:MM"

export interface Evento {
  id: string
  titulo: string
  tipo: string
  data: string
  hora: string
  descricao: string
  foto: string
}

export const EVENTOS: Evento[] = [
  {
    id: 'semba-setembro',
    titulo: 'Semba no quintal',
    tipo: 'Música ao vivo',
    data: '2026-09-20',
    hora: '20:00',
    descricao: 'Banda ao vivo debaixo das árvores.',
    foto: 'banda no quintal',
  },
  {
    id: 'noite-kizomba',
    titulo: 'Sábado de semba e kizomba',
    tipo: 'Música ao vivo',
    data: '2026-10-03',
    hora: '20:30',
    descricao: 'Banda ao vivo a partir das 20h30. Pista aberta junto à esplanada.',
    foto: 'banda ao vivo',
  },
  {
    id: 'noite-cowboy',
    titulo: 'Noite Cowboy',
    tipo: 'Noite temática',
    data: '2026-10-10',
    hora: '19:30',
    descricao: 'Chapéu e botas à porta. Costela inteira a sair da brasa às 21h e country angolano até fechar.',
    foto: 'costela inteira na brasa',
  },
  {
    id: 'desfile-terra',
    titulo: 'Desfile “Terra”',
    tipo: 'Desfile de moda',
    data: '2026-10-17',
    hora: '19:00',
    descricao: 'Estilistas de Luanda desfilam na passadeira de madeira do quintal. Jantar servido depois.',
    foto: 'passadeira do desfile',
  },
  {
    id: 'domingo-mufete',
    titulo: 'Domingo de mufete',
    tipo: 'Almoço de família',
    data: '2026-10-25',
    hora: '12:30',
    descricao: 'Mufete para a mesa toda e música baixa. Lugares na esplanada esgotam cedo.',
    foto: 'mufete na mesa',
  },
  {
    id: 'noite-brasa',
    titulo: 'Noite da Brasa',
    tipo: 'Noite temática',
    data: '2026-11-07',
    hora: '19:30',
    descricao: 'O assador mostra os cortes à mesa e o boi inteiro sai em tábuas.',
    foto: 'tábuas de carne',
  },
]
