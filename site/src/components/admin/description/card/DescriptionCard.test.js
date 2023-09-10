import { render, screen } from '@testing-library/react'
import DescriptionCard from './DescriptionCard'
import { BrowserRouter } from 'react-router-dom'

const MOCK = {
  title       : "Test",
  description : "Test"
}

test("checks if the admin description card has the correct items", () => {
  render(
    <BrowserRouter>
      <DescriptionCard index={1} item={MOCK} />
    </BrowserRouter>
  )

  const id = screen.getByText(/Database Id/i)
  const title = screen.getByText(/Title/i)
  const description = screen.getByText(/Description/i)

  expect(id).toBeInTheDocument()
  expect(title).toBeInTheDocument()
  expect(description).toBeInTheDocument()

  expect(id.textContent).toMatch(new RegExp(MOCK.id))
  expect(title.textContent).toMatch(new RegExp(MOCK.title))
  expect(description.textContent).toMatch(new RegExp(MOCK.description))

})
