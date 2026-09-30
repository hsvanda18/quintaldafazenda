import { SOBRE } from '../data/sobre'
import { Foto } from './Foto'

const FORMA: Record<(typeof SOBRE.galeria)[number]['forma'], string> = {
  arco: 'row-span-2',
  largo: 'col-span-2',
  quadrado: '',
  faixa: 'col-span-2 sm:col-span-3',
}

export function Quintal() {
  return (
    <section id="quintal" aria-labelledby="quintal-titulo" className="border-t border-ouro/30 bg-mato-900">
      <div className="mx-auto grid max-w-page gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-5">
          <h2 id="quintal-titulo" className="titulo-cartaz text-[clamp(2.25rem,8.5vw,3rem)]">
            {SOBRE.titulo}
          </h2>
          <div className="mt-5 space-y-4 text-[1.0625rem] text-creme-dim">
            {SOBRE.paragrafos.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="regua mt-8 max-w-xs" aria-hidden>
            <span className="rotulo">Sabor que vem da terra</span>
          </div>
        </div>

        <ul className="grid grid-flow-dense auto-rows-[8.5rem] grid-cols-2 gap-2 sm:auto-rows-[11rem] sm:grid-cols-3 sm:gap-3 lg:col-span-7" aria-label="Galeria do espaço">
          {SOBRE.galeria.map((g) => (
            <li key={g.foto} className={FORMA[g.forma]}>
              {g.forma === 'arco' ? (
                <div className="arco-moldura h-full">
                  <Foto legenda={g.foto} arco className="h-full w-full" />
                </div>
              ) : (
                <Foto legenda={g.foto} className="h-full w-full" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
