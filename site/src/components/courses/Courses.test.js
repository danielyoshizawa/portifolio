import { render, screen } from '@testing-library/react'
import Courses from './Courses'
import coursesData from '../../data/Courses.mock.data.json'

test('checks if all the courses are loaded', () => {
  render(<Courses courses={coursesData.courses} />)

  const coursesComponent = screen.getByTestId("list-courses")
  expect(coursesComponent).toBeInTheDocument()
  expect(coursesComponent.childElementCount).toBe(5)
})
