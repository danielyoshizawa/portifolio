import './Course.css'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCookie } from '../../util/cookieManipulation'

function CourseDelete() {
  const navigate = useNavigate()
  const params = useParams()
  const [status, setStatus] = useState("")
  const serverAddress = process.env.REACT_APP_SERVER_ADDRESS

  const handleDelete = (event) => {
    event.preventDefault()

    const uri = serverAddress + "/course/" + params.id + "/delete"
    fetch(uri,
      {
        method: 'POST',
        mode: 'cors',
        headers : {
          'Content-Type' : 'application/json',
          'Authorization' : "Bearer " + getCookie('token')
        }
      }
    )
    .then((response) => {
      if (response.status === 200) {
        navigate("/admin/course/")
      } else if (response.status === 503) {
        setStatus("Unable to delete resource")
      } else {
        setStatus("Something went wrong")
      }
    })
  }

  return (
    <div>
      <p>Are you sure you want to delete Course Entry - {params.id}</p>
      <button onClick={handleDelete}>Confirm</button>
      <button onClick={() => navigate('/admin/course')}>Cancel</button>
      <p>{status}</p>
    </div>
  )
}

export default CourseDelete
