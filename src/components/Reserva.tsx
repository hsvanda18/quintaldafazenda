import { AlertCircle, ArrowLeft, ArrowRight, Check, MessageCircle } from 'lucide-react'
import { useEffect, useId, useRef, useState, type ReactNode, type RefObject } from 'react'
import { HORAS_ALMOCO, HORAS_JANTAR, MAX_PESSOAS, NOTAS_RAPIDAS, ZONAS, type Zona } from '../data/reserva'
import { dataLonga, kz } from '../lib/format'
import { abertoNoDia, agoraLuanda } from '../lib/horario'
import { linkWhatsApp, mensagemReserva, type DadosReserva } from '../lib/whatsapp'
import { usePedido } from '../state/pedido'
import { Quantidade } from './Carta'

const PASSOS = ['Quando', 'Zona', 'Pré-pedido', 'Contacto', 'Confirmar'] as const

type Erros = Partial<Record<'data' | 'hora' | 'pessoas' | 'zona' | 'nome' | 'telemovel', string>>

const minutos = (h: string) => Number(h.slice(0, 2)) * 60 + Number(h.slice(3))

export function Reserva() {
  const { linhas, total, definir, preReserva } = usePedido()
  const [passo, setPasso] = useState(0)
  const [data, setData] = useState('')
  const [hora, setHora] = useState('')
  const [pessoas, setPessoas] = useState(2)
  const [zona, setZona] = useState<Zona | ''>('')
  const [servir, setServir] = useState<'chegada' | 'aviso'>('chegada')
  const [nome, setNome] = useState('')
  const [telemovel, setTelemovel] = useState('')
  const [observacoes, setObservacoes] = useState('')
  const [evento, setEvento] = useState<string | undefined>()
  const [erros, setErros] = useState<Erros>({})
  const [enviado, setEnviado] = useState(false)
  const tituloRef = useRef<HTMLHeadingElement>(null)
  const primeiraVez = useRef(true)

  const hoje = agoraLuanda()

  // Vindo de um evento: data preenchida
  useEffect(() => {
    if (preReserva.versao === 0) return
    if (preReserva.data) setData(preReserva.data)
    setEvento(preReserva.evento)
    setHora('')
    setPasso(0)
    setEnviado(false)
    setErros({})
  }, [preReserva])

  useEffect(() => {
    if (primeiraVez.current) {
      primeiraVez.current = false
      return
    }
    tituloRef.current?.focus({ preventScroll: true })
  }, [passo, enviado])

  const telLimpo = telemovel.replace(/\D/g, '').replace(/^244/, '')

  function validar(p: number): Erros {
    const e: Erros = {}
    if (p === 0) {
      if (!data) e.data = 'Escolha o dia.'
      else if (data < hoje.iso) e.data = 'Esse dia já passou. Escolha outro.'
      else if (!abertoNoDia(data)) e.data = 'À segunda-feira estamos fechados. Escolha outro dia.'
      if (!hora) e.hora = 'Escolha a hora de chegada.'
      else if (data === hoje.iso && minutos(hora) < hoje.minutos + 30) e.hora = 'Para hoje, escolha uma hora com pelo menos 30 minutos de antecedência.'
      if (pessoas < 1 || pessoas > MAX_PESSOAS) e.pessoas = `Entre 1 e ${MAX_PESSOAS} pessoas.`
    }
    if (p === 1 && !zona) e.zona = 'Escolha onde prefere ficar.'
    if (p === 3) {
      if (nome.trim().length < 2) e.nome = 'Escreva o seu nome.'
      if (!/^9\d{8}$/.test(telLimpo)) e.telemovel = 'Número angolano com 9 dígitos, a começar por 9 (ex.: 923 456 789).'
    }
    return e
  }

  function avancar() {
    const e = validar(passo)
    setErros(e)
    if (Object.keys(e).length === 0) setPasso((p) => Math.min(p + 1, PASSOS.length - 1))
  }

  function recuar() {
    setErros({})
    setPasso((p) => Math.max(p - 1, 0))
  }

  const dados: DadosReserva | null =
    zona && data && hora
      ? {
          data,
          hora,
          pessoas,
          zona,
          evento,
          servir,
          nome: nome.trim(),
          telemovel: telLimpo.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3'),
          observacoes,
          pedido: linhas.map((l) => ({ nome: l.prato.nome, quantidade: l.quantidade, preco: l.prato.preco })),
        }
      : null
  const mensagem = dados ? mensagemReserva(dados) : ''

  function recomecar() {
    setPasso(0)
    setData('')
    setHora('')
    setZona('')
    setEvento(undefined)
    setObservacoes('')
    setEnviado(false)
  }

  return (
    <section id="reservar" aria-labelledby="reservar-titulo" className="border-t border-ouro/30">
      <div className="mx-auto grid max-w-page gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-5">
          <h2 id="reservar-titulo" className="titulo-cartaz text-[clamp(2.25rem,9vw,4.25rem)]">
            Reserve e peça <span className="text-ouro">antes de chegar</span>
          </h2>
          <p className="mt-4 max-w-[40ch] text-creme-dim">
            A equipa recebe no WhatsApp a mesa, a hora de chegada e o que vai comer. Ao sentar-se, confirma com um só empregado e a cozinha já sabe o que fazer.
          </p>
          <ol className="mt-8 hidden space-y-3 border-l border-ouro/40 pl-5 lg:block">
            {PASSOS.map((p, i) => (
              <li key={p} className={`font-slab text-[1.0625rem] font-semibold ${i === passo ? 'text-ouro-claro' : i < passo ? 'text-creme-dim' : 'text-creme-mute'}`}>
                <span className="num mr-2 inline-block w-5">{i + 1}.</span>
                {p}
                {i < passo && <Check aria-hidden className="ml-2 inline size-4 text-campo-claro" strokeWidth={2} />}
              </li>
            ))}
          </ol>
        </div>

        {/* A comanda */}
        <div className="lg:col-span-7">
          <div className="relative bg-creme text-mato-950">
            <div aria-hidden className="h-2 border-b border-dashed border-mato-950/40 bg-ouro" />
            <div className="px-4 pb-6 pt-5 sm:px-8 sm:pb-8">
              <p className="num text-right font-slab text-[0.9375rem] font-semibold text-mato-700" aria-live="polite">
                Passo {passo + 1} de {PASSOS.length} · {PASSOS[passo]}
              </p>
              <div aria-hidden className="mt-3 grid grid-cols-5 gap-1">
                {PASSOS.map((p, i) => (
                  <span key={p} className={`h-1 ${i <= passo ? 'bg-mato-950' : 'bg-mato-950/15'}`} />
                ))}
              </div>

              {enviado ? (
                <Enviado tituloRef={tituloRef} mensagem={mensagem} onNova={recomecar} />
              ) : (
                <form
                  noValidate
                  onSubmit={(e) => {
                    e.preventDefault()
                    avancar()
                  }}
                  className="mt-6"
                >
                  <h3 ref={tituloRef} tabIndex={-1} className="font-cartaz text-[1.625rem] uppercase leading-none outline-none sm:text-[2rem]">
                    {['Quando vem?', 'Onde se quer sentar?', 'O que vai comer?', 'Os seus dados', 'Confira e envie'][passo]}
                  </h3>
                  {evento && passo < 4 && (
                    <p className="mt-2 font-slab text-[1rem] font-semibold text-mato-700">
                      Reserva para o evento: {evento}{' '}
                      <button type="button" onClick={() => setEvento(undefined)} className="ml-1 underline">
                        remover
                      </button>
                    </p>
                  )}

                  <div className="mt-5">
                    {passo === 0 && (
                      <PassoQuando
                        {...{ data, setData, hora, setHora, pessoas, setPessoas, erros, hoje }}
                      />
                    )}
                    {passo === 1 && <PassoZona zona={zona} setZona={setZona} erro={erros.zona} />}
                    {passo === 2 && (
                      <PassoPedido linhas={linhas} total={total} definir={definir} servir={servir} setServir={setServir} hora={hora} />
                    )}
                    {passo === 3 && (
                      <PassoContacto {...{ nome, setNome, telemovel, setTelemovel, observacoes, setObservacoes, erros }} />
                    )}
                    {passo === 4 && dados && <Resumo dados={dados} total={total} irPara={setPasso} />}
                  </div>

                  <div className="mt-8 flex flex-col-reverse gap-3 border-t border-dashed border-mato-950/40 pt-5 sm:flex-row sm:items-center sm:justify-between">
                    {passo > 0 ? (
                      <button type="button" onClick={recuar} className="btn justify-start px-0 text-mato-950 underline-offset-4 hover:underline sm:px-2">
                        <ArrowLeft aria-hidden className="size-4" strokeWidth={1.5} /> Voltar
                      </button>
                    ) : (
                      <span />
                    )}
                    {passo < 4 ? (
                      <button type="submit" className="btn-creme sm:px-8">
                        {passo === 2 && linhas.length === 0 ? 'Continuar sem pré-pedido' : 'Continuar'}
                        <ArrowRight aria-hidden className="size-4" strokeWidth={1.5} />
                      </button>
                    ) : (
                      <a
                        href={linkWhatsApp(mensagem)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setEnviado(true)}
                        className="btn-creme sm:px-8"
                      >
                        <MessageCircle aria-hidden className="size-5" strokeWidth={1.5} />
                        Enviar pelo WhatsApp
                      </a>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
          <p className="mt-3 pb-12 text-[0.875rem] text-creme-mute lg:pb-0">A reserva fica confirmada quando a equipa responder no WhatsApp.</p>
        </div>
      </div>
    </section>
  )
}

/* ---------- Passos ---------- */

function Erro({ id, children }: { id: string; children?: string }) {
  if (!children) return null
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-[0.9375rem] font-semibold text-mato-950">
      <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" strokeWidth={2} />
      {children}
    </p>
  )
}

function Rotulo({ htmlFor, children }: { htmlFor?: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block font-slab text-[1rem] font-semibold">
      {children}
    </label>
  )
}

function PassoQuando(p: {
  data: string
  setData: (v: string) => void
  hora: string
  setHora: (v: string) => void
  pessoas: number
  setPessoas: (v: number) => void
  erros: Erros
  hoje: { iso: string; minutos: number }
}) {
  const id = useId()
  const passou = (h: string) => p.data === p.hoje.iso && minutos(h) < p.hoje.minutos + 30
  const fechado = p.data !== '' && !abertoNoDia(p.data)

  const grupo = (titulo: string, horas: string[]) => (
    <fieldset className="mt-4">
      <legend className="rotulo text-mato-700">{titulo}</legend>
      <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
        {horas.map((h) => {
          const off = passou(h) || fechado
          const on = p.hora === h
          return (
            <button
              key={h}
              type="button"
              disabled={off}
              aria-pressed={on}
              onClick={() => p.setHora(h)}
              className={`num min-h-[44px] rounded-xs border font-slab text-[1.0625rem] font-semibold transition-colors duration-150 disabled:cursor-not-allowed disabled:border-transparent disabled:text-mato-950/30 disabled:line-through ${
                on ? 'border-mato-950 bg-mato-950 text-creme' : 'border-mato-950/35 hover:border-mato-950'
              }`}
            >
              {h}
            </button>
          )
        })}
      </div>
    </fieldset>
  )

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-[1fr_auto]">
        <div>
          <Rotulo htmlFor={`${id}-data`}>Dia</Rotulo>
          <input
            id={`${id}-data`}
            type="date"
            min={p.hoje.iso}
            value={p.data}
            onChange={(e) => {
              p.setData(e.target.value)
              p.setHora('')
            }}
            aria-invalid={!!p.erros.data}
            aria-describedby={p.erros.data ? `${id}-data-erro` : undefined}
            className="campo num [color-scheme:light]"
          />
          <Erro id={`${id}-data-erro`}>{p.erros.data ?? (fechado ? 'À segunda-feira estamos fechados.' : undefined)}</Erro>
        </div>
        <div>
          <span className="mb-1.5 block font-slab text-[1rem] font-semibold" id={`${id}-pessoas`}>
            Pessoas
          </span>
          <div aria-labelledby={`${id}-pessoas`}>
            <Quantidade nome="pessoas" valor={p.pessoas} onChange={(n) => p.setPessoas(Math.max(1, Math.min(n, 20)))} claro />
          </div>
          {p.pessoas >= 12 && <p className="mt-2 max-w-[24ch] text-[0.875rem] text-mato-700">Grupos grandes: a equipa liga a confirmar a mesa.</p>}
        </div>
      </div>

      <div role="group" aria-describedby={p.erros.hora ? `${id}-hora-erro` : undefined}>
        {grupo('Almoço', HORAS_ALMOCO)}
        {grupo('Jantar', HORAS_JANTAR)}
      </div>
      <Erro id={`${id}-hora-erro`}>{p.erros.hora}</Erro>
    </div>
  )
}

function PassoZona({ zona, setZona, erro }: { zona: Zona | ''; setZona: (z: Zona) => void; erro?: string }) {
  return (
    <fieldset aria-describedby={erro ? 'zona-erro' : undefined}>
      <legend className="sr-only">Zona</legend>
      <div className="divide-y divide-mato-950/20 border-y border-mato-950/20">
        {ZONAS.map((z) => (
          <label key={z.id} className="flex min-h-[64px] cursor-pointer items-center gap-4 py-3 transition-colors hover:bg-mato-950/5">
            <input
              type="radio"
              name="zona"
              value={z.id}
              checked={zona === z.id}
              onChange={() => setZona(z.id)}
              className="size-5 shrink-0 accent-[#202b1d]"
            />
            <span>
              <span className="block font-slab text-[1.1875rem] font-semibold leading-tight">{z.nome}</span>
              <span className="block text-[0.9375rem] text-mato-700">{z.detalhe}</span>
            </span>
          </label>
        ))}
      </div>
      <Erro id="zona-erro">{erro}</Erro>
    </fieldset>
  )
}

function PassoPedido({
  linhas,
  total,
  definir,
  servir,
  setServir,
  hora,
}: {
  linhas: ReturnType<typeof usePedido>['linhas']
  total: number
  definir: (id: string, n: number) => void
  servir: 'chegada' | 'aviso'
  setServir: (s: 'chegada' | 'aviso') => void
  hora: string
}) {
  if (linhas.length === 0) {
    return (
      <div>
        <p className="max-w-[46ch]">
          Ainda não juntou pratos. Pode reservar só a mesa, ou escolher já na carta para que a cozinha comece a tempo.
        </p>
        <a href="#carta" className="btn-linha mt-4 border-mato-950/50 text-mato-950 hover:border-mato-950 hover:bg-mato-950/5">
          Escolher pratos na carta
        </a>
      </div>
    )
  }
  return (
    <div>
      <ul className="divide-y divide-dashed divide-mato-950/30">
        {linhas.map((l) => (
          <li key={l.prato.id} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-3">
            <div className="min-w-0">
              <p className="font-slab text-[1.125rem] font-semibold leading-tight">{l.prato.nome}</p>
              <p className="num text-[0.9375rem] text-mato-700">{kz(l.prato.preco)} cada</p>
            </div>
            <div className="flex items-center gap-4">
              <Quantidade nome={l.prato.nome} valor={l.quantidade} onChange={(n) => definir(l.prato.id, n)} claro />
              <span className="num w-24 text-right font-slab text-[1.0625rem] font-semibold">{kz(l.prato.preco * l.quantidade)}</span>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex items-baseline justify-between border-t-2 border-mato-950 pt-3">
        <span className="font-slab text-[1.125rem] font-semibold">Total do pré-pedido</span>
        <span className="num font-cartaz text-[1.5rem]">{kz(total)}</span>
      </div>
      <a href="#carta" className="mt-2 inline-block text-[0.9375rem] font-semibold underline">
        Juntar mais pratos
      </a>

      <fieldset className="mt-6">
        <legend className="font-slab text-[1rem] font-semibold">Quando servir?</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {(
            [
              ['chegada', `Logo que chegarmos${hora ? ` (${hora})` : ''}`],
              ['aviso', 'Quando pedirmos à mesa'],
            ] as const
          ).map(([v, t]) => (
            <label
              key={v}
              className={`flex min-h-[48px] cursor-pointer items-center gap-3 rounded-xs border px-3 transition-colors ${
                servir === v ? 'border-mato-950 bg-mato-950/5' : 'border-mato-950/30'
              }`}
            >
              <input type="radio" name="servir" checked={servir === v} onChange={() => setServir(v)} className="size-5 accent-[#202b1d]" />
              <span className="num">{t}</span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  )
}

function PassoContacto(p: {
  nome: string
  setNome: (v: string) => void
  telemovel: string
  setTelemovel: (v: string) => void
  observacoes: string
  setObservacoes: (v: string) => void
  erros: Erros
}) {
  const id = useId()
  const juntar = (nota: string) => {
    const atual = p.observacoes.trim()
    if (atual.toLowerCase().includes(nota.toLowerCase())) return
    p.setObservacoes(atual ? `${atual}, ${nota.toLowerCase()}: ` : `${nota}: `)
  }
  return (
    <div className="space-y-5">
      <div>
        <Rotulo htmlFor={`${id}-nome`}>Nome</Rotulo>
        <input
          id={`${id}-nome`}
          autoComplete="name"
          value={p.nome}
          onChange={(e) => p.setNome(e.target.value)}
          aria-invalid={!!p.erros.nome}
          aria-describedby={p.erros.nome ? `${id}-nome-erro` : undefined}
          className="campo"
        />
        <Erro id={`${id}-nome-erro`}>{p.erros.nome}</Erro>
      </div>
      <div>
        <Rotulo htmlFor={`${id}-tel`}>Telemóvel</Rotulo>
        <div className="flex">
          <span className="num grid place-items-center rounded-l-xs border border-r-0 border-mato-950/40 bg-mato-950/10 px-3 font-slab font-semibold">+244</span>
          <input
            id={`${id}-tel`}
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            placeholder="923 456 789"
            value={p.telemovel}
            onChange={(e) => p.setTelemovel(e.target.value)}
            aria-invalid={!!p.erros.telemovel}
            aria-describedby={p.erros.telemovel ? `${id}-tel-erro` : undefined}
            className="campo num rounded-l-none"
          />
        </div>
        <Erro id={`${id}-tel-erro`}>{p.erros.telemovel}</Erro>
      </div>
      <div>
        <Rotulo htmlFor={`${id}-obs`}>Observações (opcional)</Rotulo>
        <div className="mb-2 flex flex-wrap gap-2">
          {NOTAS_RAPIDAS.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => juntar(n)}
              className="min-h-[44px] rounded-xs border border-mato-950/35 px-3 text-[0.9375rem] font-semibold transition-colors hover:border-mato-950"
            >
              + {n}
            </button>
          ))}
        </div>
        <textarea
          id={`${id}-obs`}
          rows={3}
          value={p.observacoes}
          onChange={(e) => p.setObservacoes(e.target.value)}
          placeholder="Ex.: aniversário da Marta, bolo às 21h; um de nós não come marisco."
          className="campo resize-y"
        />
      </div>
    </div>
  )
}

function Resumo({ dados, total, irPara }: { dados: DadosReserva; total: number; irPara: (p: number) => void }) {
  const zona = ZONAS.find((z) => z.id === dados.zona)?.nome
  const linha = (rotulo: string, valor: ReactNode, passo: number) => (
    <div className="flex items-baseline justify-between gap-4 py-2.5">
      <dt className="rotulo shrink-0 text-mato-700">{rotulo}</dt>
      <dd className="num flex items-baseline gap-3 text-right font-slab text-[1.0625rem] font-semibold">
        <span>{valor}</span>
        <button type="button" onClick={() => irPara(passo)} className="text-[0.875rem] font-normal underline" aria-label={`Alterar ${rotulo.toLowerCase()}`}>
          alterar
        </button>
      </dd>
    </div>
  )
  return (
    <div>
      <dl className="divide-y divide-dashed divide-mato-950/30 border-y border-dashed border-mato-950/30">
        {linha('Dia', dataLonga(dados.data), 0)}
        {linha('Chegada', dados.hora, 0)}
        {linha('Pessoas', dados.pessoas, 0)}
        {linha('Zona', zona, 1)}
        {linha('Nome', dados.nome, 3)}
        {linha('Telemóvel', `+244 ${dados.telemovel}`, 3)}
        {dados.observacoes.trim() && linha('Notas', dados.observacoes.trim(), 3)}
      </dl>
      <div className="mt-5">
        <p className="rotulo text-mato-700">Pré-pedido</p>
        {dados.pedido.length === 0 ? (
          <p className="mt-1">Sem pré-pedido: pedem à mesa.</p>
        ) : (
          <>
            <ul className="mt-1">
              {dados.pedido.map((l) => (
                <li key={l.nome} className="num flex justify-between gap-4 py-1">
                  <span>
                    {l.quantidade}× {l.nome}
                  </span>
                  <span className="font-slab font-semibold">{kz(l.preco * l.quantidade)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex items-baseline justify-between border-t-2 border-mato-950 pt-2">
              <span className="font-slab font-semibold">Total</span>
              <span className="num font-cartaz text-[1.5rem]">{kz(total)}</span>
            </div>
          </>
        )}
      </div>
      <details className="mt-5 text-[0.9375rem]">
        <summary className="cursor-pointer py-2 font-semibold underline">Ver a mensagem que a equipa recebe</summary>
        <pre className="mt-2 whitespace-pre-wrap bg-mato-950/5 p-3 font-corpo text-[0.875rem] leading-relaxed">{mensagemReserva(dados)}</pre>
      </details>
    </div>
  )
}

function Enviado({ tituloRef, mensagem, onNova }: { tituloRef: RefObject<HTMLHeadingElement>; mensagem: string; onNova: () => void }) {
  return (
    <div className="mt-6">
      <h3 ref={tituloRef} tabIndex={-1} className="font-cartaz text-[1.75rem] uppercase leading-none outline-none sm:text-[2rem]">
        Comanda enviada
      </h3>
      <p className="mt-3 max-w-[46ch]">
        O WhatsApp abriu com a mensagem pronta. Carregue em enviar lá, e a equipa responde a confirmar a mesa.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a href={linkWhatsApp(mensagem)} target="_blank" rel="noopener noreferrer" className="btn-creme">
          <MessageCircle aria-hidden className="size-5" strokeWidth={1.5} />
          Abrir o WhatsApp outra vez
        </a>
        <button type="button" onClick={onNova} className="btn border border-mato-950/40 hover:border-mato-950">
          Fazer outra reserva
        </button>
      </div>
    </div>
  )
}
