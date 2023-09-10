import './Description.css'

function Description(props) {
  // TODO : For this first cut use the first element in the array as the default description
  //        on the next version, we will implement tags to define the default one.
  const defaultDescription = props.description[0]
  return (
    <div id="about">
      <h2 className="title-description" data-testid="title-description">{defaultDescription.title}</h2>
      <p className="text-description" data-testid="text-description">{defaultDescription.description}</p>
    </div>
  )
}

export default Description
