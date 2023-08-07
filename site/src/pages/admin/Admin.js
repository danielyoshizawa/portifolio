import './Admin.css'
import {Outlet, Link} from 'react-router-dom'

function Admin() {
  return (
    <div className="admin">
      <div className="admin-left">
        <ul>
          <li><Link to={`description`}>Description</Link></li>
          <li><Link to={`education`}>Education</Link></li>
          <li><Link to={`course`}>Course</Link></li>
          <li><Link to={`workExperience`}>Work Experience</Link></li>
        </ul>
      </div>
      <div className="admin-right">
        <Outlet />
      </div>
    </div>
  )
}

export default Admin
