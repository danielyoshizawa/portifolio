import './Education.css'
import {useState, useEffect} from 'react'
import ReactDOM from 'react-dom/client'
import isEmpty from '../../util/IsEmpty'

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

  useEffect(() => {
    if (toSubmit.length === 0) return
    fetch("http://localhost:3001/education",
      {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(toSubmit),
        headers : {
          'Content-Type' : 'application/json'
        }
      }
    )
    .then((response) => {
      if (response.status == 200) {
        setStatus("Success")
      } else {
        setStatus("Failure")
      }
    })
    setEducations(toSubmit)
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

  return (
    <div className="education">
      <ul>
        { educations && educations.education &&
          educations.education.map((item, index) => {
              return (
                <li key={index}>{item.name} - {item.start} | {item.end} - {item.type} - Fixed {item.fixed == "true" ? "yes" : "no"} | Edit | Delete</li>
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
          required
        />
        <label>Course Title :</label>
        <input
          type="text"
          value={newEducation.course}
          onChange={(e) => setNewEducation(
            {...newEducation,
              course : e.target.value
            })}
          required
        />
        <label>Course Type :</label>
        <input
          type="text"
          value={newEducation.type}
          onChange={(e) => setNewEducation(
            {...newEducation,
              type : e.target.value
            })}
          required
        />
        <label>Start Year:</label>
        <input
          type="text"
          value={newEducation.start}
          onChange={(e) => setNewEducation(
            {...newEducation,
              start : e.target.value
            })}
          required
        />
        <label>End Year :</label>
        <input
          type="text"
          value={newEducation.end}
          onChange={(e) => setNewEducation(
            {...newEducation,
              end : e.target.value
            })}
          required
        />
        <label>Fixed :</label>
        <input
          type="checkbox"
          checked={newEducation.fixed == "true" ? 1 : 0}
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
