// Texto da secção "O Quintal" e legendas da galeria (fotos por trocar).

export const SOBRE = {
  titulo: 'Um quintal, uma brasa, mesas compridas',
  paragrafos: [
    'Aqui come-se como numa fazenda: a carne sai da lenha, o funge vem batido na hora e a mesa enche-se de gente.',
    'Há sombra de árvore ao almoço, música à noite e, de vez em quando, uma passadeira de madeira para desfiles.',
  ],
  galeria: [
    { foto: 'a brasa ao fim da tarde', forma: 'arco' },
    { foto: 'esplanada com luzes', forma: 'largo' },
    { foto: 'mesa comprida com mufete', forma: 'quadrado' },
    { foto: 'detalhe: chapéus na parede', forma: 'quadrado' },
    { foto: 'desfile no quintal', forma: 'faixa' },
  ] as const,
}
