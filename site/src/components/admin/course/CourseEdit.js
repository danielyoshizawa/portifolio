import './Course.css'
import {useState, useEffect, useRef} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import isEmpty from '../../util/IsEmpty'
import { getCookie } from '../../util/cookieManipulation'
import validate from '../../util/validate'
import courseSchema from '../../../schemas/CourseSchema'

function CourseEdit(props) {
  let params = useParams()
  const navigate = useNavigate()
  // References - TODO : Change to an array
  const nameRef = useRef()
  const linkRef = useRef()
  const validationRef = useRef()
  const institutionRef = useRef()
  const dateRef = useRef()
  const fixedRef = useRef()
  const tagsRef = useRef([])
  const priorityRef = useRef()

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

    const uri = serverAddress + "/course/" + params.id
    fetch(uri)
      .then((response) => response.json())
      .then((json) => {
        if (isEmpty(json)) {
          setStatus("Couldn't find item with id : " + params.id)
          return
        }
        const resp = JSON.parse(json)
        if (!isEmpty(resp)) {
          nameRef.current.value        = resp.name
          linkRef.current.value        = resp.link
          validationRef.current.value  = resp.validation
          institutionRef.current.value = resp.institution
          dateRef.current.value        = resp.date
          priorityRef.current.value    = resp.priority
          fixedRef.current.checked     = resp.fixed

          let tagsMap = new Map()
          resp.tags && resp.tags.map((item) => {
            if (item) {
              tagsMap.set(item.identity, true)
            }
          })
          tagsRef && tagsRef.current.map((item) => {
            if (item && tagsMap.get(parseInt(item.value))) {
              item.checked = true;
            }
          })
        }
      })
  }, [props.action
    , params.id
    , serverAddress
    , nameRef
    , linkRef
    , validationRef
    , institutionRef
    , dateRef
    , priorityRef
    , fixedRef
    , tagsRef
  ])

  const validateItem = (item) => {
    let valid = true;
    const resp = validate(item, courseSchema)
    if(!resp.valid) {
      valid = false
      setStatus(resp.error)
    }
    return valid
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    let tagsResp = []
    tagsRef.current.map((item) => {
      if (item.checked) {
        tagsResp.push({identity : item.value})
      }
    })

    const item = {
      name        : nameRef.current.value,
      link        : linkRef.current.value,
      validation  : validationRef.current.value,
      institution : institutionRef.current.value,
      date        : dateRef.current.value,
      priority    : priorityRef.current.value,
      fixed       : fixedRef.current.checked,
      tags        : tagsResp
    }

    if (!validateItem(item)) return

    let uri = serverAddress + "/course/"
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
        navigate("/admin/course/")
      } else if (response.status === 503) {
        setStatus("Unable to create resource")
      } else {
        setStatus("Something went wrong")
      }
    })
  }

  return(
    <div>
      <form className="course-form" onSubmit={handleSubmit}>
        <label>Course Name :</label>
        <input
          type="text"
          ref={nameRef}
        />
        <label>Certificate Link :</label>
        <input
          type="text"
          ref={linkRef}
        />
        <label>Certificate Validation Code :</label>
        <input
          type="text"
          ref={validationRef}
        />
        <label>Institution :</label>
        <input
          type="text"
          ref={institutionRef}
        />
        <label>Year :</label>
        <input
          type="text"
          ref={dateRef}
        />
        <label>Priority :</label>
        <input
          type="text"
          ref={priorityRef}
        />
        <label>Tags</label>
        <ul className="admin-course-tag-list">
        {tags && tags.map((item, index) => {
          return (
            <li className="admin-course-tag-item" key={index}>
              <input type="checkbox" value={item.id} ref={(element) => { tagsRef.current[index] = element }
              } />
              <p>{item.id} || {item.name} || {item.type}</p>
            </li>
          )
        })}
        </ul>
        <label>Fixed :</label>
        <input
          type="checkbox"
          ref={fixedRef}
        />
        <input type="submit" value="Save Changes"/>
        <input type="button" value="Cancel" onClick={() => navigate("/admin/course/")} />
      </form>
      <p>{status}</p>
    </div>
  )
}

export default CourseEdit
