import './DescriptionCard.css'
import {useNavigate} from 'react-router-dom'

function DescriptionCard(props) {
  const item = props.item
  const index = props.index
  const navigate = useNavigate()

  const onDelete = () => {
    navigate("/admin/description/" + item.id + "/delete")
  }
  const onEdit = () => {
    navigate("/admin/description/" + item.id + "/edit")
  }

  return (
    <div className="admin-description-card" key={"admin-description-card-"+index}>
      <div className="admin-description-card-description">
        <div className="admin-description-card-description-section">
          <p>Database Id : {item.id} </p>
          <p>Title : {item.title}</p>
          <p>Description : {item.description}</p>
        </div>
      </div>
      <div className="admin-description-card-description-section">
        <p>Tags : </p>
        <ul className="admin-description-card-tag-list" data-testid="admin-description-card-tag-list">
          { item.tags && item.tags.map((tag, index) => {
            return (<li className="admin-description-card-tag-item" key={`tag-item-${index}`}>{tag && tag.properties ? tag.properties.name : ""}</li>)
          })}
        </ul>
      </div>
      <div className="admin-description-card-action">
        <button className="admin-description-card-action-item" key={"admin-description-card-action-edit-item-"+index} onClick={onEdit}><p>Edit</p></button>
        <button className="admin-description-card-action-item" key={"admin-description-card-action-delete-item-"+index} onClick={onDelete}><p>Delete</p></button>
      </div>
    </div>
  )
}

export default DescriptionCard
