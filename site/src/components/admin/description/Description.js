import './Description.css'
import {useState, useEffect} from 'react'
import { getCookie } from '../../util/cookieManipulation'

function Description() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("")

  useEffect(() => {
    fetch("http://localhost:3001/description")
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
    fetch("http://localhost:3001/description",
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
      if (response.status === 200) {
        setStatus("Success")
      } else {
        setStatus("Failure")
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
