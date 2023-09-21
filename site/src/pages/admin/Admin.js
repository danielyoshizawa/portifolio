import './Admin.css'
import {Outlet, Link, useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
import { getCookie } from '../../components/util/cookieManipulation'
import {Statistics} from '../../components/util/statistics'

function Admin() {
  useEffect(() => { Statistics("Admin") }, [])
  const navigate = useNavigate()
  const serverAddress = process.env.REACT_APP_SERVER_ADDRESS

  useEffect(() => {
    fetch(serverAddress + "/validateToken",
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
          <li><Link to={`tags`}>Tags</Link></li>
        </ul>
      </div>
      <div className="admin-right">
        <Outlet />
        <div className="admin-footer">
          <p>Hacked by Donuts'n'Legends Co - Daniel Yoshizawa</p>
        </div>
      </div>
    </div>
  )
}

export default Admin
