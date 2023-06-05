import React from 'react';
import './WorkCard.css'

function WorkCard(props) {
  return (
    <div className="work-card" data-testid="work-card" key={`${props.index}-work-card`}>
      <h3 className="company-work-card" data-testid="company-work-card" key={`${props.index}-company-work-card`}>{props.item.company}</h3>
      <p className="start-end-work-card" data-testid="start-end-work-card" key={`${props.index}-start-end-work-card`}>{props.item.start} - {props.item.end}</p>
      <p className="position-work-card" data-testid="position-work-card" key={`${props.index}-position-work-card`}>{props.item.position}</p>
      <p className="location-work-card" data-testid="location-work-card" key={`${props.index}-location-work-card`}>{props.item.location}</p>
      <p className="description-work-card" data-testid="description-work-card" key={`${props.index}-description-work-card`}>{props.item.description}</p>
      <ul className="techs-work-card" data-testid="techs-work-card" key={`${props.index}-techs-work-card`}>
        {props.item.techs.map((item, index) => (
          <li key={`${index}-${props.index}-tech-item-work-card`}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default WorkCard
