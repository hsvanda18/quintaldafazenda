import { AtSign, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react'
import { TELEFONES, formatarTelemovel } from '../config'
import { NOMES_DIAS } from '../data/horario'
import { LOCAL, comoChegarUrl, instagramUrl, mapaEmbedUrl } from '../data/local'
import { agoraLuanda, textoTurno } from '../lib/horario'
import { useAgora } from '../lib/useAgora'
import { linkWhatsApp } from '../lib/whatsapp'
import { EstadoAberto } from './EstadoAberto'

// Semana a começar na segunda, como se lê num horário
const ORDEM = [1, 2, 3, 4, 5, 6, 0]

export function Visitar() {
  const agora = useAgora()
  const hoje = agoraLuanda(agora).semana

  return (
    <section id="visitar" aria-labelledby="visitar-titulo" className="border-t border-ouro/30">
      <div className="mx-auto grid max-w-page gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-5">
          <h2 id="visitar-titulo" className="titulo-cartaz text-[clamp(2.5rem,10vw,4.5rem)]">
            Como chegar
          </h2>
          <address className="mt-5 not-italic">
            <p className="flex gap-2 font-slab text-[1.25rem] font-semibold leading-snug">
              <MapPin aria-hidden className="mt-1 size-5 shrink-0 text-ouro" strokeWidth={1.5} />
              <span>
                {LOCAL.morada}
                <span className="block text-creme-dim">{LOCAL.referencia}, {LOCAL.cidade}</span>
              </span>
            </p>
          </address>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <a href={comoChegarUrl} target="_blank" rel="noopener noreferrer" className="btn-ouro sm:col-span-2">
              <Navigation aria-hidden className="size-4" strokeWidth={1.5} /> Abrir no mapa
            </a>
            {TELEFONES.map((t) => (
              <a key={t} href={`tel:+${t}`} className="btn-linha" aria-label={`Ligar para ${formatarTelemovel(t)}`}>
                <Phone aria-hidden className="size-4" strokeWidth={1.5} /> <span className="num">{formatarTelemovel(t)}</span>
              </a>
            ))}
            <a href={linkWhatsApp()} target="_blank" rel="noopener noreferrer" className="btn-linha">
              <MessageCircle aria-hidden className="size-4" strokeWidth={1.5} /> WhatsApp
            </a>
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="btn-linha">
              <AtSign aria-hidden className="size-4" strokeWidth={1.5} /> @{LOCAL.instagram}
            </a>
          </div>

          <div className="mt-10">
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-ouro/50 pb-2">
              <h3 className="font-cartaz text-[1.5rem] uppercase leading-none">Horário</h3>
              <EstadoAberto />
            </div>
            <table className="num mt-1 w-full text-left">
              <caption className="sr-only">Horário semanal</caption>
              <tbody>
                {ORDEM.map((d) => {
                  const eHoje = d === hoje
                  return (
                    <tr key={d} className={`border-b border-ouro/15 ${eHoje ? 'text-ouro-claro' : textoTurno(d) === 'Fechado' ? 'text-creme-mute' : 'text-creme-dim'}`}>
                      <th scope="row" className="py-2.5 font-slab text-[1.0625rem] font-semibold">
                        {NOMES_DIAS[d]}
                        {eHoje && <span className="rotulo ml-2 text-[0.6875rem]">hoje</span>}
                      </th>
                      <td className="py-2.5 text-right font-slab text-[1.0625rem]">{textoTurno(d)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <p className="mt-2 text-[0.875rem] text-creme-mute">Horário de demonstração, por confirmar.</p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="arco-moldura h-full min-h-[22rem]">
            <iframe
              title={`Mapa: ${LOCAL.nome}, ${LOCAL.morada}`}
              src={mapaEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-full min-h-[22rem] w-full border-0 bg-mato-700 [filter:sepia(.35)_saturate(.8)]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
