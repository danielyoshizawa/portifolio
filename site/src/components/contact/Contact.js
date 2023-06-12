import './Contact.css'

function Contact(props) {
  return(
    <>
      <ul className="contact-list">
        { props.contact.map((item, index) => (
          <li className="contact-item" data-testid={`${index}-contact-item`} key={`${index}-contact-item`}><a href={item.link} className="contact-link" data-testid={`${index}-contact-item`} key={`${index}-contact-item`}>{item.name}</a></li>
        ))}
      </ul>
    </>
  )
}

export default Contact
