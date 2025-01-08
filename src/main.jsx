import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TasksContextProvider from './components/context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TasksContextProvider><App /></TasksContextProvider>
  </StrictMode>
)
