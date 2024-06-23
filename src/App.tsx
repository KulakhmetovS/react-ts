import React, {useState} from 'react'
import ReactDOM from 'react-dom/client'
import Header from './Header.tsx'
import Pages from "./Pages.tsx"
import './Header.css'
import './index.css'

function App () {
    
    const [value, setValue] = useState<string>()
    
    const handleChange = (value) => {
        setValue(value)
    }
    
    return (
        <>
            <Header onChange={handleChange}/>
            <Pages value={value}/>
        </>
    )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
