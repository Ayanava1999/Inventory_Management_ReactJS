import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { selectUserToken } from '../../Redux/UserSlice';
import { BASE_URL } from '../../Enverement/Environment';
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const ViewInventory = () => {
    const name = useParams();
    const token = useSelector(selectUserToken);
    const[student,setStudent]=useState([])
    const [search,setSearch]=useState([])
    useEffect(()=>{
        axios.get(`${BASE_URL}/all/viewonestudent/${name.id}`,{
            headers: {
                authentication: token
            }
        }).then((res)=>{
            setStudent(res.data)
        }).catch((res)=>{
            console.log(res);
        });

        axios.get(`${BASE_URL}/all/viewinventory/${name.id}`,{
            headers: {
                authentication: token
            }
        }).then((res)=>{
          console.log(res.data);
            setSearch(res.data)
        }).catch((res)=>{
            console.log(res);
        })
    },[name,token]);


    const submit=(e)=>{
        axios.put(`${BASE_URL}/all/updainventory/${e}`,{return:true},{
            headers: {
                authentication: token
            }
        }).then((res)=>{
            window.location.reload()
        }).catch((res)=>{
            console.log(res);
        })
    }
console.log(search);
  var i=1;
  return (
    <>
    {search.length<=0? 
    <div style={{textAlign:"center"}}>
<p style={{fontSize:"30px",fontWeight:"bold"}}>No Assign element</p>
    </div>
    :
 <div className='col-10 m-auto py-3'>
 <div className='shadow-lg rounded bg-white p-3'>
<p className='display-6'>Student Name -<span className='h2'>{student.name}</span></p>
 <div className=' d-flex align-content-center justify-content-around mb-5'>
 </div>

 <Table striped>
   <thead>
     <tr>
       <th>No</th>
       <th>Element Name</th>
       <th>Quentity</th>
       <th>Option</th>
     </tr>
   </thead>
   <tbody>
     {search.map(data => (
       <tr key={data._id}>
         <td>{i++}</td>
         <td>{data.elementname.ename}</td>
         <td>{data.quantity}</td>
         <td className='d-flex gap-3'>
             <button className='btn btn-success'onClick={()=>submit(data._id)}>Return</button>
         </td>
       </tr>
     ))}
   </tbody>
 </Table>
 </div>
</div>
    }
    </>
   
  )
}

export default ViewInventory