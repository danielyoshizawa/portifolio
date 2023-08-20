import { render, screen, within } from '@testing-library/react'
import WorkExperienceCard from './WorkExperienceCard'
import { BrowserRouter } from 'react-router-dom'

const MOCK = {
  "id"          : 19,
  "company"     : "Test Rested CREATE2",
  "position"    : "Test Position",
  "location"    : "Test Location",
  "start"       : "2022",
  "end"         : "2300",
  "description" : "Test Description",
  "fixed"       : true,
  "tags"        : [
                    { "properties" : {"identity" : 16, "name" : "testTag 1"}},
                    { "properties" : {"identity": 14 , "name" : "testTag 2"}}
                  ]
}

test("checks if the admin work experience card had the correct items", () => {
  render(
    <BrowserRouter>
      <WorkExperienceCard index={1} item={MOCK} />
    </BrowserRouter>
  )

  const id = screen.getByText(/Database Id/i)
  const company = screen.getByText(/Company Name/i)
  const position = screen.getByText(/Position/i)
  const location = screen.getByText(/Location/i)
  const date = screen.getByText(/Date/i)
  const fixed = screen.getByText(/Fixed/i)
  const description = screen.getByText(/Description/i)
  const tags = screen.getByText(/Tags/i)
  const tagsList = screen.getByTestId("admin-work-experience-card-tag-list")
  const tagItems = within(tagsList).getAllByRole('listitem')

  expect(id).toBeInTheDocument()
  expect(company).toBeInTheDocument()
  expect(position).toBeInTheDocument()
  expect(location).toBeInTheDocument()
  expect(date).toBeInTheDocument()
  expect(fixed).toBeInTheDocument()
  expect(description).toBeInTheDocument()
  expect(tags).toBeInTheDocument()

  expect(id.textContent).toMatch(new RegExp(MOCK.id))
  expect(company.textContent).toMatch(new RegExp(MOCK.company))
  expect(position.textContent).toMatch(new RegExp(MOCK.position))
  expect(location.textContent).toMatch(new RegExp(MOCK.location))
  expect(date.textContent).toMatch(new RegExp(MOCK.start))
  expect(date.textContent).toMatch(new RegExp(MOCK.end))
  expect(description.textContent).toMatch(new RegExp(MOCK.description))

  tagItems.map((item,index) => {
    expect(item.textContent).toMatch(MOCK.tags[index].properties.name)
  })
})
