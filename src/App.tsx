import { Cabecalho } from './components/Cabecalho'
import { Carta } from './components/Carta'
import { Eventos } from './components/Eventos'
import { Flutuantes } from './components/Flutuantes'
import { Hero } from './components/Hero'
import { Quintal } from './components/Quintal'
import { Reserva } from './components/Reserva'
import { Rodape } from './components/Rodape'
import { Visitar } from './components/Visitar'
import { PedidoProvider } from './state/pedido'

export default function App() {
  return (
    <PedidoProvider>
      <a href="#carta" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-ouro focus:px-4 focus:py-2 focus:text-mato-950">
        Saltar para a carta
      </a>
      <Cabecalho />
      <main>
        <Hero />
        <Carta />
        <Reserva />
        <Eventos />
        <Quintal />
        <Visitar />
      </main>
      <Rodape />
      <Flutuantes />
    </PedidoProvider>
  )
}
