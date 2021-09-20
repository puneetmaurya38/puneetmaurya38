import React from 'react'
import Select from 'react-select';
import citydata from './City.jsx';
const Header = (props) => {
    return (
       
            <div>
            <h1>Select City</h1>
            <Select options={citydata} className="select" type="text" placeholder={props.city} value={props.city} onChange={props.showcity} />
          </div>
        
    )
}

export default Header
