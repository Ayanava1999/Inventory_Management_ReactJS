import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector } from 'react-redux';
import {  selectUserToken } from '../Redux/UserSlice';
import jwtDecode from 'jwt-decode';
import Image from 'react-bootstrap/Image';




const Header = () => {
  const token=useSelector(selectUserToken);
  const [verify,setverify] = useState([])

  useEffect(()=>{
    const auth = localStorage.getItem('auth')
        if (auth === null) {
        } else {
            const decord = jwtDecode(auth)
            setverify(decord)
        }
  },[token])

  const logout = ()=>{
    localStorage.removeItem('auth');
    window.location='/';
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="primary" className='shadow-lg bg-white head-first'>
    <Container>
      <Navbar.Brand href="/">
        <div style={{display:"flex" ,gap:"20px"}}>
        <Image src={process.env.PUBLIC_URL+"/image/LOGO.png"} roundedCircle width={80} />
         <div>
         <h2 className=' text-primary'>Panskura Banamali College</h2>
         <h4 className=' text-primary'>(Autonomous)</h4>
         </div>
        </div> 
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
        </Nav>
        <Nav>
        {token==null? <Navbar.Brand href="/" style={{cursor:"pointer"}} className=' text-primary'>Login</Navbar.Brand>:
           <NavDropdown title={<span className='text-primary'>{verify.department}</span> } style={{ fontSize: `130%` }}   id="collasible-nav-dropdown">
            <NavDropdown.Item  onClick={logout} className=' text-primary'>
              Log Out
            </NavDropdown.Item>
          </NavDropdown>}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Header