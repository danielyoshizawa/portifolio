import WorkCard from './card/WorkCard'
import './WorkExperience.css'

function WorkExperience(props) {
  const experiences = props.experiences
  return (
    <div id="experience">
      <h2 className="title-work-experience" data-testid="title-work-experience">
        Work Experience
      </h2>
      <div className="list-work-experience" data-testid="list-work-experience">
        {
          experiences.map((item, index) => (
            <WorkCard index={index} item={item} key={`${index}-work-card`}/>
          ))
        }
      </div>
    </div>
  )
}

export default WorkExperience
