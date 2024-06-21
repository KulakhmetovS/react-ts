import React from 'react'
import ReactDOM from 'react-dom/client'
import Header from './Header.tsx'
import Pages from "./Pages.tsx"
import './Header.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Header />
    <Pages />
  </React.StrictMode>,
)
