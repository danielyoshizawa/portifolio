import './WorkCard.css'
import WorkCardDescription from './WorkCardDescription'

function WorkCard(props) {
  return (
    <div className={"work-card " + (props.item.fixed || props.showMore ? "show" : "hide")} data-testid="work-card" key={`${props.index}-work-card`}>
      <div className="work-card-header">
        <div className="work-card-company-position">
          <h2 className="company-work-card item" data-testid="company-work-card" key={`${props.index}-company-work-card`}>{props.item.company}</h2>
          <p className="position-work-card item" data-testid="position-work-card" key={`${props.index}-position-work-card`}>{props.item.position}</p>
        </div>
        <div className="work-card-location-date">
          <p className="location-work-card item" data-testid="location-work-card" key={`${props.index}-location-work-card`}>{props.item.location}</p>
          <p className="start-end-work-card item" data-testid="start-end-work-card" key={`${props.index}-start-end-work-card`}>{props.item.start} - {props.item.end}</p>
        </div>
      </div>
      <div>
        <WorkCardDescription index={props.index} description={props.item.description} maxLength="100" />

        <ul className="tags-work-card" data-testid="tags-work-card" key={`${props.index}-tags-work-card`}>
          {props.item.tags && props.item.tags.map((item, index) =>
            {
              if (!item || item.properties.name === "") return
              return (
                <li key={`${index}-${props.index}-tags-item-work-card`}>{item ? item.properties.name : ""}</li>
              )
          }
        )}
        </ul>
      </div>
    </div>
  )
}

export default WorkCard
