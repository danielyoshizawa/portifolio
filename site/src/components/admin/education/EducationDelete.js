import './Education.css'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCookie } from '../../util/cookieManipulation'

function EducationDelete() {
  const navigate = useNavigate()
  const params = useParams()
  const [status, setStatus] = useState("")

  const handleDelete = (event) => {
    event.preventDefault()

    const uri = "http://localhost:3001/education/" + params.id + "/delete"
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
        navigate("/admin/education/")
      } else {
        setStatus(response.body)
      }
    })
  }

  return (
    <div>
      <p>Are you sure you want to delete Education Entry - {params.id}</p>
      <button onClick={handleDelete}>Confirm</button>
      <button onClick={() => navigate('/admin/education')}>Cancel</button>
      <p>{status}</p>
    </div>
  )
}

export default EducationDelete