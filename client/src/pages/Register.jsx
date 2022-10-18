import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AxiosInstance } from '../utils/axios.instance';

export function Register() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance({
        method: "POST",
        url: "/users/register",
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(inputs)
      })

      navigate("/login")
    } catch (error) {
      console.log({ error })
      setError(error.response.data.message)
    }
  }

  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="auth">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter your username" name='username' required onChange={handleChange} />
        <input type="email" placeholder="Enter your email" name='email' required onChange={handleChange} />
        <input type="password" placeholder="Enter your password" name='password' required onChange={handleChange} />
        <button type="submit">Submit</button>
        {error && <p>{error}</p>}
        <span>Don't you have an account? <Link to="/login" >Login</Link> </span>
      </form>
    </div>
  )
}