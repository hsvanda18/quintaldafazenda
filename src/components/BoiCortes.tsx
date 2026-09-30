import { CORTES, type Corte } from '../data/menu'

// Carta de cortes: ilustração em public/fotos/cortes-*.webp (1612×976),
// com zonas de toque invisíveis por cima. O corte activo ganha um véu de ouro.

const ZONAS: Record<Corte, string> = {
  acem: '385,205 430,182 500,158 560,152 612,188 608,300 605,420 610,505 540,480 470,455 378,425 382,300',
  peito: '378,425 470,455 540,480 610,505 630,555 645,605 600,640 520,660 440,690 380,640 360,540',
  costela: '615,188 700,193 790,198 875,205 880,300 890,420 900,560 905,630 800,612 720,598 648,605 635,555 610,505 605,420 608,300',
  lombo: '875,205 1000,195 1135,172 1150,250 1170,330 1175,358 1100,340 1000,345 890,378 882,300',
  vazia: '890,378 1000,345 1100,340 1175,358 1190,450 1205,565 1150,580 1080,600 990,640 905,630 895,520',
  picanha: '1135,172 1250,165 1350,170 1410,195 1445,240 1448,285 1350,290 1250,305 1180,330 1160,250',
  alcatra: '1180,330 1250,305 1350,290 1448,285 1462,380 1465,480 1440,560 1400,600 1300,590 1205,565 1190,450',
}

interface Props {
  activo: Corte | null
  onEscolher: (c: Corte | null) => void
}

export function BoiCortes({ activo, onEscolher }: Props) {
  return (
    <div className="relative">
      <img
        src="/fotos/cortes-900.webp"
        srcSet="/fotos/cortes-900.webp 900w, /fotos/cortes-1612.webp 1612w"
        sizes="(min-width: 1024px) 34rem, 100vw"
        width="1612"
        height="976"
        loading="lazy"
        decoding="async"
        alt=""
        className="block h-auto w-full"
      />
      <svg
        viewBox="0 0 1612 976"
        className="absolute inset-0 h-full w-full"
        role="group"
        aria-label="Cortes do boi. Escolha um corte para filtrar os grelhados."
      >
        {(Object.keys(ZONAS) as Corte[]).map((id) => {
          const on = activo === id
          return (
            <polygon
              key={id}
              points={ZONAS[id]}
              role="button"
              tabIndex={0}
              aria-pressed={on}
              aria-label={`${CORTES[id]}${on ? ', seleccionado' : ''}`}
              onClick={() => onEscolher(on ? null : id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onEscolher(on ? null : id)
                }
              }}
              className={`cursor-pointer outline-none transition-[fill,stroke] duration-150 [mix-blend-mode:screen] focus-visible:stroke-ouro-claro ${
                on ? 'fill-ouro/45 stroke-ouro-claro' : 'fill-transparent stroke-transparent hover:fill-ouro/20'
              }`}
              strokeWidth="4"
              strokeLinejoin="round"
            />
          )
        })}
      </svg>
    </div>
  )
}
