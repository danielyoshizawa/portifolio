import { render, screen } from '@testing-library/react'
import SocialGenerator from './SocialGenerator'

const MOCK_SOCIAL = [
    {
      name : "email",
      link : "mailto:test@test.com"
    },
    {
      name : "linkedin",
      link : "https://www.linkedin.com/in/test"
    },
    {
      name : "github",
      link : "https://github.com/test"
    }
]

test('checks if the social information is correct', () => {
  render(<SocialGenerator social={MOCK_SOCIAL} parentName="test" />)

  const list = screen.getByTestId("test-social-list")
  const items = screen.getAllByRole("listitem")

  expect(list).toBeInTheDocument()
  expect(list.childElementCount).toBe(3)
  expect(items.length).toBe(3)
  items.forEach((item, index) => {
    expect(item.firstChild).toHaveProperty("href", MOCK_SOCIAL[index].link)
  })
})
