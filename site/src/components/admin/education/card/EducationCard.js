import './EducationCard.css'
import {useNavigate} from 'react-router-dom'

function EducationCard(props) {
  const item = props.item
  const index = props.index
  const navigate = useNavigate()

  const onDelete = () => {
    navigate("/admin/education/" + item.id + "/delete")
  }
  const onEdit = () => {
    navigate("/admin/education/" + item.id + "/edit")
  }

  return (
    <div className="admin-education-card" key={"admin-education-card-"+index}>
      <div className="admin-education-card-description">
        <div className="admin-education-card-description-section">
          <p>Database Id : {item.id} </p>
          <p>Institution Name : {item.name}</p>
          <p>Course Title : {item.course}</p>
        </div>
        <div className="admin-education-card-description-section">
          <p>Course Type : {item.type}</p>
          <p>Start - End Date : {item.start} - {item.end}</p>
          <p>Priority : {item.priority}</p>
          <p>Fixed : {item.fixed ? "yes" : "no"}</p>
        </div>
        <div className="admin-education-card-description-section">
          <p>Tags : </p>
          <ul className="admin-education-card-tag-list" data-testid="admin-education-card-tag-list">
            { item.tags && item.tags.map((tag, index) => {
              return (<li className="admin-education-card-tag-item" key={`tag-item-${index}`}>{tag && tag.properties ? tag.properties.name : ""}</li>)
            })}
          </ul>
        </div>
      </div>
      <div className="admin-education-card-action">
        <button className="admin-education-card-action-item" key={"admin-education-card-action-edit-item-"+index} onClick={onEdit}><p>Edit</p></button>
        <button className="admin-education-card-action-item" key={"admin-education-card-action-delete-item-"+index} onClick={onDelete}><p>Delete</p></button>
      </div>
    </div>
  )
}

export default EducationCard
