import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { LOGIN } from "../Redux/UserSlice";
import Carousel from "react-bootstrap/Carousel";
import Footer from "../Common/Footer";

const Login = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleData = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/user/userlogin", user)
      .then((res) => {
        localStorage.setItem("auth", res.data);
        dispatch(
          LOGIN({
            userToken: res.data,
            success: true,
          })
        );
        window.location = "/";
      })
      .catch((res) => {
        toast.error(res.response.data, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };
  return (
    <div>
    <div className="head">
      <div className="slide">
        <Carousel>
          <Carousel.Item interval={2000}>
            <img
              className="d-block w-100"
              src={process.env.PUBLIC_URL+"/image/11.jpeg"} 
              alt="First slide"
              width={500}
              height={300}
            />
          </Carousel.Item>
          <Carousel.Item interval={500}>
            <img
              className="d-block w-100"
              src={process.env.PUBLIC_URL+"/image/22.jpeg"}
              alt="Second slide"
              width={500}
              height={300}
            />
          </Carousel.Item>
          {/* <Carousel.Item>
            <img
              className="d-block w-100"
              src="holder.js/800x400?text=Third slide&bg=20232a"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item> */}
        </Carousel>
      </div>
      <div>
        <Form className="mx-5">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleData}
            />
            {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleData}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={submit}>
            Submit
          </Button>
        </Form>
        <div className="d-flex">
          <p>Create new account? </p>
          <Link to={"/register"}>Register</Link>
        </div>
      </div>
      <ToastContainer />
    </div>
    {/* <Footer/> */}
    </div>
  );
};

export default Login;
