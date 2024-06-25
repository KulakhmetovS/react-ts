import React, {useState} from 'react'
import {Route, Routes} from 'react-router-dom'
import Header from './Header.tsx'
import Pages from "./Pages.tsx"
import Bookmarks from './Bookmarks.tsx'
import './Bookmarks.css'
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
            
            <Routes>
                <Route path="/" element={<Pages key={value} value={value}/>} />
                <Route path="/bookmarks" element={<Bookmarks />} />
            </Routes>
        </>
    )
}

export default App

