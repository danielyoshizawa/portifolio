import { render, screen } from '@testing-library/react'
import WorkExperience from './WorkExperience'
import workExperienceData from '../../data/WorkExperience.mock.data.json'

test('checks if the work experience loads all the items', () => {
  render(<WorkExperience experiences={workExperienceData.experiences} />)

  const workExperienceComponent = screen.getByTestId("list-work-experience")
  expect(workExperienceComponent).toBeInTheDocument()
  expect(workExperienceComponent.childElementCount).toBe(5)
});
