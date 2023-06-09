import { render, screen } from '@testing-library/react'

import Social from './Social'
import socialData from '../../data/Social.mock.data.json'


test('Checks if the social loads a list', () => {
  render(<Social social={socialData.social} />)

  const list = screen.getByRole("list")

  expect(list).toBeInTheDocument()
  expect(list.childElementCount).toBe(4)
})
