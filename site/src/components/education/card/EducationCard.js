import './EducationCard.css'

function EducationCard (props) {
  return (
    <div className="education-card" data-testid="education-card" key={`${props.index}-education-card`}>
      <h3 className="name-education-card" data-testid="name-education-card" key={`${props.index}-name-education-card`}>{props.item.name}</h3>
      <p className="course-education-card" data-testid="course-education-card" key={`${props.index}-course-education-card`}>{props.item.course}</p>
      <p className="type-education-card" data-testid="type-education-card" key={`${props.index}-type-education-card`}>{props.item.type}</p>
      <p className="start-end-education-card" data-testid="start-end-education-card" key={`${props.index}-start-end-education-card`}>{`${props.item.start} - ${props.item.end}`}</p>
    </div>
  )
}

export default EducationCard
