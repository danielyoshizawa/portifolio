import './TagsCard.css'
import {useNavigate} from 'react-router-dom'

function TagsCard(props) {
  const item = props.item
  const index = props.index
  const navigate = useNavigate()

  const onDelete = () => {
    navigate("/admin/tags/" + item.id + "/delete")
  }
  const onEdit = () => {
    navigate("/admin/tags/" + item.id + "/edit")
  }

  return (
    <div className="admin-tags-card" key={"admin-tags-card-"+index}>
      <div className="admin-tags-card-description">
        <div className="admin-tags-card-description-section">
          <p>Database Id : {item.id} </p>
          <p>Name : {item.name}</p>
          <p>Type : {item.type}</p>
        </div>
      </div>
      <div className="admin-tags-card-action">
        <button className="admin-tags-card-action-item" key={"admin-tags-card-action-edit-item-"+index} onClick={onEdit}><p>Edit</p></button>
        <button className="admin-tags-card-action-item" key={"admin-tags-card-action-delete-item-"+index} onClick={onDelete}><p>Delete</p></button>
      </div>
    </div>
  )
}

export default TagsCard
