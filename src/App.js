
import './App.css';
import Login from './Authantation/Login';
import Register from './Authantation/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Navbar from './Common/Header';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch} from 'react-redux';
import { LOGIN } from './Redux/UserSlice';
import AddElement from './Pages/Element/AddElement';
import AddnewElement from './Pages/Element/AddnewElement';
import EditElement from './Pages/Element/EditElement';
import Inventory from './Pages/AssignedElement/Inventory';
import AddInventory from './Pages/AssignedElement/AddInventory';
import ReturnInventory from './Pages/AssignedElement/ReturnInventory';
import AssignElement from './Pages/CheckInventory/AssignElement';
import Student from './Pages/StudentManagement/Student';
import AddStudent from './Pages/StudentManagement/AddStudent';
import EditStudent from './Pages/StudentManagement/EditStudent';
import ViewInventory from './Pages/AssignedElement/ViewInventory';


function App() {
  const [verify,setVerify] = useState([])

  const dispatch = useDispatch()
  useEffect(()=>{
    const token = localStorage.getItem("auth");
    setVerify(token)
    dispatch(LOGIN({
      userToken: token,
      success: true
    }))
  },[])

  return (
   <>
   {verify===null?
    <BrowserRouter>
       <Navbar/>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/register" element={<Register />}/> 
        </Routes>
    </BrowserRouter>
    :
      <BrowserRouter>
       <Navbar/>
       <div className='back'>
        <Routes >
         <Route path="/" element={<Home/>}/>
         <Route path="/addelement" element={<AddElement/>}/>
         <Route path="/addnewelement" element={<AddnewElement/>}/>
         <Route path="/editelement/:id" element={<EditElement/>}/>
         <Route path="/checkinventory" element={<Inventory/>}/>
         <Route path="/addinventory" element={<AddInventory/>}/>
         <Route path="/returninventory" element={<ReturnInventory/>}/>
         <Route path="/assignelement" element={<AssignElement/>}/>
         <Route path="/student" element={<Student/>}/>
         <Route path="/addstudent" element={<AddStudent/>}/>
         <Route path="/editstudent/:id" element={<EditStudent/>}/>
         <Route path="/viewinventory/:id" element={<ViewInventory/>}/>
        </Routes>
        </div>
    </BrowserRouter>
}
   
    
   </>
  );
}

export default App;
