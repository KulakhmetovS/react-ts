import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './Bookmarks.css'

function Bookmarks() {
    
    const [books, setBooks] = useState({})
    
    useEffect(() => {
        axios.get('http://localhost:3000/get-json')
    .then(response => {
        setBooks(response.data)
    })
    }, [])
    
    
  return (
    <>
      <div className="page">
              <div className="book">
                <div className="image">
                    <img src={books.bookmarkImage} width="250px"/>
                </div>
                <div className="title">
                    <b>Название: </b>"{books.bookmarkName}"
                    <br/>
                    <b>Автор: </b>{books.bookmarkAuthor}
                    <br/>
                    <b>Описание: </b>{books.bookmarkDescription}
                </div>
              </div>
      </div>
    </>
  )
}

export default Bookmarks