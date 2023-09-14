import './Description.css'
import { useContext } from 'react'
import filter from '../util/filter'
import { FilterContext } from '../../pages/home/Home'

function Description(props) {
  const description = filter(props.description, useContext( FilterContext ))[0]
  return (
    <div id="about">
      <h2 className="title-description" data-testid="title-description">{description.title}</h2>
      <p className="text-description" data-testid="text-description">{description.description}</p>
    </div>
  )
}

export default Description
