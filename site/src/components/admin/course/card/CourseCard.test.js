import { render, screen } from '@testing-library/react'
import CourseCard from './CourseCard'
import { BrowserRouter } from 'react-router-dom'

const MOCK_COURSE = {
  id          : 1,
  name        : "Test",
  date        : "05/2023",
  institution : "Test",
  validation  : "TestTestTest",
  link        : "https://test.com/test",
  fixed       : true
}

test("checks if the admin course card had the correct items", () => {
  render(
    <BrowserRouter>
      <CourseCard index={1} item={MOCK_COURSE} />
    </BrowserRouter>
  )

  const id = screen.getByText(/Database Id/i)
  const name = screen.getByText(/Course Name/i)
  const link = screen.getByText(/Certificate Link/i)
  const code = screen.getByText(/Validation Code/i)
  const institution = screen.getByText(/Institution/i)
  const year = screen.getByText(/Year/i)
  const fixed = screen.getByText(/Fixed/i)

  expect(id).toBeInTheDocument()
  expect(name).toBeInTheDocument()
  expect(link).toBeInTheDocument()
  expect(code).toBeInTheDocument()
  expect(institution).toBeInTheDocument()
  expect(fixed).toBeInTheDocument()

  expect(id.textContent).toMatch(new RegExp(MOCK_COURSE.id))
  expect(name.textContent).toMatch(new RegExp(MOCK_COURSE.name))
  expect(link.textContent).toMatch(new RegExp(MOCK_COURSE.link))
  expect(code.textContent).toMatch(new RegExp(MOCK_COURSE.code))
  expect(institution.textContent).toMatch(new RegExp(MOCK_COURSE.institution))
})
