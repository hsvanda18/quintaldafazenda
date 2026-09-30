import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { MENU, type Prato } from '../data/menu'

// Pré-pedido: vive só em memória (estado React), como pedido no brief.

const PRATOS = new Map<string, Prato>(MENU.flatMap((c) => c.pratos.map((p) => [p.id, p] as const)))

export interface Linha {
  prato: Prato
  quantidade: number
}

interface PedidoCtx {
  linhas: Linha[]
  quantidadeDe: (id: string) => number
  definir: (id: string, quantidade: number) => void
  adicionar: (id: string) => void
  limpar: () => void
  total: number
  unidades: number
  // Reserva: dados vindos de fora (evento) e navegação
  preReserva: { data?: string; evento?: string; versao: number }
  reservarPara: (dados: { data?: string; evento?: string }) => void
}

const Ctx = createContext<PedidoCtx | null>(null)

export function PedidoProvider({ children }: { children: ReactNode }) {
  const [qtd, setQtd] = useState<Record<string, number>>({})
  const [preReserva, setPreReserva] = useState<PedidoCtx['preReserva']>({ versao: 0 })

  const definir = useCallback((id: string, quantidade: number) => {
    setQtd((q) => {
      const novo = { ...q }
      if (quantidade <= 0) delete novo[id]
      else novo[id] = Math.min(quantidade, 30)
      return novo
    })
  }, [])

  const adicionar = useCallback((id: string) => setQtd((q) => ({ ...q, [id]: Math.min((q[id] ?? 0) + 1, 30) })), [])
  const limpar = useCallback(() => setQtd({}), [])

  const reservarPara = useCallback((dados: { data?: string; evento?: string }) => {
    setPreReserva((p) => ({ ...dados, versao: p.versao + 1 }))
    document.getElementById('reservar')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const valor = useMemo<PedidoCtx>(() => {
    const linhas = Object.entries(qtd)
      .map(([id, quantidade]) => ({ prato: PRATOS.get(id)!, quantidade }))
      .filter((l) => l.prato)
    return {
      linhas,
      quantidadeDe: (id) => qtd[id] ?? 0,
      definir,
      adicionar,
      limpar,
      total: linhas.reduce((s, l) => s + l.prato.preco * l.quantidade, 0),
      unidades: linhas.reduce((s, l) => s + l.quantidade, 0),
      preReserva,
      reservarPara,
    }
  }, [qtd, definir, adicionar, limpar, preReserva, reservarPara])

  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>
}

export function usePedido() {
  const c = useContext(Ctx)
  if (!c) throw new Error('usePedido fora do PedidoProvider')
  return c
}
