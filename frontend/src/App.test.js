import { render, screen } from '@testing-library/react';
import App from './App';

test('renders airline trends app', () => {
  render(<App />);
  const titleElement = screen.getByText(/Airline Market Demand Trends/i);
  expect(titleElement).toBeInTheDocument();
});