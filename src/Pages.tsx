import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import './Pages.css'
import BookPage from './BookPage.tsx'
import Header from './Header.tsx'

function Pages({value}) {

const [photos, setPhotos] = useState([])
const [currentPage, setCurrentPage] = useState<number>(1)
const [fetching, setFetching] = useState<boolean>(true)
const [totalCount, setTotalCount] = useState<number>(11)

useEffect( () => {
if (fetching) {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${value}&startIndex=${currentPage}&maxResults=10`)
    .then(response => {
    setPhotos([...photos, ...response.data.items])
    setCurrentPage(prevState => prevState + 10)
    setTotalCount(response.data.totalItems)
    })
    .finally( () => setFetching(false));
    
}
}, [fetching])

useEffect( () => {
    document.addEventListener('scroll', scrollHandler)
    return function () {
        document.removeEventListener('scroll', scrollHandler)
    };
}, [])

const scrollHandler = (e: Event) => {
    if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100
    && photos.length < totalCount) {
        setFetching(true)
    }
}

const renderContent = (image: string, name: string, author: string, description: string) => {
  const root = ReactDOM.createRoot(document.getElementById('try'))
  root.render(
      <div>
        <img src={image} width="200px"/>
        {name}
        <br/>
        {author}
        <br />
        {description}
      </div>
  )
}

  return (
  <>
    <div className="line">
      {
          photos.map(photo =>
              <div className="book" key={photo.id} onClick={() => renderContent(
              photo.volumeInfo.imageLinks.smallThumbnail,
              photo.volumeInfo.title,
              photo.volumeInfo.authors,
              photo.volumeInfo.description
              )} >
                <div className="image">
                    <img src={photo.volumeInfo.imageLinks.smallThumbnail} width="100%"/>
                </div>
                <div className="title">
                    <b>Название: </b>"{photo.volumeInfo.title}"
                    <br/>
                    <b>Автор: </b>{photo.volumeInfo.authors}</div>
              </div>
          )
      }
    </div>
    </>
  )
}

export default Pages
