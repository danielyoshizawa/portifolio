import { render, screen } from '@testing-library/react'
import Footer from './Footer'

test('checks if all the footer items are correct', () => {
  render(<Footer />)
  const lists = screen.getAllByRole('list')
  expect(lists).toHaveLength(3)
})
