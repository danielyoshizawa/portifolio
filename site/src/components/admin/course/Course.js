import './Course.css'
import {useState, useEffect} from 'react'
import isEmpty from '../../util/IsEmpty'
import CourseCard from './card/CourseCard'
import {useNavigate} from 'react-router-dom'

function Course() {
  const [courses, setCourses] = useState()
  const navigate = useNavigate()
  const serverAddress = process.env.REACT_APP_SERVER_ADDRESS

  useEffect(() => {
    fetch(serverAddress + "/course")
      .then((response) => response.json())
      .then((json) => {
        const resp = JSON.parse(json)
        if (!isEmpty(resp)) {
          setCourses(resp)
        }
      })
  }, [])

  let emptyMessage = (!courses || !courses.course || courses.course.length === 0) ? <p>Maybe you should subscribe to some classes</p> : ""

  return (
    <div className="course">
      <ul>
        { courses && courses.course &&
          courses.course.map((item, index) => {
              return (
                <li key={index}>
                  <CourseCard index={index} item={item} />
                </li>
              )
            }
          )
        }
      </ul>
      <div>{emptyMessage}</div>
      <div className="admin-course-actions">
        <button onClick={() => {navigate("/admin/course/new")}}>New</button>
      </div>
    </div>
  )
}

export default Course
