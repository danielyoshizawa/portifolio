import './Tags.css'
import {useState, useEffect, useRef} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import isEmpty from '../../util/IsEmpty'
import { getCookie } from '../../util/cookieManipulation'
import validate from '../../util/validate'
import tagsSchema from '../../../schemas/TagsSchema'

function TagsEdit(props) {
  let params = useParams()
  const navigate = useNavigate()
  // References
  const refs =
  {
    name   : useRef(),
    type   : useRef()
  }

  const [status, setStatus] = useState("")
  const serverAddress = process.env.REACT_APP_SERVER_ADDRESS

  // Load resource from database
  useEffect(() => {
    // If it's a new entry, we don't need to load from the database
    if (props.action === "new") {
      return
    }

    const uri = serverAddress + "/tags/" + params.id
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
          refs.type.current.value     = resp.type
        }
      })
  }, [props.action
    , params.id
    , serverAddress
    , refs.name
    , refs.type
  ])

  const validateItem = (item) => {
    let valid = true;
    const resp = validate(item, tagsSchema)
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
      type   : refs.type.current.value
    }

    if (!validateItem(item)) return

    let uri = serverAddress + "/tags/"
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
        navigate("/admin/tags/")
      } else if (response.status === 503) {
        setStatus("Unable to create resource")
      } else {
        setStatus("Something went wrong")
      }
    })
  }

  return(
    <div>
      <form className="tags-form" onSubmit={handleSubmit}>
        <label>Name :</label>
        <input
          type="text"
          ref={refs.name}
        />
        <label>Type :</label>
        <input
          type="text"
          ref={refs.type}
        />
        <input type="submit" value="Save Changes"/>
        <input type="button" value="Cancel" onClick={() => navigate("/admin/tags/")} />
      </form>
      <p>{status}</p>
    </div>
  )
}

export default TagsEdit
