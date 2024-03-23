import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { BASE_URL } from '../../Enverement/Environment'
import { useSelector } from 'react-redux'
import { selectUserToken } from '../../Redux/UserSlice'
import { useParams } from 'react-router-dom'

const EditStudent = () => {
    const token = useSelector(selectUserToken);
    const[student,setStudent] = useState({
        name:"",
        roll:"",
        regNo:"",    
    })
    const name = useParams();
    useEffect(()=>{
        axios.get(`${BASE_URL}/all/viewonestudent/${name.id}`,{
            headers: {
                authentication: token
            }
        }).then((res)=>{
            setStudent(res.data)
        }).catch((res)=>{
            console.log(res);
        })
    },[name,token]);

    const handleData = (e)=>{
        setStudent({...student,[e.target.name]:e.target.value})
    }

    const submit=(e)=>{
        e.preventDefault();
        axios.put(`${BASE_URL}/all/Updatestudent/${name.id}`,student,{
            headers: {
                authentication: token
            }
        }).then((res)=>{
            window.location='/student'
        }).catch((res)=>{

        })
    }
  return (
    <div className='col-4 m-auto py-3'>
      <div  className='shadow-lg rounded bg-white p-3'>
    <Form>
      <Form.Group className='mb-3' controlId='formGroupEmail'>
        <Form.Label>Student Name</Form.Label>
        <Form.Control
          type='text'
          name='name'
          value={student.name}
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
          value={student.roll}
          placeholder='Enter Roll'
          onChange={handleData}
        />
      </Form.Group>

      <Form.Group className='mb-3' controlId='formGroupPassword'>
        <Form.Label>Student Reg. No</Form.Label>
        <Form.Control
          type='text'
          name='regNo'
          value={student.regNo}
          placeholder="Regestration Number"
          onChange={handleData}
        />
      </Form.Group>
      <Button variant='primary' type='submit' onClick={submit}>
        Submit
      </Button>
    </Form>
    </div>
    {/* <ToastContainer className='mt-5' /> */}
  </div>
  )
}

export default EditStudent