import {
  FaAt,
  FaLinkedin,
  FaGithub
} from "react-icons/fa"

function SocialGenerator(props) {
  const icon = (name) => {
    if (name === 'email') {
      return <FaAt />
    } else if (name === 'linkedin') {
      return <FaLinkedin />
    } else if (name === 'github') {
      return <FaGithub />
    } else {
      return name[0].toUpperCase() + name.slice(1)
    }
  }

  return (
    <ul className={`${props.parentName}-social-list`} data-testid={`${props.parentName}-social-list`} key={`${props.parentName}-social-list`}>
      {
        props.social.map((item, index) => (
          <li className="social-item" data-testid={`${index}-social-item`} key={`${index}-social-item`}><a href={item.link} key={`${index}-social-link`}>{icon(item.name)}</a></li>
        ))
      }
    </ul>
  )
}

export default SocialGenerator
