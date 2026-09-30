import { EstadoAberto } from './EstadoAberto'

const LIGACOES = [
  { href: '#carta', nome: 'Carta' },
  { href: '#eventos', nome: 'Eventos' },
  { href: '#quintal', nome: 'O Quintal' },
  { href: '#visitar', nome: 'Visitar' },
]

export function Cabecalho() {
  return (
    <header className="sticky top-0 z-40 h-[var(--topo)] border-b border-ouro/30 bg-mato/95 backdrop-blur-[2px]">
      <div className="mx-auto flex h-full max-w-page items-center gap-4 px-4 sm:px-6">
        <a href="#topo" className="shrink-0" aria-label="Quintal da Fazenda, início">
          <img src="/fotos/logo-hero.webp" alt="" width="668" height="500" className="block h-12 w-auto sm:h-14" />
        </a>
        <EstadoAberto compacto className="min-w-0 md:hidden" />
        <EstadoAberto className="hidden md:flex" />
        <nav aria-label="Secções" className="ml-auto hidden items-center gap-1 lg:flex">
          {LIGACOES.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-xs px-3 py-2 font-slab text-[1rem] font-semibold text-creme-dim transition-colors hover:text-ouro-claro"
            >
              {l.nome}
            </a>
          ))}
        </nav>
        <a href="#reservar" className="btn-ouro ml-auto px-4 text-[0.9375rem] lg:ml-2">
          Reservar
        </a>
      </div>
    </header>
  )
}
