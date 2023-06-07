import { render, screen } from '@testing-library/react'
import EducationCard from './EducationCard'

const MOCK_EDUCATION = {
  name   : "Test",
  course : "Test",
  type   : "Test",
  start  : "06/2021",
  end    : "12/2023"
}

test('checks if the education card has the correct items', () => {
  render(<EducationCard index={1} item={MOCK_EDUCATION} />)

  const name = screen.getByTestId("name-education-card")
  const course = screen.getByTestId("course-education-card")
  const type = screen.getByTestId("type-education-card")
  const startEnd = screen.getByTestId("start-end-education-card")

  expect(name).toBeInTheDocument()
  expect(course).toBeInTheDocument()
  expect(type).toBeInTheDocument()
  expect(startEnd).toBeInTheDocument()

  expect(name.textContent).toMatch(MOCK_EDUCATION.name)
  expect(course.textContent).toMatch(MOCK_EDUCATION.course)
  expect(type.textContent).toMatch(MOCK_EDUCATION.type)
  expect(startEnd.textContent).toMatch(new RegExp(`${MOCK_EDUCATION.start} [-|\||.] ${MOCK_EDUCATION.end}`))

})
