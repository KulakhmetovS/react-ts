import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './Header.tsx';
import Pages from './Pages.tsx';
import Bookmarks from './Bookmarks.tsx';
import './Bookmarks.css';
import './Header.css';
import './Pages.css'
import './index.css';

function App() {
    const [value, setValue] = useState<string>('all');
    
    //handleChange получает поисковый запрос из компонента Header и передаёт его в Pages
    const handleChange = (value: string) => {
        //Для работы API заменяем все пробелы на нижнее подчёркивание
        let newValue: string = value.replace(/ /g, '_');
        setValue(newValue);
    };

    return (
        <>
            <Header onChange={handleChange} />
            <div id="bookCard"></div>

            <Routes>
                {/* При динамическом изменении ключа элемента элемент перерисовывается с новыми данными */}
                <Route path="/" element={<Pages key={value} value={value} />} />
                <Route path="/bookmarks" element={<Bookmarks />} />
            </Routes>
        </>
    );
}

export default App;
