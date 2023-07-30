import { render, screen, fireEvent } from '@testing-library/react'
import WorkCardDescription from './WorkCardDescription'

const MOCK_SHORT = {
  index       : "1",
  description : "This is a short description",
  maxLength   : "100",
}

const MOCK_LONG = {
  index       : "1",
  description : "This is a long description, the idea is to test if the read more and read less link are present and working",
  maxLength   : "100",
}


test("checks if a description shorter than maxLength will not add read more functionality", async () => {
  render(<WorkCardDescription index={MOCK_SHORT.index} description={MOCK_SHORT.description} maxLength={MOCK_SHORT.maxLength} />)
  const description = screen.getByTestId("description-work-card")
  expect(description.textContent).toBe(MOCK_SHORT.description)
  expect(screen.queryByText(/Read/i)).toBeNull()
})

test("checks if the read more functionality is working", async () => {
  const {container} = render(<WorkCardDescription index={MOCK_LONG.index} description={MOCK_LONG.description} maxLength={MOCK_LONG.maxLength} />)
  const shortDescription = screen.getByTestId("description-work-card")
  const readMore = screen.getByTestId("description-work-card-read-more")
  await fireEvent.click(readMore)
  const longDescription = screen.getByTestId("description-work-card")
  expect(shortDescription.textContent != longDescription.textContent)
  await fireEvent.click(readMore)
  const shortDescription2 = screen.getByTestId("description-work-card");
  expect(shortDescription).toEqual(shortDescription2)
})
