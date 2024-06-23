import {useState} from 'react'
import './Header.css'

function Header({ onChange }) {
    
    const handleChange = (e: Event) => {
        onChange(e.target.value)
    }
    
  return (
    <>
      <div className="header">
        <div><h1>OpenBooks</h1></div>
        <div><input onChange={handleChange}/></div>
      </div>
    </>
  )
}

export default Header
