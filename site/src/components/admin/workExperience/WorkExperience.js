import './WorkExperience.css'
import {useState, useEffect} from 'react'
import ReactDOM from 'react-dom/client'
import isEmpty from '../../util/IsEmpty'
import validate from '../../util/validate'
import workExperienceSchema from '../../../schemas/WorkExperienceSchema'

function WorkExperience() {
  const [workExperience, setWorkExperience] = useState()
  const [newWorkExperience, setNewWorkExperience] = useState("")
  const [status, setStatus] = useState("")
  const [toSubmit, setToSubmit] = useState("")

  useEffect(() => {
    fetch("http://localhost:3001/workExperience")
      .then((response) => response.json())
      .then((json) => {
        const resp = JSON.parse(json)
        if (!isEmpty(resp)) {
          setWorkExperience(resp)
        }
      })
  }, [])

  const validateAll = (items) => {
    const error = []
    let valid = true;
    items.map((item) => {
      const resp = validate(item, workExperienceSchema)
      if(!resp.valid) {
        valid = false
        error.push(resp.error)
      }
    })
    setStatus(error)
    return valid
  }

  useEffect(() => {
    if (toSubmit.length === 0) return

    if (!validateAll(toSubmit.workExperience)) return

    fetch("http://localhost:3001/workExperience",
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
    setWorkExperience(toSubmit)
  }, [toSubmit])

  const handleSubmit = (event) => {
    event.preventDefault()
    let tempWorkExperience = "";
    if (isEmpty(workExperience)) {
      tempWorkExperience = {
        workExperience : [ newWorkExperience ]
      }
    } else {
      tempWorkExperience = {
        workExperience : [
        ...workExperience.workExperience,
        newWorkExperience
      ]}
    }

    setToSubmit(tempWorkExperience)
  }

  const onDelete = (index) => {
    const tempWorkExperience =
      workExperience.workExperience.slice(0, index)
        .concat(
          workExperience.workExperience.slice(index + 1, workExperience.workExperience.length)
      )
    setWorkExperience({ workExperience : [...tempWorkExperience ]} )
  }

    return (
    <div className="work-experience">
      <ul>
        { workExperience && workExperience.workExperience &&
          workExperience.workExperience.map((item, index) => {
              return (
                <li key={index}>
                  {index} | {item.company} - {item.position} - {item.location} | {item.start} - {item.end} | {item.description} | {item.techs} | Fixed {item.fixed == "true" ? "yes" : "no"}
                  <div onClick={() => onDelete(index)}>Delete</div>
                </li>
              )
            }
          )
        }
      </ul>
      <form className="work-experience-form" onSubmit={handleSubmit}>
        <label>Company Name :</label>
        <input
          type="text"
          value={newWorkExperience.company}
          onChange={(e) => setNewWorkExperience(
            {...newWorkExperience,
              company : e.target.value
            })}
        />
        <label>Position :</label>
        <input
          type="text"
          value={newWorkExperience.position}
          onChange={(e) => setNewWorkExperience(
            {...newWorkExperience,
              position : e.target.value
            })}
        />
        <label>Location :</label>
        <input
          type="text"
          value={newWorkExperience.location}
          onChange={(e) => setNewWorkExperience(
            {...newWorkExperience,
              location : e.target.value
            })}
        />
        <label>Start Date :</label>
        <input
          type="text"
          value={newWorkExperience.start}
          onChange={(e) => setNewWorkExperience(
            {...newWorkExperience,
              start : e.target.value
            })}
        />
        <label>End Date :</label>
        <input
          type="text"
          value={newWorkExperience.end}
          onChange={(e) => setNewWorkExperience(
            {...newWorkExperience,
              end : e.target.value
            })}
        />
        <label>Description :</label>
        <textarea
          value={newWorkExperience.description}
          onChange={(e) => setNewWorkExperience(
            {...newWorkExperience,
              description : e.target.value
            })}
        >
        </textarea>
        <label>Techs : </label>
        <input
          type="text"
          value={newWorkExperience.techs}
          onChange={(e) => setNewWorkExperience(
            {...newWorkExperience,
              techs: (e.target.value.split(';'))
            })}
        />
        <label>Fixed :</label>
        <input
          type="checkbox"
          checked={newWorkExperience.fixed == "true" ? 1 : 0}
          onChange={(e) => setNewWorkExperience(
            {...newWorkExperience,
              fixed : (e.target.checked ? "true" : "false")
            })}
        />
        <input type="submit" value="Save Changes"/>
        <p>{status}</p>
      </form>
    </div>
  )
}

export default WorkExperience
