import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { BASE_URL } from '../../Enverement/Environment'
import { useSelector } from 'react-redux'
import { selectUserToken } from '../../Redux/UserSlice'


const AssignElement = () => {
  const token = useSelector(selectUserToken);
  const[data,setData]= useState([])
  useEffect(()=>{
    axios.get(`${BASE_URL}/all/viewallinventory`,{
      headers: {
        authentication: token
    }
    }).then((res)=>{
      console.log(res.data);
      setData(res.data)
    }).catch((res)=>{

    })
  },[token]);
  var i=1;
  return (
    <div className='col-10 m-auto py-3'>
      <div className='shadow-lg rounded bg-white p-3' >
      <div className=' d-flex align-content-center justify-content-around mb-5'>
        <Form className='d-flex'>
          <Form.Control
            type='search'
            placeholder='Search'
            className='me-2 px-4'
            aria-label='Search'
            // onChange={searchHandaler}
          />
          <Button variant='outline-success'>Search</Button>
        </Form>
      </div>
      <Table striped>
        <thead>
          <tr>
            <th>No</th>
            <th>Student Name</th>
            <th>Student Registration No</th>
            <th>Element Name</th>
            <th>Element Quantity</th>
          </tr>
        </thead>
        <tbody>
          {data.map(data => (
            <tr key={data._id}>
              <td>{i++}</td>
              <td>{data.name.name}</td>
              <td>{data.name.regNo}</td>
              <td>{data.elementname.ename}</td>
              <td>{data.quantity}</td>
              <td ></td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
    </div>
  )
}

export default AssignElement