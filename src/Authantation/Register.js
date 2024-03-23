import axios from 'axios';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch } from 'react-redux';
import { LOGIN } from '../Redux/UserSlice';
import { BASE_URL } from '../Enverement/Environment';

const Register = () => {
    const [user,setUser] = useState({
        name:"",
        email:"",
        department:"",
        ugpg:"",
        semester:"",
        password:""
    })
    const dispatch = useDispatch()
    const handleData = (e)=>{
        setUser({...user,[e.target.name]:e.target.value}) 
    }

    const submit = (e)=>{
        e.preventDefault();
        axios.post(`${BASE_URL}/user/createuser`,user)
        .then((res)=>{
          localStorage.setItem("auth",res.data)
          dispatch(LOGIN({
            userToken: res.data,
            success: true
          }))
          window.location='/';
        })
        .catch((res)=>{
          console.log(res.data);
          toast.error(res.response.data, {
            position: toast.POSITION.TOP_CENTER,
          });
        })
    }
  return (
    <div className=' head'>
      <Form className='mx-5 col-5'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>User Name</Form.Label>
        <Form.Control type="text" name='name' placeholder="Enter Your name" onChange={handleData} />
        {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name='email' placeholder="Enter email" onChange={handleData} />
        {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
      </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>UG/PG</Form.Label>
      <Form.Select aria-label="Floating label select example" name='ugpg' onChange={handleData}>
        <option hidden>-- Select UG/PG--</option>
        <option value='ug'>UG</option>
        <option value='pg'>PG</option>
       
      </Form.Select>
      </Form.Group>

       <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Semester Name</Form.Label>
      <Form.Select aria-label="Floating label select example" name='semester' onChange={handleData}>
        <option hidden>-- Select semester--</option>
        <option value='first'>1st Semester </option>
        <option value='second'>2nd Semester</option>
        <option value='third'>3rd Semester</option>
        <option value='four'>4th Semester</option>
       {user.ugpg==="pg"?"":<>
       <option value='five'>5th Semester</option>
        <option value='six'>6th Semester</option>
       </> }
      </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Department Name</Form.Label>
      <Form.Select aria-label="Floating label select example" name='department' onChange={handleData}>
        <option hidden>-- Select Department--</option>
        <option value='computerscience'>Computer Science</option>
        <option value='physic'>Physics</option>
        <option value='chemistry'>Chemistry</option>
        <option value='biology'>Biology</option>
       
      </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password"  name='password' placeholder="Password" onChange={handleData} />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={submit}>
        Submit
      </Button>

    </Form>
    <ToastContainer />
    </div>
  )
}

export default Register
