import { render, screen } from '@testing-library/react';
import WorkCard from './WorkCard'

const MOCK_EXPERIENCE = {
  start : "01/2021",
  end : "11/2022",
  company : "Donuts'n'Legends Co",
  position : "Full Stack Senior Software Engineer | CEO",
  location : "Ourinhos, SP, BR",
  description : "My own awesome company! We create solutions for the future, not sure which future, but we do.",
  tags : [
    { properties : {name : "React"}},
    { properties : {name : "React Native"}},
    { properties : {name : "JavaScript"}},
    { properties : {name : "HTML"}},
    { properties : {name : "Neo4j"}},
    { properties : {name : "ApolloQL"}},
    { properties : {name : "GraphQL"}},
    { properties : {name : "AWS"}},
    { properties : {name : "Tech Solution"}}
  ]
}

test('checks if the work card has the correct items', () => {
  render(<WorkCard index={1} item={MOCK_EXPERIENCE} />)

  const company = screen.getByTestId("company-work-card")
  const startEnd = screen.getByTestId("start-end-work-card")
  const position = screen.getByTestId("position-work-card")
  const location = screen.getByTestId("location-work-card")
  const description = screen.getByTestId("description-work-card")
  const tags = screen.getByTestId("tags-work-card")

  expect(company).toBeInTheDocument()
  expect(startEnd).toBeInTheDocument()
  expect(position).toBeInTheDocument()
  expect(location).toBeInTheDocument()
  expect(description).toBeInTheDocument()
  expect(tags).toBeInTheDocument()

  expect(company.textContent).toMatch(MOCK_EXPERIENCE.company)
  expect(startEnd.textContent).toMatch(new RegExp(`${MOCK_EXPERIENCE.start} [-|\||.] ${MOCK_EXPERIENCE.end}`, 'i'))
  expect(position.textContent).toMatch(MOCK_EXPERIENCE.position)
  expect(location.textContent).toMatch(MOCK_EXPERIENCE.location)
  expect(description.textContent).toMatch(MOCK_EXPERIENCE.description)

  const tagsNames = MOCK_EXPERIENCE.tags.map((item) => item.properties.name)

  tags.childNodes.forEach((item, index) => {
    expect(tagsNames).toContain(item.textContent)
  })
});
