import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders initial route', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const pageTitleElem = screen.getByText(/Dashboard/i);
  expect(pageTitleElem).toBeInTheDocument();
});
