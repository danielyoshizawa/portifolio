import './Footer.css'
import Section from '../section/Section'

function Footer() {
  return (
    <div className="footer-background">
      <div className="footer">
        <div className="footer-columns">
          <div className="footer-section">
            <h2>Section</h2>
            <Section />
          </div>
          <div className="footer-section">
            <h2>Social</h2>
            <ul>
              <li><a href="https://linkedin.com/in/danielyoshizawa">Linkedin</a></li>
              <li><a href="https://www.github.com/danielyoshizawa">Github</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h2>Contact</h2>
            <ul>
              <li><a href="mailto:yoshidanielcwb@gmail.com">Email</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-message">
          <p>Hacked by Donuts'n'Legends Co - Daniel Yoshizawa</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
