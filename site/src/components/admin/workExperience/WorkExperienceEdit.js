import './WorkExperience.css'
import {useState, useEffect, useRef} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import isEmpty from '../../util/IsEmpty'
import { getCookie } from '../../util/cookieManipulation'
import validate from '../../util/validate'
import workExperienceSchema from '../../../schemas/WorkExperienceSchema'

function WorkExperienceEdit(props) {
  let params = useParams()
  const navigate = useNavigate()
  // References
  const refs =
  {
    company     : useRef(),
    position    : useRef(),
    location    : useRef(),
    start       : useRef(),
    end         : useRef(),
    description : useRef(),
    priority    : useRef(),
    tags        : useRef([]),
    fixed       : useRef()
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

    const uri = serverAddress + "/workExperience/" + params.id
    fetch(uri)
      .then((response) => response.json())
      .then((json) => {
        if (isEmpty(json)) {
          setStatus("Couldn't find item with id : " + params.id)
          return
        }

        const resp = JSON.parse(json)
        if (!isEmpty(resp)) {
          refs.company.current.value     = resp.company
          refs.position.current.value    = resp.position
          refs.location.current.value    = resp.location
          refs.start.current.value       = resp.start
          refs.end.current.value         = resp.end
          refs.description.current.value = resp.description
          refs.priority.current.value    = resp.priority
          refs.fixed.current.checked     = resp.fixed

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
    , refs.company
    , refs.position
    , refs.location
    , refs.start
    , refs.end
    , refs.description
    , refs.priority
    , refs.tags
    , refs.fixed
  ])

  const validateItem = (item) => {
    let valid = true;
    const resp = validate(item, workExperienceSchema)
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
      company     : refs.company.current.value,
      position    : refs.position.current.value,
      location    : refs.location.current.value,
      start       : refs.start.current.value,
      end         : refs.end.current.value,
      description : refs.description.current.value,
      priority    : refs.priority.current.value,
      fixed       : refs.fixed.current.checked,
      tags        : tagsResp
    }

    if (!validateItem(item)) return

    let uri = serverAddress + "/workExperience/"
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
        navigate("/admin/workExperience/")
      } else if (response.status === 503) {
        setStatus("Unable to create resource")
      } else {
        setStatus("Something went wrong")
      }
    })
  }

  return(
    <div>
      <form className="work-experience-form" onSubmit={handleSubmit}>
        <label>Company Name :</label>
        <input
          type="text"
          ref={refs.company}
        />
        <label>Position :</label>
        <input
          type="text"
          ref={refs.position}
        />
        <label>Location :</label>
        <input
          type="text"
          ref={refs.location}
        />
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
        <label>Description :</label>
        <textArea
          ref={refs.description}
        ></textArea>
        <label>Tags</label>
        <ul className="admin-work-experience-tag-list">
        {tags && tags.map((item, index) => {
          return (
            <li className="admin-work-experience-tag-item" key={index}>
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
        <input type="button" value="Cancel" onClick={() => navigate("/admin/workExperience/")} />
      </form>
      <p>{status}</p>
    </div>
  )
}

export default WorkExperienceEdit
