import { render, screen } from '@testing-library/react'
import Education from './Education'
import educationData from '../../data/Education.mock.data.json'

test('checks if the education loads all the items', () => {
  render(<Education education={educationData.education} />)

  const educationComponent = screen.getByTestId("list-education")
  expect(educationComponent).toBeInTheDocument()
  expect(educationComponent.childElementCount).toBe(4)
})
