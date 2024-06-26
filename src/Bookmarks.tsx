import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Pages_and_Bookmarks.css';

function Bookmarks() {
    const [books, setBooks] = useState([]); //Состояние массива книг

    useEffect(() => {
        //axios get запрос на локальный сервер для получения сохранённых ранее книг
        axios.get('http://localhost:3000/get-json').then((response) => {
            setBooks(response.data); //Обновление состояние с массивом новых книг
        });
    }, []);

    //deleteData удаляет указанную книгу с сервера
    const deleteData = (name: string, description: string) => {
        //Объект с параметрами удаляемого объекта
        const params = {
            param1: name,
            param2: description,
        };

        //axios delete запрос
        axios
            .delete('http://localhost:3000/items', { params })
            .then((response) => {
                console.log(response.data);

                //axios get запрос на получение нового списка сохранённых книг
                axios.get('http://localhost:3000/get-json').then((response) => {
                    setBooks(response.data); //Обновление состояние с массивом новых книг
                });
            });
    };

    return (
        <>
            <div className="line">
                {/*Проходимся по массиву книг*/}
                {books.map((book) => (
                    <div className="book" key={book.bookmarkName}>
                        <div className="image">
                            <img src={book.bookmarkImage} width="320px" />
                        </div>
                        <div className="title">
                            <b>Название: </b>"{book.bookmarkName}"
                            <br />
                            <b>Автор: </b>
                            {book.bookmarkAuthor}
                            <br />
                            <b>Описание: </b>
                            {book.bookmarkDescription}
                            <br />
                            <button
                                onClick={() =>
                                    deleteData(
                                        book.bookmarkName,
                                        book.bookmarkDescription,
                                    )
                                }
                            >
                                Удалить из избранного
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Bookmarks;
