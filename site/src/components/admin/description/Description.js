import './Description.css'
import {useState, useEffect} from 'react'
import isEmpty from '../../util/IsEmpty'
import DescriptionCard from './card/DescriptionCard'
import {useNavigate} from 'react-router-dom'

function Description() {
  const [descriptions, setDescriptions] = useState()
  const navigate = useNavigate()
  const serverAddress = process.env.REACT_APP_SERVER_ADDRESS

  useEffect(() => {
    fetch(serverAddress + "/description")
      .then((response) => response.json())
      .then((json) => {
        const resp = JSON.parse(json)
        if (!isEmpty(resp)) {
          setDescriptions(resp)
        }
      })
  }, [])

  let emptyMessage = (!descriptions || descriptions.length === 0) ? <p>Dude, you need to define yourself!</p> : ""

  return (
    <div className="description">
      <ul>
        { descriptions &&
          descriptions.map((item, index) => {
              return (
                <li key={index}>
                  <DescriptionCard index={index} item={item} />
                </li>
              )
            }
          )
        }
      </ul>
      <div>{emptyMessage}</div>
      <div className="admin-description-actions">
        <button onClick={() => {navigate("/admin/description/new")}}>New</button>
      </div>
    </div>
  )
}

export default Description
