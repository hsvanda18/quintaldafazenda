import { ArrowDown } from 'lucide-react'
import { LOCAL } from '../data/local'
import { MENU } from '../data/menu'
import { kz } from '../lib/format'
import { EstadoAberto } from './EstadoAberto'
import { Foto } from './Foto'

const destaque = MENU.flatMap((c) => c.pratos).find((p) => p.id === 'picanha')

export function Hero() {
  return (
    <section id="topo" className="relative mx-auto max-w-page px-4 pb-12 pt-6 sm:px-6 lg:pb-20 lg:pt-14">
      <div className="grid gap-x-10 lg:grid-cols-12">
        <div className="lg:col-span-7 lg:pt-6">
          <h1 className="titulo-cartaz text-[clamp(2.75rem,12.4vw,6rem)]">
            Sabor que vem <span className="text-ouro">da terra</span>
          </h1>
          <p className="mt-4 max-w-[34ch] text-[1.0625rem] text-creme-dim lg:mt-6 lg:text-[1.25rem]">
            Reserve a mesa e mande o pedido antes de sair de casa. Quando chegar, a brasa já está a trabalhar.
          </p>
        </div>

        {/* Arco com a foto: à direita no computador, ao lado da informação no telemóvel */}
        <div className="mt-6 grid grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] items-end gap-4 lg:col-span-5 lg:row-span-2 lg:mt-0 lg:block">
          <div className="relative">
            <div className="arco-moldura">
              <Foto
                legenda="Picanha na brasa, com sal grosso, em cima das brasas"
                src="/fotos/picanha-640.webp"
                srcSet="/fotos/picanha-640.webp 640w, /fotos/picanha-1100.webp 1100w"
                sizes="(min-width: 1024px) 34rem, 45vw"
                arco
                prioridade
                className="aspect-[3/4] w-full object-[30%_center] lg:aspect-[4/5]"
              />
            </div>
            {destaque && (
              <div className="absolute -bottom-4 -left-1 flex origin-top-left -rotate-3 flex-col items-start lg:-left-10 lg:bottom-16">
                <span aria-hidden className="absolute -top-9 left-[13px] h-10 w-px origin-bottom rotate-[18deg] bg-ouro" />
                <span className="etiqueta text-[1rem] lg:text-[1.25rem]">{kz(destaque.preco)}</span>
                <span className="mt-1 bg-mato-950 px-2 py-0.5 font-slab text-[0.8125rem] font-semibold text-ouro-claro lg:text-[0.875rem]">
                  {destaque.nome}
                </span>
              </div>
            )}
          </div>

          <dl className="space-y-3 border-t border-ouro/50 pt-3 text-[0.9375rem] lg:hidden">
            <InfoPratica />
          </dl>
        </div>

        <div className="lg:col-span-7">
          <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-8">
            <a href="#reservar" className="btn-ouro sm:px-7">
              Reservar e pré-pedir
            </a>
            <a href="#carta" className="btn-linha sm:px-7">
              Ver a carta <ArrowDown aria-hidden className="size-4" strokeWidth={1.5} />
            </a>
          </div>
          <dl className="mt-10 hidden grid-cols-3 gap-6 border-t border-ouro/50 pt-4 lg:grid">
            <InfoPratica />
          </dl>
        </div>
      </div>
    </section>
  )
}

function InfoPratica() {
  return (
    <>
      <div>
        <dt className="rotulo text-ouro">Hoje</dt>
        <dd className="mt-1">
          <EstadoAberto className="flex-wrap gap-x-1.5 gap-y-0 text-[0.9375rem] lg:text-[1rem]" />
          <span className="block text-[0.875rem] text-creme-mute">Terça a domingo, desde as 12h</span>
        </dd>
      </div>
      <div>
        <dt className="rotulo text-ouro">Onde</dt>
        <dd className="mt-1 leading-snug text-creme-dim">
          {LOCAL.morada}, {LOCAL.referenciaFrase}
        </dd>
      </div>
      <div>
        <dt className="rotulo text-ouro">Jantar</dt>
        <dd className="num mt-1 leading-snug text-creme-dim">
          {LOCAL.precoMedio} {LOCAL.precoMedioNota}
        </dd>
      </div>
    </>
  )
}
