import './Social.css'
import SocialGenerator from './generator/SocialGenerator'

function Social (props) {
  return (
    <>
      <h3>Social</h3>
      <SocialGenerator social={props.social} parentName={props.parentName} />
    </>
  )
}

export default Social
