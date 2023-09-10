import './Description.css'
import {useState, useEffect, useRef} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import isEmpty from '../../util/IsEmpty'
import { getCookie } from '../../util/cookieManipulation'
import validate from '../../util/validate'
import descriptionSchema from '../../../schemas/DescriptionSchema'

function DescriptionEdit(props) {
  let params = useParams()
  const navigate = useNavigate()
  // References
  const refs =
  {
    title       : useRef(),
    description : useRef(),
    tags        : useRef([])
  }

  const [status, setStatus] = useState("")
  const [tags, setTags] = useState([])
  const serverAddress = process.env.REACT_APP_SERVER_ADDRESS

  // Load resource from database
  useEffect(() => {
    // Fetch all the tags
    fetch(serverAddress + "/tags")
      .then((response) => response.json())
      .then((json) => {
        const resp = JSON.parse(json)
        setTags(resp.tags)
      })

    // If it's a new entry, we don't need to load from the database
    if (props.action === "new") {
      return
    }

    const uri = serverAddress + "/description/" + params.id
    fetch(uri)
      .then((response) => response.json())
      .then((json) => {
        if (isEmpty(json)) {
          setStatus("Couldn't find item with id : " + params.id)
          return
        }
        const resp = JSON.parse(json)
        if (!isEmpty(resp)) {
          refs.title.current.value         = resp.title
          refs.description.current.value   = resp.description

          let tagsMap = new Map()
          resp.tags && resp.tags.map((item) => {
            if (item) {
              tagsMap.set(item.identity, true)
            }
          })
          refs.tags && refs.tags.current.map((item) => {
            if (item && tagsMap.get(parseInt(item.value))) {
              item.checked = true
            }
          })
        }
      })
  }, [props.action
    , params.id
    , serverAddress
    , refs.title
    , refs.description
    , refs.tags
  ])

  const validateItem = (item) => {
    let valid = true;
    const resp = validate(item, descriptionSchema)
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
        tagsResp.push({identity: item.value})
      }
    })

    const item = {
      title       : refs.title.current.value,
      description : refs.description.current.value,
      tags        : tagsResp
    }

    if (!validateItem(item)) return

    let uri = serverAddress + "/description/"
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
        navigate("/admin/description/")
      } else if (response.status === 503) {
        setStatus("Unable to create resource")
      } else {
        setStatus("Something went wrong")
      }
    })
  }

  return(
    <div>
      <form className="description-form" onSubmit={handleSubmit}>
        <label>Title :</label>
        <input
          type="text"
          ref={refs.title}
        />
        <label>Description :</label>
        <textarea
          type="text"
          ref={refs.description}
        ></textarea>
        <label>Tags</label>
        <ul className="admin-description-tag-list">
        {tags && tags.map((item, index) => {
          return (
            <li className="admin-description-tag-item" key={index}>
              <input type="checkbox" value={item.id} ref={(element) => { refs.tags.current[index] = element }
              } />
              <p>{item.id} || {item.name} || {item.type}</p>
            </li>
          )
        })}
        </ul>
        <input type="submit" value="Save Changes"/>
        <input type="button" value="Cancel" onClick={() => navigate("/admin/description/")} />
      </form>
      <p>{status}</p>
    </div>
  )
}

export default DescriptionEdit
