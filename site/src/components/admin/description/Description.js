import './Description.css'
import {useState} from 'react'
import ReactDOM from 'react-dom/client'

function Description() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault()
    // TODO : Save the data into the file.

  }

  return (
    <form className="description-form" onSubmit={handleSubmit}>
      <label>Title
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>Description
        <textarea
          value={description}
          onChange={(e) => {setDescription(e.target.value)}}
        >
        </textarea>
      </label>
      <input type="submit" />
    </form>
  )
}

export default Description
