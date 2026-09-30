import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/ultra/400.css'
import '@fontsource/zilla-slab/400.css'
import '@fontsource/zilla-slab/600.css'
import '@fontsource/karla/400.css'
import '@fontsource/karla/600.css'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
