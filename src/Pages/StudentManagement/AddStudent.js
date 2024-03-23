import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useSelector } from 'react-redux'
import { selectUserToken } from '../../Redux/UserSlice'
import axios from 'axios'
import { BASE_URL } from '../../Enverement/Environment'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddStudent = () => {
    const token = useSelector(selectUserToken)
    const[student,setStudent] = useState({
        name:"",
        roll:"",
        regNo:"",    
    })

    const handleData = (e)=>{
        setStudent({...student,[e.target.name]:e.target.value})
    }
    //Submit data
    const submit=(e)=>{
        e.preventDefault();
        axios.post(`${BASE_URL}/all/addStudent`,student,{
            headers: {
                authentication: token
              }
        }).then((res)=>{
            window.location='/student'
        }).catch((res)=>{
          toast.error(res.response.data, {
            position: toast.POSITION.TOP_CENTER,
          });
        })   
    }; 
  return (
    <div className='col-4 m-auto py-3'>
      <div className='shadow-lg rounded bg-white p-3'>
    <Form>
      <Form.Group className='mb-3' controlId='formGroupEmail'>
        <Form.Label>Student Name</Form.Label>
        <Form.Control
          type='text'
          name='name'
          placeholder='Enter Name'
          style={{ textTransform: 'capitalize' }}
          onChange={handleData}
        />
      </Form.Group>

      <Form.Group className='mb-3' controlId='formGroupPassword'>
        <Form.Label>Student Roll</Form.Label>
        <Form.Control
          type='number'
          name='roll'
          placeholder='Enter Roll'
          onChange={handleData}
        />
      </Form.Group>

      <Form.Group className='mb-3' controlId='formGroupPassword'>
        <Form.Label>Student Reg. No</Form.Label>
        <Form.Control
          type='text'
          name='regNo'
          placeholder="Regestration Number"
          onChange={handleData}
        />
      </Form.Group>
      <Button variant='primary' type='submit' onClick={submit}>
        Submit
      </Button>
    </Form>
    </div>
    <ToastContainer className='mt-5' />
  </div>
  )
}

export default AddStudent