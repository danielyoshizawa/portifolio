import './Navbar.css'
import Social from '../social/Social'
import Section from '../section/Section'
import socialData from '../../data/Social.data.json'

function Navbar() {
  return(
    <div className="background-header">
      <nav>
        <div>
          <Section />
        </div>
        <div>
          <Social social={socialData.social} />
        </div>
      </nav>
    </div>
  )
}

export default Navbar
