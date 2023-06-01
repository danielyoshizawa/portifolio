import { render, screen } from '@testing-library/react';
import Hero from './Hero';

test('checks if the navbar has the correct items', () => {
  render(<Hero />)
  const name = screen.getByText(/daniel yoshizawa/i)
  const profession = screen.getAllByText(/software engineer/i)

  expect(name).toBeInTheDocument()
  expect(profession.length).toBeGreaterThan(0)
});
