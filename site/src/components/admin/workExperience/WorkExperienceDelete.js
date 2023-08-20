import './WorkExperience.css'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCookie } from '../../util/cookieManipulation'

function WorkExperienceDelete() {
  const navigate = useNavigate()
  const params = useParams()
  const [status, setStatus] = useState("")
  const serverAddress = process.env.REACT_APP_SERVER_ADDRESS

  const handleDelete = (event) => {
    event.preventDefault()

    const uri = serverAddress + "/workExperience/" + params.id + "/delete"
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
        navigate("/admin/workExperience/")
      } else {
        setStatus(response.body)
      }
    })
  }

  return (
    <div>
      <p>Are you sure you want to delete Work Experience Entry - {params.id}</p>
      <button onClick={handleDelete}>Confirm</button>
      <button onClick={() => navigate('/admin/workExperience')}>Cancel</button>
      <p>{status}</p>
    </div>
  )
}

export default WorkExperienceDelete
