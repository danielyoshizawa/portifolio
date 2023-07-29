import { render, screen, fireEvent } from '@testing-library/react'
import WorkExperience from './WorkExperience'
import workExperienceData from '../../data/WorkExperience.mock.data.json'

test('checks if the work experience loads all the items', () => {
  render(<WorkExperience experiences={workExperienceData.experiences} />)

  const workExperienceComponent = screen.getByTestId("list-work-experience")
  expect(workExperienceComponent).toBeInTheDocument()
  expect(workExperienceComponent.childElementCount).toBe(5)
});

test('checks if show more and show less are working', async () => {
  const {container} = render(<WorkExperience experiences={workExperienceData.experiences} />)
  expect(container.getElementsByClassName('show')).toHaveLength(3)
  const showMore = screen.getByText(/show/i);
  await fireEvent.click(showMore);
  expect(container.getElementsByClassName('show')).toHaveLength(5)
  await fireEvent.click(showMore);
  expect(container.getElementsByClassName('show')).toHaveLength(3)
})
