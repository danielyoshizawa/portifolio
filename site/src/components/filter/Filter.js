import './Filter.css'
import {useState, useContext} from 'react'

function Filter(props) {
  const [active, setActive] = useState('default')
  return (
    <div className="filter-background">
      <div className="filter">
        <ul className="filter-list">
          <li className={`filter-item ${active === 'default' ? 'active' : ''}`} onClick={() => { props.setFilter('default'); setActive('default')}}><p>Everything</p></li>
          <li className={`filter-item ${active === 'C++' ? 'active' : ''}`} onClick={() => { props.setFilter('C++'); setActive('C++')}}><p>C++</p></li>
          <li className={`filter-item ${active === 'Python' ? 'active' : ''}`} onClick={() => { props.setFilter('Python'); setActive('Python')}}><p>Python</p></li>
          <li className={`filter-item ${active === 'Javascript' ? 'active' : ''}`} onClick={() => { props.setFilter('Javascript'); setActive('Javascript')}}><p>Javascript</p></li>
        </ul>
      </div>
    </div>
  )
}

export default Filter
