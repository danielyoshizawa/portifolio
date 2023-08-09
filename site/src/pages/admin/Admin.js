import './Admin.css'
import {Outlet, Link, useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
import { getCookie } from '../../components/util/cookieManipulation'

function Admin() {
  const navigate = useNavigate()
  useEffect(() => {
    fetch("http://localhost:3001/validateToken",
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Authorization' : "Bearer " + getCookie('token')
        }
      }
    ).then((res) => {
      if (res.status !== 200) return navigate('/login')
    })
  }, [navigate])
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
