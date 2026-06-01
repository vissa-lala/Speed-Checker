import { render, screen } from '@testing-library/react';
import App from './App';

test('renders speed test component', () => {
  render(<App />);
  const element = screen.getByText(/SPEED CHECKER/i);
  expect(element).toBeInTheDocument();
});

test('has RUN TEST button', () => {
  render(<App />);
  const button = screen.getByText(/RUN TEST/i);
  expect(button).toBeInTheDocument();
});
