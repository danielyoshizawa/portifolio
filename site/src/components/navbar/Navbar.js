import './Navbar.css'
import Social from '../social/Social'
import socialData from '../../data/Social.data.json'

function Navbar() {
  return(
    <div className="background-header">
      <nav>
        <div>
          <ul>
            <li>About</li>
            <li>Experience</li>
            <li>Projects</li>
            <li>Diplomas</li>
            <li>Certifications</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <Social social={socialData.social} />
        </div>
      </nav>
    </div>
  )
}

export default Navbar
