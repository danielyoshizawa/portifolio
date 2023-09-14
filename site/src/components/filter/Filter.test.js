import { render, screen } from '@testing-library/react'
import Filter from './Filter'

test('checks if all the filter items are correct', () => {
  render(<Filter />)
  const everything = screen.getByText(/Everything/i)
  const cpp = screen.getByText(/C\+\+/i)
  const python = screen.getByText(/Python/i)
  const javascript = screen.getByText(/Javascript/i)

  expect(everything).toBeInTheDocument()
  expect(cpp).toBeInTheDocument()
  expect(python).toBeInTheDocument()
  expect(javascript).toBeInTheDocument()
})
