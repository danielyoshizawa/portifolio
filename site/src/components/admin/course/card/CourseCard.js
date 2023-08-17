import './CourseCard.css'
import {useNavigate} from 'react-router-dom'

function CourseCard(props) {
  const item = props.item
  const index = props.index
  const navigate = useNavigate()

  const onDelete = () => {
    navigate("/admin/course/" + item.id + "/delete")
  }
  const onEdit = () => {
    navigate("/admin/course/" + item.id + "/edit")
  }

  return(
    <div className="admin-course-card" key={"admin-course-card-"+index}>
      <div className="admin-course-card-description">
        <div className="admin-course-card-description-section">
          <p>Database Id : {item.id} </p>
          <p>Course Name : {item.name}</p>
          <p>Certificate Link : {item.link}</p>
          <p>Certificate Validation Code : {item.validation}</p>
        </div>
        <div className="admin-course-card-description-section">
          <p>Institution : {item.institution}</p>
          <p>Year : {item.date}</p>
          <p>Fixed : {item.fixed ? "yes" : "no"}</p>
        </div>
      </div>
      <div className="admin-course-card-action">
        <button className="admin-course-card-action-item" key={"admin-course-card-action-edit-item-"+index} onClick={onEdit}><p>Edit</p></button>
        <button className="admin-course-card-action-item" key={"admin-course-card-action-delete-item-"+index} onClick={onDelete}><p>Delete</p></button>
      </div>
    </div>
  )
}

export default CourseCard
