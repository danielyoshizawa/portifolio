import './WorkExperienceCard.css'
import {useNavigate} from 'react-router-dom'

function WorkExperienceCard(props) {
  const item = props.item
  const index = props.index
  const navigate = useNavigate()

  const onDelete = () => {
    navigate("/admin/workExperience/" + item.id + "/delete")
  }
  const onEdit = () => {
    navigate("/admin/workExperience/" + item.id + "/edit")
  }

  return (
    <div className="admin-work-experience-card" key={"admin-work-experience-card-"+index}>
      <div className="admin-work-experience-card-description">
        <div className="admin-work-experience-card-description-section">
          <p>Database Id : {item.id} </p>
          <p>Company Name : {item.company}</p>
          <p>Position : {item.position}</p>
        </div>
        <div className="admin-work-experience-card-description-section">
          <p>Location : {item.location}</p>
          <p>Start - End Date : {item.start} - {item.end}</p>
          <p>Priority : {item.priority}</p>
          <p>Fixed : {item.fixed ? "yes" : "no"}</p>
        </div>
        <div className="admin-work-experience-card-description-section">
          <p>Description : {item.description}</p>
        </div>
        <div className="admin-work-experience-card-description-section">
          <p>Tags : </p>
          <ul className="admin-work-experience-card-tag-list" data-testid="admin-work-experience-card-tag-list">
            { item.tags && item.tags.map((tag, index) => {
              return (<li className="admin-work-experience-card-tag-item" key={`tag-item-${index}`}>{tag && tag.properties ? tag.properties.name : ""}</li>)
            })}
          </ul>
        </div>
      </div>
      <div className="admin-work-experience-card-action">
        <button className="admin-work-experience-card-action-item" key={"admin-work-experience-card-action-edit-item-"+index} onClick={onEdit}><p>Edit</p></button>
        <button className="admin-work-experience-card-action-item" key={"admin-work-experience-card-action-delete-item-"+index} onClick={onDelete}><p>Delete</p></button>
      </div>
    </div>
  )
}

export default WorkExperienceCard
