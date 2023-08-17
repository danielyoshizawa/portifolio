import './Course.css'
import {useState, useEffect} from 'react'
import isEmpty from '../../util/IsEmpty'
import validate from '../../util/validate'
import courseSchema from '../../../schemas/CourseSchema'
import { getCookie } from '../../util/cookieManipulation'
import CourseCard from './card/CourseCard'

function Course() {
  const [courses, setCourses] = useState()
  const [newCourse, setNewCourse] = useState("")
  const [status, setStatus] = useState("")
  const [toSubmit, setToSubmit] = useState("")

  useEffect(() => {
    fetch("http://localhost:3001/course")
      .then((response) => response.json())
      .then((json) => {
        const resp = JSON.parse(json)
        if (!isEmpty(resp)) {
          setCourses(resp)
        }
      })
  }, [])

  const validateAll = (items) => {
    const error = []
    let valid = true;
    items.map((item) => {
      const resp = validate(item, courseSchema)
      if(!resp.valid) {
        valid = false
        error.push(resp.error)
      }
      return item
    })
    setStatus(error)
    return valid
  }

  useEffect(() => {
    if (toSubmit.length === 0) return

    if (!validateAll(toSubmit.course)) return

    fetch("http://localhost:3001/course",
      {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(toSubmit),
        headers : {
          'Content-Type' : 'application/json',
          'Authorization' : "Bearer " + getCookie('token')
        }
      }
    )
    .then((response) => {
      if (response.status === 200) {
        setStatus("Success")
        setCourses(toSubmit)
      } else {
        setStatus("Failure")
      }
    })
  }, [toSubmit])

  const handleSubmit = (event) => {
    event.preventDefault()
    let tempCourses = "";
    if (isEmpty(courses)) {
      tempCourses = {
        course : [ newCourse ]
      }
    } else {
      tempCourses = {
        course : [
        ...courses.course,
        newCourse
      ]}
    }

    setToSubmit(tempCourses)
  }

  const onDelete = (index) => {
    const tempCourses =
      courses.course.slice(0, index)
        .concat(
          courses.course.slice(index + 1, courses.course.length)
      )
    setCourses({ course : [...tempCourses ]} )
  }

  // TODO : Add the right fields to the form
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
      <form className="course-form" onSubmit={handleSubmit}>
        <label>Course Name :</label>
        <input
          type="text"
          value={newCourse.name}
          onChange={(e) => setNewCourse(
            {...newCourse,
              name : e.target.value
            })}
        />
        <label>Certificate Link :</label>
        <input
          type="text"
          value={newCourse.link}
          onChange={(e) => setNewCourse(
            {...newCourse,
              link : e.target.value
            })}
        />
        <label>Certificate Validation Code :</label>
        <input
          type="text"
          value={newCourse.validation}
          onChange={(e) => setNewCourse(
            {...newCourse,
              validation : e.target.value
            })}
        />
        <label>Institution :</label>
        <input
          type="text"
          value={newCourse.institution}
          onChange={(e) => setNewCourse(
            {...newCourse,
              institution : e.target.value
            })}
        />
        <label>Year :</label>
        <input
          type="text"
          value={newCourse.date}
          onChange={(e) => setNewCourse(
            {...newCourse,
              date : e.target.value
            })}
        />
        <label>Fixed :</label>
        <input
          type="checkbox"
          checked={newCourse.fixed === "true" ? 1 : 0}
          onChange={(e) => setNewCourse(
            {...newCourse,
              fixed : (e.target.checked ? "true" : "false")
            })}
        />
        <input type="submit" value="Save Changes"/>
        <p>{status}</p>
      </form>
    </div>
  )
}

export default Course
