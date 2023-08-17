import './Education.css'
import {useState, useEffect} from 'react'
import isEmpty from '../../util/IsEmpty'
import EducationCard from './card/EducationCard'
import {useNavigate} from 'react-router-dom'

function Education() {
  const [educations, setEducations] = useState()
  const navigate = useNavigate()
  const serverAddress = process.env.REACT_APP_SERVER_ADDRESS

  useEffect(() => {
    fetch(serverAddress + "/education")
      .then((response) => response.json())
      .then((json) => {
        const resp = JSON.parse(json)
        if (!isEmpty(resp)) {
          setEducations(resp)
        }
      })
  }, [])

  let emptyMessage = (!educations || !educations.education || educations.education.length === 0) ? <p>You are uneducated go grab a book, my friend</p> : ""

  return (
    <div className="education">
      <ul>
        { educations && educations.education &&
          educations.education.map((item, index) => {
              return (
                <li key={index}>
                  <EducationCard index={index} item={item} />
                </li>
              )
            }
          )
        }
      </ul>
      <div>{emptyMessage}</div>
      <div className="admin-education-actions">
        <button onClick={() => {navigate("/admin/education/new")}}>New</button>
      </div>
    </div>
  )
}

export default Education
