import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './Pages.css'

function Pages({value}) {

const [photos, setPhotos] = useState([])
const [currentPage, setCurrentPage] = useState<number>(1)
const [fetching, setFetching] = useState<boolean>(true)
//const [totalCount, setTotalCount] = useState<numbet>(0)

useEffect( () => {
if (fetching) {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${value}&startIndex=${currentPage}&maxResults=10`)
    .then(response => {
    setPhotos([...photos, ...response.data.items])
    setCurrentPage(prevState => prevState + 10)
    //setTotalCount(response.headers['x-total-count'])
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
    /*&& photos.length < totalCount*/) {
        setFetching(true)
    }
}

  return (
    <div className="line">
      {
          photos.map(photo =>
              <div className="book" key={photo.id}>
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
  )
}

export default Pages
