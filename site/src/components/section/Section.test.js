import { render, screen } from '@testing-library/react'

import Section from './Section'

test('Checks if the sections loads a list', () => {
  render(<Section />)

  const sections = screen.getByRole('list')

  expect(sections).toBeInTheDocument()
})
