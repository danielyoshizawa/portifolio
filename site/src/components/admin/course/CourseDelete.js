import './Course.css'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCookie } from '../../util/cookieManipulation'

function CourseDelete() {
  const navigate = useNavigate()
  const params = useParams()
  const [status, setStatus] = useState("")

  const handleDelete = (event) => {
    event.preventDefault()

    const uri = "http://localhost:3001/course/" + params.id + "/delete"
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
      } else {
        setStatus(response.body)
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
