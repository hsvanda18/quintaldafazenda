// Fotografia com fundo da marca. Sem `src`, mostra a legenda "FOTO: ..." para trocar pela foto real.
// Fotos reais ficam em public/fotos/ (de preferência .webp).

interface Props {
  legenda: string
  className?: string
  src?: string
  srcSet?: string
  sizes?: string
  arco?: boolean
  // true só para a foto do primeiro ecrã: carrega logo, sem lazy loading
  prioridade?: boolean
}

export function Foto({ legenda, className = '', src, srcSet, sizes, arco, prioridade }: Props) {
  const forma = arco ? 'arco' : ''
  if (src) {
    return (
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={legenda}
        loading={prioridade ? 'eager' : 'lazy'}
        {...(prioridade ? { fetchpriority: 'high' } : {})}
        decoding="async"
        className={`bg-mato-700 object-cover ${forma} ${className}`}
      />
    )
  }
  return (
    <div role="img" aria-label={`Espaço para foto: ${legenda}`} className={`foto ${forma} ${className}`}>
      <span className="foto-legenda">Foto: {legenda}</span>
    </div>
  )
}
