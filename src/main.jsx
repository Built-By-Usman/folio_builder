import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

try {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
} catch (error) {
  console.error("Rendering Error:", error);
  document.body.innerHTML = `<div style="padding: 20px; color: red;"><h1>Critical Error</h1><pre>${error.message}</pre></div>`;
}
