import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { TodoProvider } from './context/TodoContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <TodoProvider>
          <App />
        </TodoProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
