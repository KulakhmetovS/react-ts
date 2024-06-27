import { useState, KeyboardEvent } from 'react';
import './Header.css';

function Header({ onChange }) {
    //handleChange отвечает за получение поискового запроса из поля ввода 
    //и передачу его через пропс onChange в компонент Pages
    const handleChange = (e: Event) => {
        onChange(e.target.value);
    };

    return (
        <>
            <div className="header">
                <div>
                    <h1>OpenBooks</h1>
                </div>
                <div className="input">
                    <input
                        type="text"
                        placeholder="Начните вводить сюда название книги для поиска"
                        onChange={handleChange}
                    />
                </div>
                <a href="/">Home</a>
                <a href="/bookmarks">Bookmarks</a>
            </div>
        </>
    );
}

export default Header;
