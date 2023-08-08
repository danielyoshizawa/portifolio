import './Login.css'
import {useState, useEffect} from 'react'
import ReactDOM from 'react-dom/client'
import { setCookie, getCookie } from '../../../components/util/cookieManipulation'
import {useNavigate} from 'react-router-dom'

function Login() {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [status, setStatus] = useState()
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    const resp = {
      username: username,
      password: password
    }
    fetch("http://localhost:3001/login",
      {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(resp),
        headers: {
          'Content-Type' : 'application/json'
        }
      }
    ).then(async (response) => {
      if (response.status === 200) {
        const token = await response.json()
        // TODO : Move cookie name to config file
        setCookie('token', token)

        return navigate('/admin')
      }
      setStatus(response.status)
    })
  }

  return (
    <div className="login">
      <p> Login </p>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => {setUsername(e.target.value)}}
          data-testid="login-username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => {setPassword(e.target.value)}}
          data-testid="login-password"
        />
        <input
          type="submit"
          value="Login"
          data-testid="login-submit-button"
        />
      </form>
      <p>{status}</p>
    </div>
  )
}

export default Login
