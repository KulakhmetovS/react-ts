import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './Pages.css';
import Header from './Header.tsx';

function Pages({ value }) {
    const [photos, setPhotos] = useState([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [fetching, setFetching] = useState<boolean>(true);
    const [totalCount, setTotalCount] = useState<number>(11);

    useEffect(() => {
        if (fetching) {
            axios
                .get(
                    `https://www.googleapis.com/books/v1/volumes?q=${value}&startIndex=${currentPage}&maxResults=10`,
                )
                .then((response) => {
                    setPhotos([...photos, ...response.data.items]);
                    setCurrentPage((prevState) => prevState + 10);
                    setTotalCount(response.data.totalItems);
                })
                .finally(() => setFetching(false));
        }
    }, [fetching]);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return function () {
            document.removeEventListener('scroll', scrollHandler);
        };
    }, []);

    const scrollHandler = (e: Event) => {
        if (
            e.target.documentElement.scrollHeight -
                (e.target.documentElement.scrollTop + window.innerHeight) <
                100 &&
            photos.length < totalCount
        ) {
            setFetching(true);
        }
    };

    const storeData = (
        image: string,
        name: string,
        author: string,
        description: string,
    ) => {
        let bookmark: {
            bookmarkImage: string;
            bookmarkName: string;
            bookmarkAuthor: string;
            bookmarkDescription: string;
        } = {
            bookmarkImage: image,
            bookmarkName: name,
            bookmarkAuthor: author,
            bookmarkDescription: description,
        };

        //let jsonData = JSON.stringify(bookmark)

        axios
            .post('http://localhost:3000/save-json', bookmark)
            .then((response) => {
                console.log(response.data);
            });
    };
    const renderContent = (
        image: string,
        name: string,
        author: string,
        description: string,
    ) => {
        const root = ReactDOM.createRoot(document.getElementById('try'));
        root.render(
            <div className="bookPage">
                <div className="image">
                    <img src={image} width="250px" />
                </div>
                <div className="title">
                    <b>Название: </b>"{name}"
                    <br />
                    <b>Автор: </b>
                    {author}
                    <br />
                    <b>Описание: </b>
                    {description}
                    <br />
                    <button
                        onClick={() =>
                            storeData(image, name, author, description)
                        }
                    >
                        Добавить в избранное
                    </button>
                </div>
            </div>,
        );

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <>
            <div className="line">
                {photos.map((photo) => (
                    <div
                        className="book"
                        key={photo.id}
                        onClick={() =>
                            renderContent(
                                photo.volumeInfo.imageLinks.smallThumbnail,
                                photo.volumeInfo.title,
                                photo.volumeInfo.authors,
                                photo.volumeInfo.description,
                            )
                        }
                    >
                        <div className="image">
                            <img
                                src={String(photo.volumeInfo.imageLinks?.smallThumbnail)}
                                width="250px"
                            />
                        </div>
                        <div className="title">
                            <b>Название: </b>"{photo.volumeInfo.title}"
                            <br />
                            <b>Автор: </b>
                            {photo.volumeInfo.authors}
                            <br />
                            <button
                                onClick={() =>
                                    storeData(
                                        photo.volumeInfo.imageLinks
                                            .smallThumbnail,
                                        photo.volumeInfo.title,
                                        photo.volumeInfo.authors,
                                        photo.volumeInfo.description,
                                    )
                                }
                            >
                                Добавить в избранное
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Pages;
