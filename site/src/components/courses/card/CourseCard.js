import './CourseCard.css'

function CourseCard (props) {
  return (
    <div className="course-card" data-testid="course-card" key={`${props.index}-course-card`}>
      <div className="course-card-header">
        <div>
          <h3 className="name-course-card item" data-testid="name-course-card" key={`${props.index}-name-course-card`}>{props.item.name}</h3>
          <p className="validation-course-card item" data-testid="validation-course-card" key={`${props.index}-validation-course-card`}>
            <a href={props.item.link} target="_blank" rel="noopener noreferrer" className="link-course-card" data-testid="link-course-card" key={`${props.index}-link-course-card`}>{props.item.validation}</a>
          </p>
        </div>
        <div className="course-card-institution-date">
          <p className="institution-course-card item" data-testid="institution-course-card" key={`${props.index}-institution-course-card`}>{props.item.institution}</p>
          <p className="date-course-card item" data-testid="date-course-card" key={`${props.index}-date-course-card`}>{props.item.date}</p>
        </div>
      </div>
    </div>
  )
}

export default CourseCard
