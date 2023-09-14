import './Education.css'
import EducationCard from './card/EducationCard'
import {useState} from 'react'
import order from '../util/order'

function Education(props) {
  const education = order(props.education)
  const [showMore, setShowMore] = useState(false)
  return (
    <div id="education">
      <h2 className="title-education" data-testid="title-education">
        Education
      </h2>
      <div className="list-education" data-testid="list-education">
        {
          education.map((item, index) => (
            <EducationCard index={index} item={item} key={`${index}-education-card`} showMore={showMore} />
          ))
        }
      </div>
      <div className="education-show-more">
        <p className="item" onClick={() => {setShowMore(!showMore)}}>{showMore ? "Show Less" : `Show More (${education.length})`}</p>
      </div>
    </div>
  )
}

export default Education
