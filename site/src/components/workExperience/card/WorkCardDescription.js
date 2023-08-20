import './WorkCardDescription.css'
import {useState} from 'react'

function WorkCardDescription(props) {
  const [readMore, setReadMore] = useState(false);
  let description = props.description ? props.description : "";
  const useReadMore = description.length > props.maxLength;

  if (useReadMore) {
    description = description.substring(0, props.maxLength - 1);
  }

  return(
    <p className="description-work-card" data-testid="description-work-card" key={`${props.index}-description-work-card`}>
      {readMore ? props.description : description}
      {
        useReadMore ?
        <button className="description-work-card-read-more" data-testid="description-work-card-read-more" onClick={() => (setReadMore(!readMore))}>{readMore ? " - Read Less..." : " - Read More..."}</button>
        : ""
      }
    </p>
  )
}

export default WorkCardDescription
