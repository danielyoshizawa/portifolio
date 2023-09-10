import { render, screen } from '@testing-library/react';
import Description from './Description';

const MOCK_DESCRIPTION = [{
  title: "Test",
  description : "Test Description"
}]

test('checks if the description has the correct items', () => {
  render(<Description description={MOCK_DESCRIPTION}/>)

  const title = screen.getByTestId("title-description")
  const text = screen.getByTestId("text-description")

  expect(title).toBeInTheDocument();
  expect(text).toBeInTheDocument();
});
