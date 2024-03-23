import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useSelector } from 'react-redux'
import { selectUserToken } from '../../Redux/UserSlice'
import axios from 'axios'
import { BASE_URL } from '../../Enverement/Environment'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddInventory = () => {
  const token = useSelector(selectUserToken);
  const [data,setData]=useState({
    name:""
  }) 
  const [error,setError]=useState()
  const [add, setAdd] = useState([
    {
      elementname: '',
      quantity: ''
    }
  ])
  const [student, setStudent] = useState([])
  const [elemet, setElemet] = useState([])

 
  useEffect(() => {
    //student name
    axios.get(`${BASE_URL}/all/showallstudent`, {
        headers: {
          authentication: token
        }
      })
      .then(res => {
        setStudent(res.data)
      })
      .catch(res => {})
   //element name
      axios
      .get('http://localhost:5000/all/showallelement', {
        headers: {
          authentication: token
        }
      })
      .then(res => {
        setElemet(res.data);
      })
      .catch(res => {})

  },[token]);

  //add more item
  const addmore = e => {
    e.preventDefault()
    setAdd([
      ...add,
      {
        elementname: '',
        quantity: ''
      }
    ])
  }
  //handle more input data
  const handleinputchanger = (e, i) => {
    const {name,value} = e.target;
    setError(null)
    var sameData = '';
    sameData=add.find((data)=>(
      data.elementname===value
    ))
    console.log(sameData);
    if(sameData){
      if(sameData.quantity===""){
        setError()
        const list = [...add];
        list[i][name] = value;
        setAdd(list);
      }else{
        setError("This element already assign")
      }
    }else{
      setError()
      const list = [...add];
      list[i][name] = value;
      setAdd(list);
    }   
  }

  //handle input data
  const handleData = (e) => {
    setData({...data,[e.target.name]:e.target.value})
  }
  //submit input daat
  const submit = e => {
    e.preventDefault();
    if(error){
      toast.error(error)
    }else{
      axios.post(`${BASE_URL}/all/addinventory`,{element:add,data:data},{
        headers: {
          authentication: token
        }
      }).then((res)=>{
        window.location='/checkinventory'
      }).catch((res)=>{
        console.log(res);
      })
    }
  }

  return (
    <div className='col-4 m-auto py-3'>
      <div className='shadow-lg rounded bg-white p-3'>
      <Form>
        <Form.Group className='mb-3' controlId='formGroupPassword'>
          <Form.Label>Element Quantity</Form.Label>
          <Form.Select aria-label='Floating label select example' name='name' onChange={handleData}>
            <option hidden>--Select Student--</option>
           {student.map((data)=>(
            <option value={data._id}>{data.name}</option>
           )) }
         
          </Form.Select>
        </Form.Group>

        {add.map((value, index) => {
          return (
            <div key={index}>
              <Form.Group className='mb-3' controlId='formGroupPassword'>
          <Form.Label>Element Name</Form.Label>
          <Form.Select aria-label='Floating label select example' name='elementname'  onChange={e => handleinputchanger(e, index)}>
            <option hidden>--Select Element Name--</option>
           {elemet.map((data)=>(
            <option value={data._id}>{data.ename}</option>
           )) }
          
           {/* {<span className="">{error.inputError}</span>} */}
          </Form.Select>
          <Form.Text id="passwordHelpBlock" className='text text-danger h3'>
            {error}
          </Form.Text>
          </Form.Group>
              {error?"":<Form.Group className='mb-3' controlId='formGroupPassword'>
                <Form.Label>Element Quantity</Form.Label>
                <Form.Control
                  type='number'
                  name='quantity'
                  placeholder='Quantity'
                  onChange={e => handleinputchanger(e, index)}
                />
              </Form.Group>}
            </div>
          
          )
          
        })}
        <Button variant='primary' type='submit' onClick={submit}>
          Submit
        </Button>
      </Form>
      <div style={{ float: 'right', marginTop: '-38px' }}>
        {error?<Button disabled>Add More</Button>:<Button onClick={addmore}>Add More</Button>}
      </div>
      </div>
      <ToastContainer className='mt-5' />
    </div>
  )
}

export default AddInventory
