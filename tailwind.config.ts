import type { Config } from 'tailwindcss'

// Cores retiradas do logótipo (public/logo.png). Usar só estes tokens.
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      mato: {
        950: '#141b12',
        900: '#1a2318',
        DEFAULT: '#202b1d', // fundo do logótipo
        700: '#2a3826',
        600: '#374733',
      },
      creme: {
        DEFAULT: '#efe3cf', // letras do logótipo
        dim: '#cfc3ab',
        mute: '#a99f8a',
      },
      ouro: {
        DEFAULT: '#c9ab6e', // arco e réguas do logótipo
        claro: '#dcc393',
        escuro: '#9c8150',
      },
      campo: {
        DEFAULT: '#3f7a35', // campo verde dentro do arco
        claro: '#9cba84',
      },
    },
    fontFamily: {
      cartaz: ['Ultra', 'Georgia', 'serif'],
      slab: ['"Zilla Slab"', 'Georgia', 'serif'],
      corpo: ['Karla', 'system-ui', 'sans-serif'],
    },
    extend: {
      borderRadius: { xs: '2px' },
      transitionDuration: { DEFAULT: '180ms' },
      maxWidth: { page: '76rem' },
    },
  },
} satisfies Config
