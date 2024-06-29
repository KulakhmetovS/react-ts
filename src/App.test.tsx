import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes} from 'react-router-dom';
import Pages from './Pages';
import Header from './Header';
import Bookmarks from './Bookmarks';

test('Поиск книг выполнен удачно', async () => {
  render(<Pages value="Test" />);
  const testElements = await screen.findAllByText(/Test/i);
  expect(testElements[0]).toBeInTheDocument();
});

describe('Роутинг', () => {
  it('должен переходить на главную страницу', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route exact path="/" element={<Pages />} />
        </Routes>
      </MemoryRouter>
    );
    
    const testElements = await screen.findAllByText(/Добавить в избранное/i);
    expect(testElements[0]).toBeInTheDocument();
    //expect(screen.getAllByText(/Добавить в избранное/i)[0]).toBeInTheDocument();
  });

  it('должен переходить на страницу "Избранное"', async () => {
    render(
      <MemoryRouter initialEntries={['/bookmarks']}>
        <Routes>
          <Route exact path="/bookmarks" element={<Bookmarks />} />
        </Routes>
      </MemoryRouter>
    );
    
    const testElements = await screen.findAllByText(/Удалить из избранного/i);
    expect(testElements[0]).toBeInTheDocument();
    //expect(screen.getAllByText(/Удалить из избранного/i)[0]).toBeInTheDocument();
  });
});

