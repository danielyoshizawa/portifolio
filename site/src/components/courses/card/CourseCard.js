import './CourseCard.css'

function CourseCard (props) {
  return (
    <div className="course-card" data-testid="course-card" key={`${props.index}-course-card`}>
      <h3 className="name-course-card" data-testid="name-course-card" key={`${props.index}-name-course-card`}>{props.item.name}</h3>
      <p className="date-course-card" data-testid="date-course-card" key={`${props.index}-date-course-card`}>{props.item.date}</p>
      <p className="institution-course-card" data-testid="institution-course-card" key={`${props.index}-institution-course-card`}>{props.item.institution}</p>
      <p className="validation-course-card" data-testid="validation-course-card" key={`${props.index}-validation-course-card`}>
        <a href={props.item.link} target="_blank" rel="noopener noreferrer" className="link-course-card" data-testid="link-course-card" key={`${props.index}-link-course-card`}>{props.item.validation}</a>
      </p>
    </div>
  )
}

export default CourseCard
