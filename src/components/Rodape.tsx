import { LOCAL, instagramUrl } from '../data/local'

export function Rodape() {
  return (
    <footer className="border-t border-ouro/30 bg-mato pb-28 pt-12">
      <div className="mx-auto flex max-w-page flex-col items-center px-4 text-center sm:px-6">
        <img src="/logo.png" alt="Quintal da Fazenda" width="140" height="140" loading="lazy" className="size-36" />
        <p className="mt-4 text-[0.9375rem] text-creme-dim">
          {LOCAL.morada}, {LOCAL.referenciaFrase} · {LOCAL.cidade}
        </p>
        <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="mt-1 text-[0.9375rem] text-ouro-claro underline">
          @{LOCAL.instagram}
        </a>
        <p className="mt-8 max-w-[52ch] text-[0.8125rem] text-creme-mute">
          Site de demonstração. Menu, preços, horário e eventos são exemplos por confirmar com a casa.
        </p>
      </div>
    </footer>
  )
}
