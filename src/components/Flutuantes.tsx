import { MessageCircle, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { kz } from '../lib/format'
import { linkWhatsApp } from '../lib/whatsapp'
import { usePedido } from '../state/pedido'
import { Quantidade } from './Carta'

export function Flutuantes() {
  const { linhas, unidades, total, definir, limpar } = usePedido()
  const folha = useRef<HTMLDialogElement>(null)
  const [naReserva, setNaReserva] = useState(false)

  // Na secção de reserva a comanda já mostra o pedido: a barra sai da frente
  useEffect(() => {
    const alvo = document.getElementById('reservar')
    if (!alvo) return
    const obs = new IntersectionObserver(([e]) => setNaReserva(e.isIntersecting), { rootMargin: '0px 0px -30% 0px' })
    obs.observe(alvo)
    return () => obs.disconnect()
  }, [])

  const continuar = () => {
    folha.current?.close()
    document.getElementById('reservar')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <div className={`pointer-events-none fixed inset-x-0 bottom-0 z-50 pb-[max(1rem,env(safe-area-inset-bottom))] transition-opacity duration-200 ${naReserva ? "invisible opacity-0" : "opacity-100"}`}>
        <div className="mx-auto flex max-w-page items-end justify-end gap-3 px-4 sm:px-6">
          {unidades > 0 && (
            <button
              type="button"
              onClick={() => folha.current?.showModal()}
              className="pointer-events-auto num flex min-h-[52px] flex-1 items-center justify-between gap-3 rounded-xs border border-mato-950 bg-creme px-4 font-slab text-[1.0625rem] font-semibold text-mato-950 transition-colors hover:bg-ouro-claro sm:flex-none sm:justify-start"
            >
              <span>Pré-pedido ({unidades})</span>
              <span className="sm:before:mr-3 sm:before:text-mato-700 sm:before:content-['·']">{kz(total)}</span>
            </button>
          )}
          <a
            href={linkWhatsApp()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar connosco no WhatsApp"
            className="pointer-events-auto grid size-[52px] shrink-0 place-items-center rounded-full border border-ouro bg-mato-950 text-ouro-claro transition-colors hover:bg-mato-700"
          >
            <MessageCircle className="size-6" strokeWidth={1.5} />
          </a>
        </div>
      </div>

      <dialog
        ref={folha}
        aria-labelledby="folha-titulo"
        onClick={(e) => e.target === folha.current && folha.current?.close()}
        className="m-0 mt-auto w-full max-w-none bg-transparent p-0 text-mato-950 backdrop:bg-mato-950/70 sm:m-auto sm:max-w-lg"
      >
        <div className="max-h-[85vh] overflow-y-auto bg-creme">
          <div aria-hidden className="h-2 bg-ouro" />
          <div className="px-4 pb-6 pt-4 sm:px-6">
            <div className="flex items-center justify-between">
              <h2 id="folha-titulo" className="font-cartaz text-[1.625rem] uppercase leading-none">
                Pré-pedido
              </h2>
              <button type="button" onClick={() => folha.current?.close()} aria-label="Fechar" className="grid size-11 place-items-center">
                <X className="size-6" strokeWidth={1.5} />
              </button>
            </div>
            {linhas.length === 0 ? (
              <p className="mt-4">Está vazio. Junte pratos a partir da carta.</p>
            ) : (
              <ul className="mt-3 divide-y divide-dashed divide-mato-950/30 border-y border-dashed border-mato-950/30">
                {linhas.map((l) => (
                  <li key={l.prato.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                    <span className="min-w-0 font-slab text-[1.0625rem] font-semibold leading-tight">
                      {l.prato.nome}
                      <span className="num block font-corpo text-[0.875rem] font-normal text-mato-700">{kz(l.prato.preco * l.quantidade)}</span>
                    </span>
                    <Quantidade nome={l.prato.nome} valor={l.quantidade} onChange={(n) => definir(l.prato.id, n)} claro />
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-3 flex items-baseline justify-between">
              <span className="font-slab font-semibold">Total</span>
              <span className="num font-cartaz text-[1.5rem]">{kz(total)}</span>
            </div>
            <button type="button" onClick={continuar} className="btn-creme mt-5 w-full">
              Continuar para a reserva
            </button>
            {linhas.length > 0 && (
              <button type="button" onClick={limpar} className="btn mt-2 w-full text-[0.9375rem] font-normal underline">
                Esvaziar pré-pedido
              </button>
            )}
          </div>
        </div>
      </dialog>
    </>
  )
}
