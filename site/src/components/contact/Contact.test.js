import { render, screen } from '@testing-library/react'
import Contact from './Contact'
import contactData from '../../data/Contact.mock.data.json'

test('', () => {
  render(<Contact contact={contactData.contact} />)
  const list = screen.getByRole("list")
  const items = screen.getAllByRole("listitem")

  expect(list).toBeInTheDocument()
  expect(list.childElementCount).toBe(4)

  items.forEach((item, index) => {
    expect(item.firstChild).toHaveProperty("href", contactData.contact[index].link)
  })
})
