import React, { useState } from "react";
import "./Login.css";
import FormInput from "../../Components/FormInput/FormInput";
import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";

import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    userName: "",
    password: "",
  });
  const inputs = [
    {
      id: 1,
      name: "userName",
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
  const myNav = () => {
    // if (values.userName === "admin" && values.password === "admin@jobs") {
    navigate("/portal/dashboard");
    // } else {
    //   alert("Please Enter Valid Credential");
    // }
  };
  const myLogin = () => {
    axios({
      method: "post",
      url: "",
      data: values,
    })
      .then(function (res) {
        if (res.status === 200) {
          // console.log("token==>>>", res.data.data.token);
          navigate("/portal/dashboard");
          localStorage.setItem("AuthToken", res.data.data.token);
        }
      })
      .catch((err) => {
        console.log("error==>>", err);
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

        <button className="login-btn" onClick={myNav}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
