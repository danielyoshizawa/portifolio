import './Tags.css'
import {useState, useEffect} from 'react'
import isEmpty from '../../util/IsEmpty'
import TagsCard from './card/TagsCard'
import {useNavigate} from 'react-router-dom'

function Tags() {
  const [tags, setTags] = useState()
  const navigate = useNavigate()
  const serverAddress = process.env.REACT_APP_SERVER_ADDRESS

  useEffect(() => {
    fetch(serverAddress + "/tags")
      .then((response) => response.json())
      .then((json) => {
        const resp = JSON.parse(json)
        if (!isEmpty(resp)) {
          setTags(resp)
        }
      })
  }, [])

  let emptyMessage = (!tags || !tags.tags || tags.tags.length === 0) ? <p>Not Tags? You need to organize things better, mate!</p> : ""

  return (
    <div className="tags">
      <ul>
        { tags && tags.tags &&
          tags.tags.map((item, index) => {
              return (
                <li key={index}>
                  <TagsCard index={index} item={item} />
                </li>
              )
            }
          )
        }
      </ul>
      <div>{emptyMessage}</div>
      <div className="admin-tags-actions">
        <button onClick={() => {navigate("/admin/tags/new")}}>New</button>
      </div>
    </div>
  )
}

export default Tags
