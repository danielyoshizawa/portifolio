import './WorkExperience.css'
import {useState, useEffect} from 'react'
import isEmpty from '../../util/IsEmpty'
import {useNavigate} from 'react-router-dom'
import WorkExperienceCard from './card/WorkExperienceCard'

function WorkExperience() {
  const [workExperience, setWorkExperience] = useState()
  const navigate = useNavigate()
  const serverAddress = process.env.REACT_APP_SERVER_ADDRESS

  useEffect(() => {
    fetch(serverAddress + "/workExperience")
      .then((response) => response.json())
      .then((json) => {
        const resp = JSON.parse(json)
        if (!isEmpty(resp)) {
          setWorkExperience(resp)
        }
      })
  }, [])

  let emptyMessage = (!workExperience || !workExperience.workExperience || workExperience.workExperience.length === 0) ? <p>Cmon, you spend the whole day in the couch, go get a job, dude!</p> : ""

  return (
    <div className="work-experience">
      <ul>
        { workExperience && workExperience.workExperience &&
          workExperience.workExperience.map((item, index) => {
              return (
                <li key={index}>
                  <WorkExperienceCard index={index} item={item} />
                </li>
              )
            }
          )
        }
      </ul>
      <div>{emptyMessage}</div>
      <div className="admin-work-experience-actions">
        <button onClick={() => {navigate("/admin/workExperience/new")}}>New</button>
      </div>
    </div>
  )
}

export default WorkExperience
