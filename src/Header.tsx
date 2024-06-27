import { useState } from 'react';
import { NavLink } from 'react-router-dom';
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
                <div className="label">
                    <h1>OpenBooks</h1>
                </div>
                <div className="input">
                    <input
                        type="text"
                        placeholder="Начните вводить сюда название книги для поиска"
                        onChange={handleChange}
                    />
                </div>
                <div className="navigation">
                    <NavLink to="/" activeClassName="active">
                        Главная
                    </NavLink>
                    <NavLink to="/bookmarks" activeClassName="active">
                        Избранное
                    </NavLink>
                </div>
            </div>
        </>
    );
}

export default Header;
