import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <App />
)

// As this is a Room Chat App that why making it strictmode will cause the run useEffect 2 times in a row
// so remove the stricmode or it will cause every single chat rerender two times.