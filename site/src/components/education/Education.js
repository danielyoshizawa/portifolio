import './Education.css'
import EducationCard from './card/EducationCard'

function Education(props) {
  const education = props.education
  return (
    <div id="education">
      <h2 className="title-education" data-testid="title-education">
        Education
      </h2>
      <div className="list-education" data-testid="list-education">
        {
          education.map((item, index) => (
            <EducationCard index={index} item={item} key={`${index}-education-card`} />
          ))
        }
      </div>
    </div>
  )
}

export default Education
