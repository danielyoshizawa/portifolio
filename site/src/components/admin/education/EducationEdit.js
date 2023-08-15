import './Education.css'
import {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import isEmpty from '../../util/IsEmpty'
import { getCookie } from '../../util/cookieManipulation'
import validate from '../../util/validate'
import educationSchema from '../../../schemas/EducationSchema'

function EducationEdit(props) {
  let params = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState({
    name: "",
    course: "",
    type: "Bachelor",
    start: "",
    end: "",
    fixed: false
  })
  const [status, setStatus] = useState("")

  // Load resource from database
  useEffect(() => {
    // If it's a new entry, we don't need to load from the database
    if (props.action === "new") {
      return
    }

    const uri = "http://localhost:3001/education/" + params.id
    fetch(uri)
      .then((response) => response.json())
      .then((json) => {
        if (isEmpty(json)) {
          setStatus("Couldn't find item with id : " + params.id)
          return
        }
        const resp = JSON.parse(json)
        if (!isEmpty(resp)) {
          setItem(resp)
        }
      })
  })

  const validateItem = () => {
    let valid = true;
    const resp = validate(item, educationSchema)
    if(!resp.valid) {
      valid = false
      setStatus(resp.error)
    }
    return valid
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!validateItem()) return

    let uri = "http://localhost:3001/education/"
    if (props.action === "edit") {
      uri +=  params.id
    }

    fetch(uri,
      {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(item),
        headers : {
          'Content-Type' : 'application/json',
          'Authorization' : "Bearer " + getCookie('token')
        }
      }
    )
    .then((response) => {
      if (response.status === 200) {
        navigate("/admin/education/")
      } else {
        setStatus(response.body)
      }
    })
  }

  return(
    <div>
      <form className="education-form" onSubmit={handleSubmit}>
        <label>Institution Name :</label>
        <input
          type="text"
          value={item.name}
          onChange={(e) => setItem(
            {...item,
              name : e.target.value
            })}
        />
        <label>Course Title :</label>
        <input
          type="text"
          value={item.course}
          onChange={(e) => setItem(
            {...item,
              course : e.target.value
            })}
        />
        <label>Course Type :</label>
        <select className="admin-education-form-select"
          value={item.type}
          onChange={(e) => setItem(
            {...item,
              type : e.target.value
            })}>
          <option value="Bachelor">Bachelor</option>
          <option value="Graduated Course">Graduated Course</option>
          <option value="Technologist">Technologist</option>
          <option value="Exchange Program">Exchange Program</option>
        </select>
        <label>Start Year:</label>
        <input
          type="text"
          value={item.start}
          onChange={(e) => setItem(
            {...item,
              start : e.target.value
            })}
        />
        <label>End Year :</label>
        <input
          type="text"
          value={item.end}
          onChange={(e) => setItem(
            {...item,
              end : e.target.value
            })}
        />
        <label>Fixed :</label>
        <input
          type="checkbox"
          checked={item.fixed ? true : false}
          onChange={(e) => setItem(
            {...item,
              fixed : e.target.checked
            })}
        />
        <input type="submit" value="Save Changes"/>
        <input type="button" value="Cancel" onClick={() => navigate("/admin/education/")} />
      </form>
      <p>{status}</p>
    </div>
  )
}

export default EducationEdit
