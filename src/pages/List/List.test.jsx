import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { List } from './List';

test('renders List', () => {
  render(
    <BrowserRouter>
      <List />
    </BrowserRouter>
  );
  const pageTitleElem = screen.getByText(/Item List/i);
  expect(pageTitleElem).toBeInTheDocument();
});

test('renders No items', () => {
    render(
      <BrowserRouter>
        <List />
      </BrowserRouter>
    );
    const noItemsElem = screen.getByText(/No Items Found/i);
    expect(noItemsElem).toBeInTheDocument();
});