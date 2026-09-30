import { useEffect, useState } from 'react'

// Re-render a cada minuto para o estado "Aberto agora" e os eventos
export function useAgora(intervalo = 60_000) {
  const [agora, setAgora] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setAgora(new Date()), intervalo)
    return () => clearInterval(t)
  }, [intervalo])
  return agora
}
