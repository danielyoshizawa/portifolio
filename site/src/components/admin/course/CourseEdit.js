import './Course.css'
import {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import isEmpty from '../../util/IsEmpty'
import { getCookie } from '../../util/cookieManipulation'
import validate from '../../util/validate'
import courseSchema from '../../../schemas/CourseSchema'

function CourseEdit(props) {
  let params = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState({
    name        : "",
    link        : "",
    validation  : "",
    institution : "",
    date        : "",
    fixed       : false
  })
  const [status, setStatus] = useState("")

  // Load resource from database
  useEffect(() => {
    // If it's a new entry, we don't need to load from the database
    if (props.action === "new") {
      return
    }

    const uri = "http://localhost:3001/course/" + params.id
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
    const resp = validate(item, courseSchema)
    if(!resp.valid) {
      valid = false
      setStatus(resp.error)
    }
    return valid
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!validateItem()) return

    let uri = "http://localhost:3001/course/"
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
        navigate("/admin/course/")
      } else {
        setStatus(response.body)
      }
    })
  }

  return(
    <div>
      <form className="course-form" onSubmit={handleSubmit}>
        <label>Course Name :</label>
        <input
          type="text"
          value={item.name}
          onChange={(e) => setItem(
            {...item,
              name : e.target.value
            })}
        />
        <label>Certificate Link :</label>
        <input
          type="text"
          value={item.link}
          onChange={(e) => setItem(
            {...item,
              link : e.target.value
            })}
        />
        <label>Certificate Validation Code :</label>
        <input
          type="text"
          value={item.validation}
          onChange={(e) => setItem(
            {...item,
              validation : e.target.value
            })}
        />
        <label>Institution :</label>
        <input
          type="text"
          value={item.institution}
          onChange={(e) => setItem(
            {...item,
              institution : e.target.value
            })}
        />
        <label>Year :</label>
        <input
          type="text"
          value={item.date}
          onChange={(e) => setItem(
            {...item,
              date : e.target.value
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
        <input type="button" value="Cancel" onClick={() => navigate("/admin/course/")} />
      </form>
      <p>{status}</p>
    </div>
  )
}

export default CourseEdit
