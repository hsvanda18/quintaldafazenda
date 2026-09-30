// Morada, redes e mapa. O número de telemóvel/WhatsApp está em src/config.ts.

export const LOCAL = {
  nome: 'Quintal da Fazenda',
  slogan: 'Sabor que vem da terra',
  morada: 'Rua Principal do Patriota',
  referencia: 'Em frente ao Eskebra',
  referenciaFrase: 'em frente ao Eskebra',
  cidade: 'Luanda',
  precoMedio: '14.000 a 16.000 Kz',
  precoMedioNota: 'por pessoa, ao jantar',
  instagram: 'quintal.da.fazenda',
  // Pesquisa usada pelo mapa e pelo botão "Como chegar"
  pesquisaMapa: 'Eskebra Patriota Luanda',
}

export const mapaEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(LOCAL.pesquisaMapa)}&output=embed`
export const comoChegarUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(LOCAL.pesquisaMapa)}`
export const instagramUrl = `https://www.instagram.com/${LOCAL.instagram}/`
