import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import axios from "axios";

function Register() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });

  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://social-app-heroku.herokuapp.com/api/auth/register",
        inputs
      );
      navigate("/");
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="register">
      <div className="left">
        <div className="register-input">
          <h1 className="r-header">Register</h1>

          <form>
            <input
              type="username"
              className="r-input"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            ></input>
            <input
              type="email"
              className="r-input"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            ></input>
            <input
              type="password"
              className="r-input"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            ></input>
            <input
              type="text"
              className="r-input"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            ></input>
            <p className="errorMsg">{err && err}</p>

            <button className="r-button" onClick={handleClick}>
              Register
            </button>
          </form>
        </div>
      </div>

      <div className="right">
        <div className="login-input">
          <h1 className="l-header">Connect Me!</h1>
          <p className="l-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            sed rutrum diam, sit amet rutrum justo.
          </p>
          <p className="l">Do you have an account?</p>
          <Link to="/login">
            <button className="l-button">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
