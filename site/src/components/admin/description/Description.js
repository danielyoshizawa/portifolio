import './Description.css'
import {useState, useEffect} from 'react'
import { getCookie } from '../../util/cookieManipulation'

function Description() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("")
  const serverAddress = process.env.REACT_APP_SERVER_ADDRESS

  useEffect(() => {
    fetch(serverAddress + "/description")
      .then((response) => response.json())
      .then((json) => {
        const resp = JSON.parse(json)
        setTitle(resp.title)
        setDescription(resp.description)
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const resp = {
      title       : title,
      description : description
    }
    fetch(serverAddress + "/description",
      {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(resp),
        headers : {
          'Content-Type' : 'application/json',
          'Authorization' : "Bearer " + getCookie('token')
        }
      }
    )
    .then((response) => {
      if (response.status === 201) {
        setStatus("Success")
      } else if (response.status === 503) {
        setStatus("Unable to create resource")
      } else {
        setStatus("Something went wrong")
      }
    })
  }

  return (
    <form className="description-form" onSubmit={handleSubmit}>
      <label>Title :</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Description :</label>
      <textarea
        value={description}
        onChange={(e) => {setDescription(e.target.value)}}
      >
      </textarea>
      <input type="submit" />
      <p>{status}</p>
    </form>
  )
}

export default Description
