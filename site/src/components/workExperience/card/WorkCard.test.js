import { render, screen } from '@testing-library/react';
import WorkCard from './WorkCard'

const MOCK_EXPERIENCE = {
  start : "01/2021",
  end : "11/2022",
  company : "Donuts'n'Legends Co",
  position : "Full Stack Senior Software Engineer | CEO",
  location : "Ourinhos, SP, BR",
  description : "My own awesome company! We create solutions for the future, not sure which future, but we do.",
  techs : [
    "React",
    "React Native",
    "JavaScript",
    "HTML",
    "Neo4j",
    "ApolloQL",
    "GraphQL",
    "AWS",
    "Tech Solution"
  ]
}

test('checks if the work card has the correct items', () => {
  render(<WorkCard index={1} item={MOCK_EXPERIENCE} />)

  const company = screen.getByTestId("company-work-card")
  const startEnd = screen.getByTestId("start-end-work-card")
  const position = screen.getByTestId("position-work-card")
  const location = screen.getByTestId("location-work-card")
  const description = screen.getByTestId("description-work-card")
  const techs = screen.getByTestId("techs-work-card")

  expect(company).toBeInTheDocument()
  expect(startEnd).toBeInTheDocument()
  expect(position).toBeInTheDocument()
  expect(location).toBeInTheDocument()
  expect(description).toBeInTheDocument()
  expect(techs).toBeInTheDocument()

  expect(company.textContent).toMatch(MOCK_EXPERIENCE.company)
  expect(startEnd.textContent).toMatch(new RegExp(`${MOCK_EXPERIENCE.start} [-|\||.] ${MOCK_EXPERIENCE.end}`, 'i'))
  expect(position.textContent).toMatch(MOCK_EXPERIENCE.position)
  expect(location.textContent).toMatch(MOCK_EXPERIENCE.location)
  expect(description.textContent).toMatch(MOCK_EXPERIENCE.description)

  techs.childNodes.forEach((item, index) => {
    expect(MOCK_EXPERIENCE.techs).toContain(item.textContent)
  })
});
