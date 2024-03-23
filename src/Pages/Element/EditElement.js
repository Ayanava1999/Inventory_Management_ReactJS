import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserToken } from '../../Redux/UserSlice';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const EditElement = () => {
    const name = useParams();
    const token=useSelector(selectUserToken);
    const [data,setData] = useState({
        ename:"",
        description:"",
        quantity:""
    })

    useEffect(()=>{
        axios.get(`http://localhost:5000/all/viewoneelement/${name.id}`,{
            headers: {
                    authentication: token
                }
        })
        .then((res)=>{
          console.log(res.data);
            setData(res.data);
        })
    },[token,name.id])

    const handleData =(e)=>{
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const submit =(e)=>{
        e.preventDefault();
        console.log(data);
        // addelement
        axios.put(`http://localhost:5000/all/Updateelement/${name.id}`,data,{
            headers: {
                authentication: token
                    }
        }).then((res)=>{
          console.log(res.data);
            window.location='/addelement'
        }).catch((res)=>{
            toast.error(res.response.data, {
                position: toast.POSITION.TOP_CENTER,
    
              });
        })
    }
  
  return (
    <div className='col-4 m-auto py-3'>
      <div className='shadow-lg rounded bg-white p-3'>
        <Form>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Element Name</Form.Label>
        <Form.Control type="text" name='ename' value={data.ename} placeholder="Enter Element Name" style={{textTransform:"capitalize"}} onChange={handleData} />
      </Form.Group>

      <Form.Group className="mb-3"  controlId="formGroupPassword">
        <Form.Label>Element Description</Form.Label>
        <FloatingLabel controlId="floatingTextarea2"  >
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          name='description'
          value={data.description}
          style={{ height: '100px' }}
          onChange={handleData}
        />
      </FloatingLabel>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Quantity</Form.Label>
        <Form.Control type="number" name='quantity' value={data.quantity} placeholder='Enter Quentity' onChange={handleData} />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={submit}>
        Submit
      </Button>

    </Form>
    </div>
    <ToastContainer className='mt-5'/>
    </div>
 
  )
}

export default EditElement