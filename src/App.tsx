import React, {useState} from 'react'
import ReactDOM from 'react-dom/client'
import Header from './Header.tsx'
import Pages from "./Pages.tsx"
import './Header.css'
import './index.css'

function App () {
    
    const [value, setValue] = useState<string>('all')
    
    const handleChange = (value: string) => {
        let newValue: string = value.replace(/ /g, "_")
        setValue(newValue)
    }
    
    return (
        <>
            <Header onChange={handleChange}/>
            <div id="try"></div>
            <Pages key={value} value={value}/>
        </>
    )
}

export default App

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
