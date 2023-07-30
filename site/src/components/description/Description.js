import './Description.css'

function Description(props) {
  return (
    <div id="about">
      <h2 className="title-description" data-testid="title-description">{props.description.title}</h2>
      <p className="text-description" data-testid="text-description">{props.description.description}</p>
    </div>
  )
}

export default Description
