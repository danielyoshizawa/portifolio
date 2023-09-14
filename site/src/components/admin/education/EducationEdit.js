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
    name     : useRef(),
    course   : useRef(),
    type     : useRef(),
    start    : useRef(),
    end      : useRef(),
    priority : useRef(),
    tags     : useRef([]),
    fixed    : useRef()
  }

  const [status, setStatus] = useState("")
  const [tags, setTags] = useState([])
  const serverAddress = process.env.REACT_APP_SERVER_ADDRESS

  // Load resource from database
  useEffect(() => {
    // Fetch all the tags
    fetch(serverAddress + "/tags")
      .then((response) => response.json())
      .then((json) =>{
        const resp = JSON.parse(json)
        setTags(resp.tags)
    })

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
          refs.priority.current.value = resp.priority
          refs.fixed.current.checked  = resp.fixed

          let tagsMap = new Map()
          resp.tags && resp.tags.map((item) => {
            if (item) {
              tagsMap.set(item.identity, true)
            }
          })
          refs.tags && refs.tags.current.map((item) => {
            if (item && tagsMap.get(parseInt(item.value))) {
              item.checked = true;
            }
          })
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
    , refs.priority
    , refs.tags
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

    let tagsResp = []
    refs.tags.current.map((item) => {
      if (item.checked) {
        tagsResp.push({identity : item.value})
      }
    })

    const item = {
      name     : refs.name.current.value,
      course   : refs.course.current.value,
      type     : refs.type.current.value,
      start    : refs.start.current.value,
      end      : refs.end.current.value,
      priority : refs.priority.current.value,
      fixed    : refs.fixed.current.checked,
      tags     : tagsResp
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
      if (response.status === 201) {
        navigate("/admin/education/")
      } else if (response.status === 503) {
        setStatus("Unable to create resource")
      } else {
        setStatus("Something went wrong")
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
        <label>Priority :</label>
        <input
          type="text"
          ref={refs.priority}
        />
        <label>Tags</label>
        <ul className="admin-education-tag-list">
        {tags && tags.map((item, index) => {
          return (
            <li className="admin-education-tag-item" key={index}>
              <input type="checkbox" value={item.id} ref={(element) => { refs.tags.current[index] = element }
              } />
              <p>{item.id} || {item.name} || {item.type}</p>
            </li>
          )
        })}
        </ul>
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
