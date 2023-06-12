import './Footer.css'

function Footer() {
  return (
    <div>
      <div>
        <div className="footer-section">
          <h2>Section</h2>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#diplomas">Diplomas</a></li>
            <li><a href="#certifications">Certifications</a></li>
          </ul>
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
      <p>Hacked by Donuts'n'Legends Co - Daniel Yoshizawa</p>
    </div>
  )
}

export default Footer
