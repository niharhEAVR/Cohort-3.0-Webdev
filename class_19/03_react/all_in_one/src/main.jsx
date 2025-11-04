import { createRoot } from 'react-dom/client'
import './index.css'
import ClassCounter from './class_based_compenents.jsx'
import MyComponent from './life_cycle_events.jsx'
import App from './error_handling.jsx'

createRoot(document.getElementById('root')).render(
  // <ClassCounter />
  // <MyComponent />
  <App />
)
