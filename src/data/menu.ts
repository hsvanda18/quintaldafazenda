// DADOS DE DEMONSTRAÇÃO — pratos e preços por confirmar com a casa.
// Para editar: altere nomes, descrições e preços (em Kz, número inteiro).
// Para esconder um prato por um dia, ponha `esgotado: true`.

export type Tag = 'Picante' | 'Para partilhar' | 'Especialidade da casa' | 'Vegetariano'

// Cortes do boi desenhados na Carta de Cortes (secção Grelhados)
export type Corte = 'acem' | 'peito' | 'costela' | 'lombo' | 'vazia' | 'alcatra' | 'picanha'

export interface Prato {
  id: string
  nome: string
  descricao: string
  preco: number
  tags?: Tag[]
  cortes?: Corte[]
  esgotado?: boolean
}

export interface Categoria {
  id: string
  nome: string
  nota?: string
  pratos: Prato[]
}

export const CORTES: Record<Corte, string> = {
  acem: 'Acém',
  peito: 'Peito',
  costela: 'Costela',
  lombo: 'Lombo',
  vazia: 'Vazia',
  alcatra: 'Alcatra',
  picanha: 'Picanha',
}

export const MENU: Categoria[] = [
  {
    id: 'entradas',
    nome: 'Entradas',
    pratos: [
      {
        id: 'chourico-brasa',
        nome: 'Chouriço na brasa',
        descricao: 'Chouriço caseiro aberto na grelha, com pão de milho quente.',
        preco: 4500,
        tags: ['Para partilhar'],
      },
      {
        id: 'moelas',
        nome: 'Moelas estufadas',
        descricao: 'Moelas de galinha em molho de tomate, cebola e gindungo.',
        preco: 4000,
        tags: ['Picante'],
      },
      {
        id: 'pasteis-bacalhau',
        nome: 'Pastéis de bacalhau',
        descricao: 'Seis pastéis fritos na hora, com limão.',
        preco: 5000,
      },
      {
        id: 'ginguba-torrada',
        nome: 'Ginguba torrada e mandioca frita',
        descricao: 'Para ir petiscando enquanto a brasa trabalha.',
        preco: 3000,
        tags: ['Vegetariano', 'Para partilhar'],
      },
      {
        id: 'caldo-peixe',
        nome: 'Caldo de peixe da casa',
        descricao: 'Caldo quente de garoupa, com um toque de óleo de palma.',
        preco: 3500,
      },
    ],
  },
  {
    id: 'pratos-da-terra',
    nome: 'Pratos da Terra',
    nota: 'Servidos com funge ou arroz, à escolha.',
    pratos: [
      {
        id: 'muamba-galinha',
        nome: 'Muamba de galinha',
        descricao: 'Galinha rija cozinhada devagar em óleo de palma, quiabo e abóbora.',
        preco: 12500,
        tags: ['Especialidade da casa'],
      },
      {
        id: 'calulu-peixe',
        nome: 'Calulu de peixe seco',
        descricao: 'Peixe seco e fresco com rama de batata-doce, quiabo e tomate.',
        preco: 13000,
      },
      {
        id: 'mufete',
        nome: 'Mufete',
        descricao: 'Cacusso grelhado, feijão de óleo de palma, banana-pão, batata-doce e mandioca.',
        preco: 14500,
        tags: ['Especialidade da casa'],
      },
      {
        id: 'cabidela',
        nome: 'Galinha de cabidela',
        descricao: 'Galinha do campo em molho escuro, como se fazia na fazenda.',
        preco: 12000,
      },
      {
        id: 'kizaka-peixe',
        nome: 'Kizaka com peixe frito',
        descricao: 'Folha de mandioca pilada com ginguba, e carapau frito por cima.',
        preco: 10500,
        esgotado: true,
      },
      {
        id: 'feijoada-fazenda',
        nome: 'Feijoada da fazenda',
        descricao: 'Feijão com carnes de porco e chouriço. Só ao almoço.',
        preco: 11500,
        tags: ['Para partilhar'],
      },
    ],
  },
  {
    id: 'grelhados',
    nome: 'Grelhados',
    nota: 'Carne de vaca na brasa de lenha. Toque num corte do boi para ver os pratos.',
    pratos: [
      {
        id: 'picanha',
        nome: 'Picanha na brasa',
        descricao: '400 g em fatias grossas, sal grosso e mais nada.',
        preco: 18500,
        tags: ['Especialidade da casa'],
        cortes: ['picanha'],
      },
      {
        id: 'tabua-fazenda',
        nome: 'Tábua da Fazenda',
        descricao: 'Picanha, costela, lombo, chouriço e frango. Dá para duas a três pessoas.',
        preco: 34000,
        tags: ['Para partilhar', 'Especialidade da casa'],
        cortes: ['picanha', 'costela', 'lombo'],
      },
      {
        id: 'costela-lenta',
        nome: 'Costela de vaca lenta',
        descricao: 'Seis horas no fumo, acaba na grelha. Solta-se do osso.',
        preco: 16500,
        cortes: ['costela'],
      },
      {
        id: 'bife-lombo',
        nome: 'Bife do lombo',
        descricao: '300 g ao ponto que pedir, com manteiga de alho.',
        preco: 17000,
        cortes: ['lombo'],
      },
      {
        id: 'vazia',
        nome: 'Vazia com gordura',
        descricao: 'Corte largo e suculento, grelhado com a capa de gordura.',
        preco: 15500,
        cortes: ['vazia'],
      },
      {
        id: 'espeto-alcatra',
        nome: 'Espeto de alcatra',
        descricao: 'Cubos de alcatra, cebola roxa e pimento no espeto de ferro.',
        preco: 14500,
        cortes: ['alcatra'],
      },
      {
        id: 'peito-fumado',
        nome: 'Peito fumado',
        descricao: 'Peito de vaca fumado na lenha, cortado fino.',
        preco: 15000,
        cortes: ['peito'],
      },
      {
        id: 'acem-panela',
        nome: 'Acém de panela e brasa',
        descricao: 'Estufado com mandioca e acabado na grelha para ganhar crosta.',
        preco: 13500,
        cortes: ['acem'],
      },
      {
        id: 'frango-gindungo',
        nome: 'Frango de churrasco com gindungo',
        descricao: 'Meio frango aberto, marinado em limão, alho e gindungo.',
        preco: 9500,
        tags: ['Picante'],
      },
      {
        id: 'cabrito',
        nome: 'Cabrito na brasa',
        descricao: 'Perna de cabrito marinada de véspera.',
        preco: 14000,
      },
      {
        id: 'cacusso',
        nome: 'Cacusso grelhado',
        descricao: 'Inteiro, escalado, com molho de cebola e limão.',
        preco: 11000,
      },
    ],
  },
  {
    id: 'acompanhamentos',
    nome: 'Acompanhamentos',
    pratos: [
      { id: 'funge-bombo', nome: 'Funge de bombó', descricao: 'Da mandioca, bem batido.', preco: 2000 },
      { id: 'funge-milho', nome: 'Funge de milho', descricao: 'Pirão de fuba de milho.', preco: 2000 },
      { id: 'banana-pao', nome: 'Banana-pão cozida', descricao: 'Duas bananas, com óleo de palma.', preco: 1800 },
      { id: 'batata-doce', nome: 'Batata-doce assada', descricao: 'Feita na brasa, com casca.', preco: 1800 },
      { id: 'feijao-palma', nome: 'Feijão de óleo de palma', descricao: 'O do mufete, em dose própria.', preco: 2500 },
      { id: 'arroz', nome: 'Arroz branco', descricao: 'Soltinho.', preco: 1500 },
      { id: 'salada', nome: 'Salada da horta', descricao: 'Alface, tomate, cebola e pepino.', preco: 2500, tags: ['Vegetariano'] },
    ],
  },
  {
    id: 'sobremesas',
    nome: 'Sobremesas',
    pratos: [
      { id: 'cocada', nome: 'Cocada amarela', descricao: 'Receita de avó, com gema e canela.', preco: 3500 },
      { id: 'doce-ginguba', nome: 'Doce de ginguba', descricao: 'Ginguba caramelizada, em pedaços.', preco: 3000 },
      { id: 'mousse-maracuja', nome: 'Mousse de maracujá', descricao: 'Fresca e ácida, para depois da brasa.', preco: 3500 },
      { id: 'pudim', nome: 'Pudim de leite', descricao: 'Com calda de caramelo escuro.', preco: 3500 },
      { id: 'fruta', nome: 'Fruta da época', descricao: 'Manga, papaia ou ananás, conforme o mercado.', preco: 3000, tags: ['Vegetariano'] },
    ],
  },
  {
    id: 'bebidas',
    nome: 'Bebidas',
    pratos: [
      { id: 'cuca', nome: 'Cuca', descricao: 'Garrafa de 33 cl, bem gelada.', preco: 1000 },
      { id: 'nocal', nome: 'Nocal', descricao: 'Garrafa de 33 cl.', preco: 1000 },
      { id: 'kissangua', nome: 'Kissangua da casa', descricao: 'Bebida fermentada de milho, feita cá.', preco: 1500 },
      { id: 'sumo-mucua', nome: 'Sumo de múcua', descricao: 'Natural, feito no dia. Copo grande.', preco: 2000 },
      { id: 'agua', nome: 'Água 1,5 L', descricao: 'Sem gás.', preco: 800 },
      { id: 'jarro-sangria', nome: 'Jarro de sangria', descricao: 'Vinho tinto, fruta e canela. Um litro.', preco: 9000, tags: ['Para partilhar'] },
      { id: 'vinho-tinto', nome: 'Vinho tinto da casa', descricao: 'Garrafa de 75 cl.', preco: 12000 },
    ],
  },
]
