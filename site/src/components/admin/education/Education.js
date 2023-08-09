import './Education.css'
import {useState, useEffect} from 'react'
import isEmpty from '../../util/IsEmpty'
import validate from '../../util/validate'
import educationSchema from '../../../schemas/EducationSchema'
import { getCookie } from '../../util/cookieManipulation'

function Education() {
  const [educations, setEducations] = useState()
  const [newEducation, setNewEducation] = useState("")
  const [status, setStatus] = useState("")
  const [toSubmit, setToSubmit] = useState("")

  useEffect(() => {
    fetch("http://localhost:3001/education")
      .then((response) => response.json())
      .then((json) => {
        const resp = JSON.parse(json)
        if (!isEmpty(resp)) {
          setEducations(resp)
        }
      })
  }, [])

  const validateAll = (items) => {
    const error = []
    let valid = true;
    items.map((item) => {
      const resp = validate(item, educationSchema)
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

    if (!validateAll(toSubmit.education)) return

    fetch("http://localhost:3001/education",
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
        setEducations(toSubmit)
      } else {
        setStatus("Failure")
      }
    })
  }, [toSubmit])

  const handleSubmit = (event) => {
    event.preventDefault()
    let tempEducations = "";
    if (isEmpty(educations)) {
      tempEducations = {
        education : [ newEducation ]
      }
    } else {
      tempEducations = {
        education : [
        ...educations.education,
        newEducation
      ]}
    }

    setToSubmit(tempEducations)
  }

  const onDelete = (index) => {
    const tempEducations =
      educations.education.slice(0, index)
        .concat(
          educations.education.slice(index + 1, educations.education.length)
      )
    setEducations({ education : [...tempEducations ]} )
  }

  return (
    <div className="education">
      <ul>
        { educations && educations.education &&
          educations.education.map((item, index) => {
              return (
                <li key={index}>
                  {index} | {item.name} - {item.course} - {item.start} | {item.end} - {item.type} - Fixed {item.fixed === "true" ? "yes" : "no"}
                  <div onClick={() => onDelete(index)}>Delete</div>
                </li>
              )
            }
          )
        }
      </ul>
      <form className="education-form" onSubmit={handleSubmit}>
        <label>Institution Name :</label>
        <input
          type="text"
          value={newEducation.name}
          onChange={(e) => setNewEducation(
            {...newEducation,
              name : e.target.value
            })}
        />
        <label>Course Title :</label>
        <input
          type="text"
          value={newEducation.course}
          onChange={(e) => setNewEducation(
            {...newEducation,
              course : e.target.value
            })}
        />
        <label>Course Type :</label>
        <input
          type="text"
          value={newEducation.type}
          onChange={(e) => setNewEducation(
            {...newEducation,
              type : e.target.value
            })}
        />
        <label>Start Year:</label>
        <input
          type="text"
          value={newEducation.start}
          onChange={(e) => setNewEducation(
            {...newEducation,
              start : e.target.value
            })}
        />
        <label>End Year :</label>
        <input
          type="text"
          value={newEducation.end}
          onChange={(e) => setNewEducation(
            {...newEducation,
              end : e.target.value
            })}
        />
        <label>Fixed :</label>
        <input
          type="checkbox"
          checked={newEducation.fixed === "true" ? 1 : 0}
          onChange={(e) => setNewEducation(
            {...newEducation,
              fixed : (e.target.checked ? "true" : "false")
            })}
        />
        <input type="submit" value="Save Changes"/>
        <p>{status}</p>
      </form>
    </div>
  )
}

export default Education
