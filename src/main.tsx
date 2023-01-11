import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import NoteState from './context/NoteState'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <NoteState>
      <App />
    </NoteState>
  </React.StrictMode>,
)
