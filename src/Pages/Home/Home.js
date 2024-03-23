import React from 'react'
import Button from 'react-bootstrap/Button';
import "./Home.css";
import { Link } from 'react-router-dom';
import Footer from '../../Common/Footer';

const Home = () => {
  return (
    <div className='w-50 create-btn'>
    <center className='center' >
      <div className='btn-main'>
        <Link to={'/addelement'}><Button variant="primary" className='col-5 mt-2 mx-2 py-2'>Add Element</Button></Link>
        <Link to={'/checkinventory'}><Button variant="primary" className='col-5 mt-2 mx-2 py-2'>Assign Element</Button></Link>
        <Link to={'/assignelement'}><Button variant="primary" className='col-5 mt-5 mx-2 py-2'>Check Inventory</Button></Link>
        <Link to={'/student'}><Button variant="primary" className='col-5 mt-5 mx-2 py-2'>Student Management</Button></Link>
   </div>
    </center>
   </div>
  )
}

export default Home
