import { render, screen } from '@testing-library/react'
import TagsCard from './TagsCard'
import { BrowserRouter } from 'react-router-dom'

const MOCK = {
  name   : "TestName",
  type   : "TestType",
}

test("checks if the admin tags card had the correct items", () => {
  render(
    <BrowserRouter>
      <TagsCard index={1} item={MOCK} />
    </BrowserRouter>
  )

  const id = screen.getByText(/Database Id/i)
  const name = screen.getByText(/Name/i)
  const type = screen.getByText(/Type/i)

  expect(id).toBeInTheDocument()
  expect(name).toBeInTheDocument()
  expect(type).toBeInTheDocument()

  expect(id.textContent).toMatch(new RegExp(MOCK.id))
  expect(name.textContent).toMatch(new RegExp(MOCK.name))
  expect(type.textContent).toMatch(new RegExp(MOCK.type))
})
