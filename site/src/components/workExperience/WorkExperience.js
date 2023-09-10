import './WorkExperience.css'
import {useState} from 'react'
import WorkCard from './card/WorkCard'

function WorkExperience(props) {
  const experiences = props.experiences
  const [showMore, setShowMore] = useState(false);
  return (
    <div id="experience">
      <h2 className="title-work-experience" data-testid="title-work-experience">
        Work Experience
      </h2>
      <div className="list-work-experience" data-testid="list-work-experience">
        {
          experiences.map((item, index) => (
            <WorkCard index={index} item={item} key={`${index}-work-card`} showMore={showMore}/>
          ))
        }
      </div>
      <div className="experience-show-more">
        <p className="item" onClick={() => {setShowMore(!showMore)}}>{showMore ? "Show Less" : `Show More (${experiences.length})`}</p>
      </div>
    </div>
  )
}

export default WorkExperience
