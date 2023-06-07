import { render, screen } from '@testing-library/react'
import CourseCard from './CourseCard'

const MOCK_COURSE = {
  name        : "Test",
  date        : "05/2023",
  institution : "Test",
  validation  : "TestTestTest",
  link        : "https://test.com/test"
}

test("checks if the course card had the correct items", () => {
  render(<CourseCard index={1} item={MOCK_COURSE} />)

  const name = screen.getByTestId("name-course-card")
  const date = screen.getByTestId("date-course-card")
  const institution = screen.getByTestId("institution-course-card")
  const validation = screen.getByTestId("validation-course-card")
  const link = screen.getByTestId("link-course-card")

  expect(name).toBeInTheDocument()
  expect(date).toBeInTheDocument()
  expect(institution).toBeInTheDocument()
  expect(validation).toBeInTheDocument()
  expect(link).toBeInTheDocument()

  expect(name.textContent).toMatch(MOCK_COURSE.name)
  expect(date.textContent).toMatch(MOCK_COURSE.date)
  expect(institution.textContent).toMatch(MOCK_COURSE.institution)
  expect(validation.textContent).toMatch(MOCK_COURSE.validation)
  expect(link).toHaveProperty("href", MOCK_COURSE.link)
})
