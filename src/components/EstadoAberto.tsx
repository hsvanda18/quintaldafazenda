import { estadoAgora } from '../lib/horario'
import { useAgora } from '../lib/useAgora'

export function EstadoAberto({ className = '', compacto }: { className?: string; compacto?: boolean }) {
  const agora = useAgora()
  const e = estadoAgora(agora)
  return (
    <p className={`flex items-center font-slab font-semibold ${compacto ? 'gap-1.5 text-[0.75rem]' : 'gap-2 text-[0.9375rem]'} ${className}`}>
      <span
        aria-hidden
        className={`inline-block size-2 rounded-full ${e.aberto ? 'bg-campo-claro' : 'border border-creme-mute'}`}
      />
      <span className={e.aberto ? 'text-campo-claro' : 'text-creme-dim'}>{e.aberto ? 'Aberto agora' : 'Fechado'}</span>
      <span className="text-creme-mute" aria-hidden>
        ·
      </span>
      <span className="num text-creme-dim">{e.detalhe}</span>
    </p>
  )
}
