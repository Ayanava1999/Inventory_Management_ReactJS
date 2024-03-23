import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';

const Inventory = () => {
  return (
    <div className='w-50 create-btn'>
    <center className='center' >
      <div className='btn-main'>
        <Link to={'/returninventory'}><Button variant="primary" className='col-5 mt-2 mx-2 py-2'>Return Inventory</Button></Link>
        <Link to={'/addinventory'}><Button variant="primary" className='col-5 mt-2 mx-2 py-2'>Add Inventory</Button></Link>
   </div>
    </center>
   </div>
  )
}

export default Inventory