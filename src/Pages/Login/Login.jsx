import React, { useState } from "react";
import "./Login.css";
import FormInput from "../../Components/FormInput/FormInput";
import { Base_Route } from "../../helper/constant";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "User Name",
      errorMessage: "Please enter the correct userName",
      lable: "User Name",
      required: true,
    },

    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      lable: "Password",
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const myLogin = () => {
    console.log("values===>", values);
    axios({
      method: "post",
      url: `${Base_Route}/api/auth/login`,
      data: values,
    })
      .then(function (res) {
        if (res.status === 200) {
          toast.success(res.data.message);
          navigate("/portal/dashboard");
          localStorage.setItem("AuthToken", res.data.token);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          toast.warn("Invalid Credentials");
        } else {
          toast.warn(err.message);
        }
      });
  };
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="login-title">Login</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <ToastContainer />
        <button className="login-btn" onClick={myLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
