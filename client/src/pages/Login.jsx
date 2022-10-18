import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export function Login() {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState(null)
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(inputs, navigate, setError);
  }

  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="auth">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Enter your email" name='email' required onChange={handleChange} />
        <input type="password" placeholder="Enter your password" name='password' required onChange={handleChange} />
        <button type="submit">Submit</button>
        {error && <p>{error}</p>}
        <span>Don't you have an account? <Link to="/register" >Register</Link> </span>
      </form>
    </div>
  );
}
