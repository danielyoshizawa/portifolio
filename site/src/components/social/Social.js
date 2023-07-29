import './Social.css'
import SocialGenerator from './generator/SocialGenerator'

function Social (props) {
  return (
    <div className="social">
      <SocialGenerator social={props.social} parentName={props.parentName} />
    </div>
  )
}

export default Social
