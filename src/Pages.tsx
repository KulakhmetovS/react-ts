import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './Pages.css'

function Pages() {

const [photos, setPhotos] = useState([])

useEffect( () => {
    axios.get('https://jsonplaceholder.typicode.com/photos?_limit=10&_page=3')
    .then(response => setPhotos(response.data))
}, [])

useEffect( () => {
    document.addEventListener('scroll', scrollHandler)
    return function () {
        document.removeEventListener('scroll', scrollHandler)
    };
}, [])

const scrollHandler = (e) => {
    console.log('scroll')
}

  return (
    <div>
      {
          photos.map(photo =>
              <div className="photo">
                <div className="title">{photo.id}. {photo.title}</div>
                <img src={photo.thumbnailUrl} alt="" />
              </div>
          )
      }
    </div>
  )
}

export default Pages
