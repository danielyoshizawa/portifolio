import CourseCard from './card/CourseCard'
import './Courses.css'

function Courses (props) {
  const courses = props.courses
  return (
    <div id="certifications-background">
      <div id="certifications">
        <h2 className="courses" data-testid="courses">Courses & Certifications</h2>
        <div className="list-courses" data-testid="list-courses">
          {
            courses.map((item, index) => (
              <CourseCard index={index} item={item} key={`${index}-course-card`}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Courses
