import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../Enverement/Environment'
import { useSelector } from 'react-redux'
import { selectUserToken } from '../../Redux/UserSlice'

const ReturnInventory = () => {
  const token = useSelector(selectUserToken);
  const [student,setStudent]=useState([])
  const[invData,setinvData]=useState([])
  useEffect(()=>{
    axios.get(`${BASE_URL}/all/viewCheckInventory`, {
      headers: {
        authentication: token
      }
    }).then((res)=>{
      setinvData(res.data);
    })

   },[token]);

  useEffect(()=>{
    axios.get(`${BASE_URL}/all/showallstudent`,{
      headers: {
          authentication: token
        }
      }).then((res)=>{
        setStudent(res.data)
      }).catch((res)=>{
        console.log(res);
      })
  },[token])
  var i=1;
  return (
    <div className='col-10 m-auto py-3'>
    <Table striped className='shadow-lg rounded p-3 bg-white' >
      <thead>
        <tr>
          <th >No</th>
          <th >Student Name</th>
          <th >Student Roll</th>
          <th>Student Reg. No</th>
          <th>Operation</th>
        </tr>
      </thead>
      <tbody>
        {student.map(data => (
          <tr key={data._id}>
            <td>{i++}</td>
            <td>{data.name}</td>
            <td>{data.roll}</td>
            <td>{data.regNo}</td>
              <Link to={`/viewinventory/${data._id}`}>
              <button className='btn btn-success'>View Inventory</button>
            </Link>
           
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
  )
}

export default ReturnInventory