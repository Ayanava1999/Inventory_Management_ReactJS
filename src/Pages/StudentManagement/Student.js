import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../Enverement/Environment'
import { useSelector } from 'react-redux'
import { selectUserToken } from '../../Redux/UserSlice'


const Student = () => {
    const token = useSelector(selectUserToken);
    const [element, setElement] = useState([]);
    const [search, setSearech] = useState([]);

    useEffect(()=>{
        axios.get(`${BASE_URL}/all/showallstudent`,{
            headers: {
                authentication: token
              }
        }).then((res)=>{
            setElement(res.data);
            setSearech(res.data);
        }).catch((res)=>{

        })
    },[token]);
   
    const delet = (e) => {
        axios
          .delete(`${BASE_URL}/all/deleteStudent/${e}`)
          .then(res => {
            window.location.reload()
          })
          .catch(res => {
            console.log(res)
          })
      }

    const searchHandaler = e => {
        console.log(e.target.value)
        if (e.target.value == '') {
          setSearech(element)
        } else {
          const filterData = element.filter(data =>
            data.regNo.toLowerCase().includes(e.target.value.toLowerCase())
          )
          setSearech(filterData)
        }
      };
      var i=1;
  return (
    <div className='col-10 m-auto py-3'>
      <div className='bg-white shadow-lg p-3'>
      <div className=' d-flex align-content-center justify-content-around mb-5'>
        <Form className='d-flex'>
          <Form.Control
            type='search'
            placeholder='Search'
            className='me-2 px-4'
            aria-label='Search'
            onChange={searchHandaler}
          />
          <Button variant='outline-success'>Search</Button>
        </Form>

        <Link to={'/addstudent'}>
          <button className='btn btn-primary  px-3 '>Add New Student</button>
        </Link>
      </div>

      <Table striped>
        <thead>
          <tr>
            <th>No</th>
            <th>Student Name</th>
            <th>Student Roll</th>
            <th>Studrnt Reg. No</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {search.map(data => (
            <tr key={data._id}>
              <td>{i++}</td>
              <td>{data.name}</td>
              <td>{data.roll}</td>
              <td>{data.regNo}</td>
              <td className='d-flex gap-3'>
                <Link to={`/editstudent/${data._id}`}>
                  <button className='btn btn-success'>Edit</button>
                </Link>
                <button
                  className='btn btn-danger'
                  onClick={() => delet(data._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
    </div>
  )
}

export default Student