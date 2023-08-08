import './Login.css'
import {useState, useEffect} from 'react'
import ReactDOM from 'react-dom/client'

function Login() {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const handleSubmit = (event) => {
    // TODO : Waiting backend endpoint
    return
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
    </div>
  )
}

export default Login
