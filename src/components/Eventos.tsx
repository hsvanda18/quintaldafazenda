import { EVENTOS } from '../data/eventos'
import { partesData } from '../lib/format'
import { agoraLuanda } from '../lib/horario'
import { useAgora } from '../lib/useAgora'
import { usePedido } from '../state/pedido'
import { Foto } from './Foto'

export function Eventos() {
  const agora = useAgora()
  const { reservarPara } = usePedido()
  const hoje = agoraLuanda(agora).iso
  // Eventos passados escondem-se sozinhos (data de Luanda)
  const proximos = EVENTOS.filter((e) => e.data >= hoje).sort((a, b) => a.data.localeCompare(b.data))

  return (
    <section id="eventos" aria-labelledby="eventos-titulo" className="border-t border-ouro/30 bg-mato-950">
      <div className="mx-auto max-w-page px-4 py-14 sm:px-6 lg:py-24">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <h2 id="eventos-titulo" className="titulo-cartaz text-[clamp(2.5rem,10vw,4.5rem)]">
            No quintal
          </h2>
          <p className="max-w-[44ch] text-creme-dim lg:text-right">
            Música, desfiles e noites temáticas. Reserve para o dia e a mesa fica guardada.
            <span className="block text-[0.875rem] text-creme-mute">Agenda de demonstração.</span>
          </p>
        </div>

        {proximos.length === 0 ? (
          <p className="mt-10 text-creme-dim">Novos eventos em breve. Siga o Instagram para saber primeiro.</p>
        ) : (
          <ol className="mt-10 space-y-4">
            {proximos.map((e) => {
              const d = partesData(e.data)
              return (
                <li key={e.id} className="relative grid grid-cols-[5rem_minmax(0,1fr)] border border-ouro/50 bg-mato sm:grid-cols-[7rem_minmax(0,1fr)_auto] lg:grid-cols-[8rem_minmax(0,1fr)_14rem_auto]">
                  {/* canhoto do bilhete: a data */}
                  <p className="relative flex flex-col items-center justify-center border-r border-dashed border-ouro/60 px-2 py-5 text-center">
                    <span className="rotulo block text-ouro">{d.mesCurto}</span>
                    <span className="num block font-cartaz text-[2.75rem] leading-none text-creme sm:text-[3.5rem]">{String(d.dia).padStart(2, '0')}</span>
                    <span className="block font-slab text-[0.875rem] font-semibold capitalize text-creme-dim">{d.diaSemana.replace('-feira', '')}</span>
                    <span aria-hidden className="absolute -right-2 -top-2 size-4 rounded-full bg-mato-950" />
                    <span aria-hidden className="absolute -bottom-2 -right-2 size-4 rounded-full bg-mato-950" />
                  </p>
                  <div className="min-w-0 px-4 py-5 sm:px-6">
                    <h3 className="font-cartaz text-[1.375rem] uppercase leading-tight text-creme sm:text-[1.75rem]">{e.titulo}</h3>
                    <p className="mt-1 font-slab text-[0.9375rem] font-semibold text-ouro">
                      {e.tipo} · <span className="num">{e.hora}</span>
                    </p>
                    <p className="mt-2 max-w-[52ch] text-[0.9375rem] text-creme-dim">{e.descricao}</p>
                  </div>
                  <Foto legenda={e.foto} className="hidden aspect-[4/3] self-stretch lg:flex" />
                  <div className="col-span-2 border-t border-dashed border-ouro/60 p-3 sm:col-span-1 sm:flex sm:items-center sm:border-l sm:border-t-0 sm:px-6">
                    <button type="button" onClick={() => reservarPara({ data: e.data, evento: e.titulo })} className="btn-linha w-full whitespace-nowrap sm:w-auto">
                      Reservar para este evento
                    </button>
                  </div>
                </li>
              )
            })}
          </ol>
        )}
      </div>
    </section>
  )
}
