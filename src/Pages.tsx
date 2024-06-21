import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './Pages.css'

function Pages() {

const [photos, setPhotos] = useState([])
const [currentPage, setCurrentPage] = useState<number>(0)
const [fetching, setFetching] = useState<boolean>(true)
//const [totalCount, setTotalCount] = useState<numbet>(0)


useEffect( () => {
if (fetching) {
    axios.get(`https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${currentPage}`)
    .then(response => {
    setPhotos([...photos, ...response.data])
    setCurrentPage(prevState => prevState + 1)
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
    <div>
      {
          photos.map(photo =>
              <div className="photo" key={photo.id}>
                <div className="title">{photo.id}. {photo.title}</div>
                <img src={photo.thumbnailUrl} alt="" />
              </div>
          )
      }
    </div>
  )
}

export default Pages
