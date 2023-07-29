import { render, screen, fireEvent } from '@testing-library/react'
import Education from './Education'
import educationData from '../../data/Education.mock.data.json'

test('checks if the education loads all the items', () => {
  render(<Education education={educationData.education} />)

  const educationComponent = screen.getByTestId("list-education")
  expect(educationComponent).toBeInTheDocument()
  expect(educationComponent.childElementCount).toBe(4)
})

test('checks if show more and show less are working', async () => {
  const {container} = render(<Education education={educationData.education} />)
  expect(container.getElementsByClassName('show')).toHaveLength(3)
  const showMore = screen.getByText(/show/i);
  await fireEvent.click(showMore);
  expect(container.getElementsByClassName('show')).toHaveLength(4)
  await fireEvent.click(showMore);
  expect(container.getElementsByClassName('show')).toHaveLength(3)
})
