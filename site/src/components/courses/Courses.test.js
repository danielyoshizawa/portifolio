import { render, screen, fireEvent } from '@testing-library/react'
import Courses from './Courses'
import coursesData from '../../data/Courses.mock.data.json'

test('checks if all the courses are loaded', () => {
  render(<Courses courses={coursesData.courses} />)

  const coursesComponent = screen.getByTestId("list-courses")
  expect(coursesComponent).toBeInTheDocument()
  expect(coursesComponent.childElementCount).toBe(5)
})

test('checks if show more and show less are working', async () => {
  const {container} = render(<Courses courses={coursesData.courses} />)
  expect(container.getElementsByClassName('show')).toHaveLength(3)
  const showMore = screen.getByText(/show/i);
  await fireEvent.click(showMore);
  expect(container.getElementsByClassName('show')).toHaveLength(5)
  await fireEvent.click(showMore);
  expect(container.getElementsByClassName('show')).toHaveLength(3)
})
