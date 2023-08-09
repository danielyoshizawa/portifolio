import './EducationCard.css'

function EducationCard (props) {
  return (
    <div className={"education-card " + (props.item.fixed === "true" || props.showMore ? "show" : "hide")} data-testid="education-card" key={`${props.index}-education-card`}>
      <div className="education-card-header">
        <div>
          <h3 className="name-education-card item" data-testid="name-education-card" key={`${props.index}-name-education-card`}>{props.item.name}</h3>
          <p className="course-education-card item" data-testid="course-education-card" key={`${props.index}-course-education-card`}>{props.item.course}</p>
        </div>
        <div className="education-card-institution-date">
          <p className="type-education-card item" data-testid="type-education-card" key={`${props.index}-type-education-card`}>{props.item.type}</p>
          <p className="start-end-education-card item" data-testid="start-end-education-card" key={`${props.index}-start-end-education-card`}>{`${props.item.start} - ${props.item.end}`}</p>
        </div>
      </div>
    </div>
  )
}

export default EducationCard
