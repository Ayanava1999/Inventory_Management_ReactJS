import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { selectUserToken } from '../../Redux/UserSlice'
import { ToastContainer, toast } from 'react-toastify'

const AddnewElement = () => {
  const [types, seTtypes] = useState([])
  const token = useSelector(selectUserToken)
  const [data, setData] = useState({
    ename: '',
    description: '',
    type: '',
    quantity: ''
  })

  const type = e => {
    seTtypes(e.target.value)
    setData({ ...data, type: e.target.value })
  }

  const handleData = e => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const submit = e => {
    e.preventDefault()

    // addelement
    axios
      .post('http://localhost:5000/all/addelement', data, {
        headers: {
          authentication: token
        }
      })
      .then(res => {
        console.log(res.data)
        window.location = '/addelement'
      })
      .catch(res => {
        toast.error(res.response.data, {
          position: toast.POSITION.TOP_CENTER
        })
      })
  }

  return (
    <div className='col-4 m-auto py-3'>
      <div className='shadow-lg rounded bg-white p-4'>
      <Form>
        <Form.Group className='mb-3' controlId='formGroupEmail'>
          <Form.Label>Element Name</Form.Label>
          <Form.Control
            type='text'
            name='ename'
            placeholder='Enter Element Name'
            style={{ textTransform: 'capitalize' }}
            onChange={handleData}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formGroupPassword'>
          <Form.Label>Element Description</Form.Label>
          <Form.Control
            type='text'
            name='description'
            placeholder='Enter some element description..'
            onChange={handleData}
          />
        </Form.Group>

        <Form.Group className='mb-3 d-flex gap-3'>
          <Form.Check
            type='radio'
            label='Pice'
            name='formHorizontalRadios'
            id='formHorizontalRadios1'
            value='pice'
            onChange={type}
          />
          <Form.Check
            type='radio'
            label='Mililiter'
            name='formHorizontalRadios'
            id='formHorizontalRadios2'
            value='percentage'
            onChange={type}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formGroupPassword'>
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type='number'
            name='quantity'
            placeholder={` ${
              types == 'percentage'
                ? 'Enter the quantity in mililiter'
                : 'Enter element quantity'
            }`}
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

export default AddnewElement
