import './Courses.css'
import CourseCard from './card/CourseCard'
import {useState} from 'react'
import order from '../util/order'

function Courses (props) {
  const courses = order(props.courses)
  const [showMore, setShowMore] = useState(false);
  return (
    <div id="certifications-background">
      <div id="certifications">
        <h2 className="courses" data-testid="courses">Courses & Certifications</h2>
        <div className="list-courses" data-testid="list-courses">
          {
            courses.map((item, index) => (
              <CourseCard index={index} item={item} key={`${index}-course-card`} showMore={showMore}/>
            ))
          }
        </div>
      </div>
      <div className="certifications-show-more">
        <p className="item" onClick={() => {setShowMore(!showMore)}}>{showMore ? "Show Less" : `Show More (${courses.length})`}</p>
      </div>
    </div>
  )
}

export default Courses
