import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './Pages_and_Bookmarks.css';
import Header from './Header.tsx';

function Pages({ value }) {
    const [books, setBooks] = useState([]); //Состояние массива книг
    const [currentPage, setCurrentPage] = useState<number>(1); //Состояние количества страниц
    const [fetching, setFetching] = useState<boolean>(true); //Состояние прокрутки
    const [totalCount, setTotalCount] = useState<number>(11); //Состояние получения книг

    useEffect(() => {
        if (fetching) {
            //Если достигнут низ страницы
            //axios get запрос на получение списка книг с заданными параметрами
            axios
                .get(
                    `https://www.googleapis.com/books/v1/volumes?q=${value}&startIndex=${currentPage}&maxResults=10`,
                )
                .then((response) => {
                    setBooks([...books, ...response.data.items]); //Новые книги подгружаются в массив к старым
                    setCurrentPage((prevState) => prevState + 10); //Киличество позиций книг +10
                    setTotalCount(response.data.totalItems); //Получение общего числа книг
                })
                .finally(() => setFetching(false));
        }
    }, [fetching]); //Установлена зависимость от получения книг

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler); //Получаем состояние прокрутки
        return function () {
            document.removeEventListener('scroll', scrollHandler);
        };
    }, []);

    const scrollHandler = (e: Event) => {
        if (
            //Если достигнут низ страницы и число полученных книг не превысило число имеющихся на сервере
            e.target.documentElement.scrollHeight -
                (e.target.documentElement.scrollTop + window.innerHeight) <
                100 &&
            books.length < totalCount
        ) {
            setFetching(true); //Можно отправлять запрос на получение новых книг
        }
    };

    //storeData сохраняет данные на локальном сервере через порт 3000
    const storeData = (
        image: string,
        name: string,
        author: string,
        description: string,
    ) => {
        //Создание объекта с сохраняемыми данными
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

        //axios post запрос на сервер для сохранения данных
        axios
            .post('http://localhost:3000/save-json', bookmark)
            .then((response) => {
                console.log(response.data);
            });
    };

    //renderContent отвечает за отрисовку карточки книги
    const renderContent = (
        image: string,
        name: string,
        author: string,
        description: string,
    ) => {
        //Отрисовка корточки товара в блоке с id = bookCard
        const root = ReactDOM.createRoot(document.getElementById('bookCard'));
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

    //Тут идёт отрисовка основной ленты с книгами
    return (
        <>
            <div className="line">
            <div id="bookCard"></div>
                {/*Проходимся по массиву книг*/}
                {books.map((book) => (
                    <div
                        className="book"
                        key={book.id}
                        onClick={() =>
                            renderContent(
                                book.volumeInfo.imageLinks.smallThumbnail,
                                book.volumeInfo.title,
                                book.volumeInfo.authors,
                                book.volumeInfo.description,
                            )
                        }
                    >
                        <div className="image">
                            {/*В этом месте был критический баг (На момент коммита исправлен).
                        В некоторых случая при поиске страница просто переставала полностью отображаться.
                        Баг воспроизводился при загрузке книги, у которой отстуствует обложка*/}
                            <img
                                src={String(
                                    book.volumeInfo.imageLinks?.smallThumbnail,
                                )}
                                width="250px"
                            />
                        </div>
                        <div className="title">
                            <b>Название: </b>"{book.volumeInfo.title}"
                            <br />
                            <b>Автор: </b>
                            {book.volumeInfo.authors}
                            <br />
                            <button
                                onClick={() =>
                                    storeData(
                                        book.volumeInfo.imageLinks
                                            .smallThumbnail,
                                        book.volumeInfo.title,
                                        book.volumeInfo.authors,
                                        book.volumeInfo.description,
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
