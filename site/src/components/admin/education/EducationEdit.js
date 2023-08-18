import './Education.css'
import {useState, useEffect, useRef} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import isEmpty from '../../util/IsEmpty'
import { getCookie } from '../../util/cookieManipulation'
import validate from '../../util/validate'
import educationSchema from '../../../schemas/EducationSchema'

function EducationEdit(props) {
  let params = useParams()
  const navigate = useNavigate()
  // References
  const refs =
  {
    name   : useRef(),
    course : useRef(),
    type   : useRef(),
    start  : useRef(),
    end    : useRef(),
    fixed  : useRef()
  }

  const [status, setStatus] = useState("")
  const serverAddress = process.env.REACT_APP_SERVER_ADDRESS

  // Load resource from database
  useEffect(() => {
    // If it's a new entry, we don't need to load from the database
    if (props.action === "new") {
      return
    }

    const uri = serverAddress + "/education/" + params.id
    fetch(uri)
      .then((response) => response.json())
      .then((json) => {
        if (isEmpty(json)) {
          setStatus("Couldn't find item with id : " + params.id)
          return
        }
        const resp = JSON.parse(json)
        if (!isEmpty(resp)) {
          refs.name.current.value     = resp.name
          refs.course.current.value   = resp.course
          refs.type.current.value     = resp.type
          refs.start.current.value    = resp.start
          refs.end.current.value      = resp.end
          refs.fixed.current.checked  = resp.fixed
        }
      })
  }, [props.action
    , params.id
    , serverAddress
    , refs.name
    , refs.course
    , refs.type
    , refs.start
    , refs.end
    , refs.fixed
  ])

  const validateItem = (item) => {
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

    const item = {
      name   : refs.name.current.value,
      course : refs.course.current.value,
      type   : refs.type.current.value,
      start  : refs.start.current.value,
      end    : refs.end.current.value,
      fixed  : refs.fixed.current.checked
    }

    if (!validateItem(item)) return

    let uri = serverAddress + "/education/"
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
          ref={refs.name}
        />
        <label>Course Title :</label>
        <input
          type="text"
          ref={refs.course}
        />
        <label>Course Type :</label>
        <select className="admin-education-form-select"
          ref={refs.type}
        >
          <option value="Bachelor">Bachelor</option>
          <option value="Graduated Course">Graduated Course</option>
          <option value="Technologist">Technologist</option>
          <option value="Exchange Program">Exchange Program</option>
        </select>
        <label>Start Year:</label>
        <input
          type="text"
          ref={refs.start}
        />
        <label>End Year :</label>
        <input
          type="text"
          ref={refs.end}
        />
        <label>Fixed :</label>
        <input
          type="checkbox"
          ref={refs.fixed}
        />
        <input type="submit" value="Save Changes"/>
        <input type="button" value="Cancel" onClick={() => navigate("/admin/education/")} />
      </form>
      <p>{status}</p>
    </div>
  )
}

export default EducationEdit
