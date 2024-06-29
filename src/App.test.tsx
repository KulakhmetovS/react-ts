//В связи с использованием сборщика Vite, принято решение тестировать утилитой Vitest
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Pages from './Pages';
import Header from './Header';
import Bookmarks from './Bookmarks';

//Тестирование поиска книг выполняется асинхронной функцией
test('Поиск книг выполнен удачно', async () => {
    render(<Pages value="Test" />); //Отрисовка компонента
    //Ожидание пока все элементы загрузятся и поиск элементов с названием "Test"
    const testElements = await screen.findAllByText(/Test/i);
    expect(testElements[0]).toBeInTheDocument();    //Определение наличия одного из элементов в документе
});

//Тестирование роутинга на сайте
describe('Роутинг', () => {
    it('должен переходить на главную страницу', async () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route exact path="/" element={<Pages />} />
                </Routes>
            </MemoryRouter>,
        );

        const testElements =
            await screen.findAllByText(/Добавить в избранное/i);
        expect(testElements[0]).toBeInTheDocument();
    });

    //Поиск страницы с избранными книгами сработает в том случае, 
    //если в избранное уже добавлена хотябы одна книга
    it('должен переходить на страницу "Избранное"', async () => {
        render(
            <MemoryRouter initialEntries={['/bookmarks']}>
                <Routes>
                    <Route exact path="/bookmarks" element={<Bookmarks />} />
                </Routes>
            </MemoryRouter>,
        );

        const testElements = await screen.findAllByText(
            /Удалить из избранного/i,
        );
        expect(testElements[0]).toBeInTheDocument();
    });
});
