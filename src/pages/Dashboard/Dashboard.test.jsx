import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Dashboard } from './Dashboard';

test('renders Dashboard', () => {
  render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );
  const pageTitleElem = screen.getByText(/Dashboard/i);
  expect(pageTitleElem).toBeInTheDocument();
});

test('renders No Favorites', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
    const noFavoritesElem = screen.getByText(/No Favorites Added/i);
    expect(noFavoritesElem).toBeInTheDocument();
});
