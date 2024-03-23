import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { selectUserToken } from '../../Redux/UserSlice'

const AddElement = () => {
  const token = useSelector(selectUserToken)
  const [element, setElement] = useState([])
  const [search, setSearech] = useState([])

  // showallelement
  useEffect(() => {
    axios
      .get('http://localhost:5000/all/showallelement', {
        headers: {
          authentication: token
        }
      })
      .then(res => {
        setElement(res.data)
        setSearech(res.data)
      })
      .catch(res => {})
  }, [token])

  const searchHandaler = e => {
    console.log(e.target.value)
    if (e.target.value == '') {
      setSearech(element)
    } else {
      const filterData = element.filter(data =>
        data.ename.toLowerCase().includes(e.target.value.toLowerCase())
      )
      setSearech(filterData)
    }
  }

  const delet = e => {
    axios
      .delete(`http://localhost:5000/all/deleteelement/${e}`)
      .then(res => {
        window.location.reload()
      })
      .catch(res => {
        console.log(res)
      })
  }

  var i = 1
  return (
    <div className='col-10 m-auto'>
      <div className=' w-100 mb-5 pt-5'>
        <div className='d-flex align-content-center justify-content-around shadow-lg rounded bg-white py-4'>
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

        <Link to={'/addnewelement'}>
          <button className='btn btn-primary  px-3 '>Add New Element</button>
        </Link>
      </div>
      </div>
      <Table striped className='shadow-lg rounded bg-white'>
        <thead>
          <tr>
            <th>No</th>
            <th>Element Name</th>
            <th>Element Quantity</th>
            <th>Description</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {search.map(data => (
            <tr key={data._id}>
              <td>{i++}</td>
              <td>{data.ename}</td>
              <td>{data.quantity}</td>
              <td>{data.description}</td>
              <td className='d-flex gap-3'>
                <Link to={`/editelement/${data._id}`}>
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
  )
}

export default AddElement
