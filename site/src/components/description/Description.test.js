import { render, screen } from '@testing-library/react';
import Description from './Description';

test('checks if the description has the correct items', () => {
  render(<Description />)

  const title = screen.getByTestId("title-description")
  const text = screen.getByTestId("text-description")

  expect(title).toBeInTheDocument();
  expect(text).toBeInTheDocument();
});
