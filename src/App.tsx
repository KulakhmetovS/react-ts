import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import Header from './Header.tsx'
import Pages from "./Pages.tsx"
import './Header.css'
import './index.css'

function App () {
    
    const [value, setValue] = useState<string>('all')
    
    const handleChange = (value: string) => {
        let Value: string = value.replace(/ /g, "_")
        setValue(Value)
    }
    
    
    return (
        <>
            <Header onChange={handleChange}/>
            <Pages key={value} value={value}/>
        </>
    )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
