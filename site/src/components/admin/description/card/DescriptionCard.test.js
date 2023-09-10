import { render, screen, within } from '@testing-library/react'
import DescriptionCard from './DescriptionCard'
import { BrowserRouter } from 'react-router-dom'

const MOCK = {
  title       : "Test",
  description : "Test",
  tags        : [
                  { "properties" : {"identity" : 16, "name" : "testTag 1"}},
                  { "properties" : {"identity": 14 , "name" : "testTag 2"}}
                ]
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
  const tags = screen.getByText(/Tags/i)
  const tagsList = screen.getByTestId("admin-description-card-tag-list")
  const tagItems = within(tagsList).getAllByRole('listitem')

  expect(id).toBeInTheDocument()
  expect(title).toBeInTheDocument()
  expect(description).toBeInTheDocument()
  expect(tags).toBeInTheDocument()

  expect(id.textContent).toMatch(new RegExp(MOCK.id))
  expect(title.textContent).toMatch(new RegExp(MOCK.title))
  expect(description.textContent).toMatch(new RegExp(MOCK.description))

  tagItems.map((item,index) => {
    expect(item.textContent).toMatch(MOCK.tags[index].properties.name)
  })
})
