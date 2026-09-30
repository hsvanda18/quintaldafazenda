import { Minus, Plus, Search, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { CORTES, MENU, type Categoria, type Corte, type Prato } from '../data/menu'
import { kz } from '../lib/format'
import { usePedido } from '../state/pedido'
import { BoiCortes } from './BoiCortes'

const normalizar = (t: string) =>
  t
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')

export function Carta() {
  const [busca, setBusca] = useState('')
  const [activa, setActiva] = useState(MENU[0].id)
  const [corte, setCorte] = useState<Corte | null>(null)
  const tabsRef = useRef<HTMLDivElement>(null)

  const termo = normalizar(busca.trim())
  const categorias = useMemo(() => {
    if (!termo) return MENU
    return MENU.map((c) => ({
      ...c,
      pratos: c.pratos.filter((p) => normalizar(`${p.nome} ${p.descricao}`).includes(termo)),
    })).filter((c) => c.pratos.length > 0)
  }, [termo])

  // Tab activa segue o scroll
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entradas) => {
        const visivel = entradas.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visivel) setActiva(visivel.target.id.replace('cat-', ''))
      },
      { rootMargin: '-120px 0px -60% 0px' },
    )
    categorias.forEach((c) => {
      const el = document.getElementById(`cat-${c.id}`)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [categorias])

  // Mantém a tab activa visível na barra horizontal
  useEffect(() => {
    const tab = tabsRef.current?.querySelector<HTMLElement>(`[data-cat="${activa}"]`)
    const barra = tabsRef.current
    if (tab && barra) barra.scrollTo({ left: tab.offsetLeft - 16, behavior: 'smooth' })
  }, [activa])

  return (
    <section id="carta" aria-labelledby="carta-titulo" className="border-t border-ouro/30 bg-mato-900">
      <div className="mx-auto max-w-page px-4 pt-12 sm:px-6 lg:pt-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 id="carta-titulo" className="titulo-cartaz text-[clamp(2.5rem,10vw,4.5rem)]">
              A Carta
            </h2>
            <p className="mt-3 max-w-[46ch] text-creme-dim">
              Junte os pratos ao pré-pedido e a cozinha recebe tudo com a sua reserva.
              <span className="mt-1 block text-[0.875rem] text-creme-mute">Dados de demonstração: pratos e preços por confirmar.</span>
            </p>
          </div>
          <label className="relative block w-full lg:max-w-sm">
            <span className="sr-only">Procurar prato pelo nome</span>
            <Search aria-hidden strokeWidth={1.5} className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-ouro" />
            <input
              type="search"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Procurar: muamba, picanha…"
              className="h-12 w-full rounded-xs border border-ouro/50 bg-mato-950 pl-10 pr-11 text-creme placeholder:text-creme-mute transition-colors focus:border-ouro focus:outline-none"
            />
            {busca && (
              <button
                type="button"
                onClick={() => setBusca('')}
                aria-label="Limpar pesquisa"
                className="absolute right-0 top-0 grid size-12 place-items-center text-creme-dim hover:text-creme"
              >
                <X className="size-5" strokeWidth={1.5} />
              </button>
            )}
          </label>
        </div>
      </div>

      {/* Tabs de categorias, fixas por baixo da barra do topo */}
      <nav
        aria-label="Categorias da carta"
        className="sticky top-[var(--topo)] z-30 mt-8 border-y border-ouro/30 bg-mato-900/95 backdrop-blur-[2px]"
      >
        <div ref={tabsRef} className="mx-auto flex max-w-page gap-1 overflow-x-auto px-2 [scrollbar-width:none] sm:px-4">
          {categorias.map((c) => (
            <a
              key={c.id}
              href={`#cat-${c.id}`}
              data-cat={c.id}
              aria-current={activa === c.id ? 'true' : undefined}
              className={`relative flex min-h-[48px] shrink-0 items-center whitespace-nowrap px-3 font-slab text-[1rem] font-semibold transition-colors duration-150 ${
                activa === c.id ? 'text-ouro-claro' : 'text-creme-dim hover:text-creme'
              }`}
            >
              {c.nome}
              <span
                aria-hidden
                className={`absolute inset-x-3 bottom-0 h-[2px] bg-ouro transition-opacity duration-150 ${activa === c.id ? 'opacity-100' : 'opacity-0'}`}
              />
            </a>
          ))}
        </div>
      </nav>

      <div className="mx-auto max-w-page px-4 pb-16 sm:px-6 lg:pb-24">
        {categorias.length === 0 && (
          <p className="py-16 text-center text-creme-dim">
            Nenhum prato com “{busca}”. Experimente outro nome ou{' '}
            <button type="button" className="text-ouro-claro underline" onClick={() => setBusca('')}>
              veja a carta toda
            </button>
            .
          </p>
        )}
        {categorias.map((c) =>
          c.id === 'grelhados' && !termo ? (
            <Grelhados key={c.id} categoria={c} corte={corte} setCorte={setCorte} />
          ) : (
            <BlocoCategoria key={c.id} categoria={c} pratos={c.pratos} />
          ),
        )}
      </div>
    </section>
  )
}

function CabecaCategoria({ categoria }: { categoria: Categoria }) {
  return (
    <header className="mb-2">
      <div className="regua">
        <h3 className="min-w-0 font-cartaz text-[clamp(1.35rem,6.4vw,2.25rem)] uppercase leading-none text-creme">{categoria.nome}</h3>
      </div>
      {categoria.nota && <p className="mt-2 text-[0.9375rem] text-creme-dim">{categoria.nota}</p>}
    </header>
  )
}

function BlocoCategoria({ categoria, pratos }: { categoria: Categoria; pratos: Prato[] }) {
  return (
    <section id={`cat-${categoria.id}`} aria-label={categoria.nome} className="scroll-mt-[calc(var(--topo)+3.5rem)] pt-12">
      <CabecaCategoria categoria={categoria} />
      <ul className="grid gap-x-12 lg:grid-cols-2">
        {pratos.map((p) => (
          <PratoLinha key={p.id} prato={p} />
        ))}
      </ul>
    </section>
  )
}

function Grelhados({ categoria, corte, setCorte }: { categoria: Categoria; corte: Corte | null; setCorte: (c: Corte | null) => void }) {
  const pratos = corte ? categoria.pratos.filter((p) => p.cortes?.includes(corte)) : categoria.pratos
  const cortes = Object.keys(CORTES) as Corte[]
  return (
    <section id={`cat-${categoria.id}`} aria-label={categoria.nome} className="scroll-mt-[calc(var(--topo)+3.5rem)] pt-12">
      <CabecaCategoria categoria={categoria} />
      <div className="grid gap-x-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <div className="lg:sticky lg:top-[calc(var(--topo)+4.5rem)] lg:self-start">
          <div className="mt-4 border border-ouro/40 bg-mato px-2 pb-3 pt-2 sm:px-4">
            <BoiCortes activo={corte} onEscolher={setCorte} />
            <div className="mt-2 flex flex-wrap gap-1.5" role="group" aria-label="Filtrar por corte">
              <Chip on={corte === null} onClick={() => setCorte(null)}>
                Todos
              </Chip>
              {cortes.map((c) => (
                <Chip key={c} on={corte === c} onClick={() => setCorte(corte === c ? null : c)}>
                  {CORTES[c]}
                </Chip>
              ))}
            </div>
          </div>
          <p className="mt-3 text-[0.875rem] text-creme-mute" aria-live="polite">
            {corte ? `${pratos.length} ${pratos.length === 1 ? 'prato' : 'pratos'} com ${CORTES[corte].toLowerCase()}` : 'Vaca, frango, cabrito e peixe, tudo na lenha.'}
          </p>
        </div>
        <ul>
          {pratos.map((p) => (
            <PratoLinha key={p.id} prato={p} />
          ))}
        </ul>
      </div>
    </section>
  )
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`min-h-[44px] rounded-xs border px-3 font-slab text-[0.9375rem] font-semibold transition-colors duration-150 ${
        on ? 'border-ouro bg-ouro text-mato-950' : 'border-ouro/40 text-creme-dim hover:border-ouro hover:text-creme'
      }`}
    >
      {children}
    </button>
  )
}

export function PratoLinha({ prato }: { prato: Prato }) {
  const { quantidadeDe, adicionar, definir } = usePedido()
  const q = quantidadeDe(prato.id)
  return (
    <li className="border-b border-ouro/20 pb-3 pt-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h4 className={`font-slab text-[1.25rem] font-semibold leading-tight ${prato.esgotado ? 'text-creme-mute' : 'text-creme'}`}>
            {prato.nome}
          </h4>
          {prato.tags && (
            <p className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
              {prato.tags.map((t) => (
                <span key={t} className={`rotulo text-[0.6875rem] ${t === 'Picante' ? 'text-ouro-claro' : t === 'Especialidade da casa' ? 'text-ouro' : 'text-campo-claro'}`}>
                  {t}
                </span>
              ))}
            </p>
          )}
          <p className="mt-1.5 max-w-[52ch] text-[0.9375rem] leading-snug text-creme-dim">{prato.descricao}</p>
        </div>
        <span className="cordel mt-0.5 shrink-0">
          <span className={`etiqueta ${prato.esgotado ? 'line-through decoration-2 opacity-60' : ''}`}>{kz(prato.preco)}</span>
        </span>
      </div>

      <div className="mt-2">
        {prato.esgotado ? (
          <p className="rotulo py-3 text-creme-mute">Esgotado hoje</p>
        ) : q === 0 ? (
          <button
            type="button"
            onClick={() => adicionar(prato.id)}
            aria-label={`Adicionar ${prato.nome} ao pré-pedido`}
            className="group -ml-1 inline-flex min-h-[44px] items-center gap-2 rounded-xs px-1 font-slab text-[0.9375rem] font-semibold text-ouro-claro transition-colors duration-150 hover:text-creme"
          >
            <span className="grid size-7 place-items-center rounded-xs border border-ouro/60 transition-colors duration-150 group-hover:border-ouro group-hover:bg-ouro group-hover:text-mato-950">
              <Plus aria-hidden className="size-4" strokeWidth={1.75} />
            </span>
            Adicionar ao pré-pedido
          </button>
        ) : (
          <Quantidade nome={prato.nome} valor={q} onChange={(n) => definir(prato.id, n)} />
        )}
      </div>
    </li>
  )
}

export function Quantidade({ nome, valor, onChange, claro }: { nome: string; valor: number; onChange: (n: number) => void; claro?: boolean }) {
  const cor = claro ? 'border-mato-950/40 text-mato-950 hover:bg-mato-950/10' : 'border-ouro/60 text-creme hover:bg-ouro/10'
  return (
    <div className="inline-flex items-center gap-1" role="group" aria-label={`Quantidade de ${nome}`}>
      <button type="button" onClick={() => onChange(valor - 1)} aria-label={`Tirar um ${nome}`} className={`grid size-11 place-items-center rounded-xs border transition-colors ${cor}`}>
        <Minus className="size-4" strokeWidth={1.5} />
      </button>
      <output className={`num w-9 text-center font-slab text-[1.125rem] font-semibold ${claro ? 'text-mato-950' : 'text-creme'}`} aria-live="polite">
        {valor}
      </output>
      <button type="button" onClick={() => onChange(valor + 1)} aria-label={`Mais um ${nome}`} className={`grid size-11 place-items-center rounded-xs border transition-colors ${cor}`}>
        <Plus className="size-4" strokeWidth={1.5} />
      </button>
      {!claro && <span className="ml-2 text-[0.875rem] text-campo-claro">No pré-pedido</span>}
    </div>
  )
}
