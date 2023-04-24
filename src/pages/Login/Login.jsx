import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./Login.css";

function Login() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/", { replace: true });
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="login">
      <div className="right">
        <div className="login-input">
          <h1 className="l-header">Login</h1>

          <form>
            <input
              className="l-input"
              type="username"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              className="l-input"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <p className="errorMsg">{err && err}</p>
            <button onClick={handleLogin} className="l-button">
              Login
            </button>
          </form>
        </div>
      </div>

      <div className="left">
        <div className="register-input">
          <h1 className="r-header">Hello World.</h1>
          <p className="r-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            sed rutrum diam, sit amet rutrum justo.
          </p>
          <p className="r"> Don't you have an account?</p>
          <Link to="/register">
            <button className="r-button">Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
