import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Bookmarks.css';

function Bookmarks() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/get-json').then((response) => {
            setBooks(response.data);
        });
    }, []);

    const deleteData = (name: string, description: string) => {
        const params = {
            param1: name,
            param2: description,
        };

        axios
            .delete('http://localhost:3000/items', { params })
            .then((response) => {
                console.log(response.data);

                axios.get('http://localhost:3000/get-json').then((response) => {
                    setBooks(response.data);
                });
            });
    };

    return (
        <>
            <div className="page">
                {books.map((book) => (
                    <div className="book" key={book.bookmarkName}>
                        <div className="image">
                            <img src={book.bookmarkImage} width="250px" />
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
