import { render, screen } from '@testing-library/react'
import EducationCard from './EducationCard'
import { BrowserRouter } from 'react-router-dom'

const MOCK_EDUCATION = {
  name   : "Test",
  course : "Test",
  type   : "Test",
  start  : "06/2021",
  end    : "12/2023",
  fixed  : true
}

test("checks if the admin education card had the correct items", () => {
  render(
    <BrowserRouter>
      <EducationCard index={1} item={MOCK_EDUCATION} />
    </BrowserRouter>
  )

  const id = screen.getByText(/Database Id/i)
  const name = screen.getByText(/Institution Name/i)
  const course = screen.getByText(/Course Title/i)
  const type = screen.getByText(/Course Type/i)
  const startEnd = screen.getByText(/Start - End Date/i)
  const fixed = screen.getByText(/Fixed/i)

  expect(id).toBeInTheDocument()
  expect(name).toBeInTheDocument()
  expect(course).toBeInTheDocument()
  expect(type).toBeInTheDocument()
  expect(startEnd).toBeInTheDocument()
  expect(fixed).toBeInTheDocument()

  expect(id.textContent).toMatch(new RegExp(MOCK_EDUCATION.id))
  expect(name.textContent).toMatch(new RegExp(MOCK_EDUCATION.name))
  expect(course.textContent).toMatch(new RegExp(MOCK_EDUCATION.course))
  expect(startEnd.textContent).toMatch(new RegExp(MOCK_EDUCATION.start))
  expect(startEnd.textContent).toMatch(new RegExp(MOCK_EDUCATION.end))
})
