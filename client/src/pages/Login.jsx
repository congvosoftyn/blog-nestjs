import React from "react";
import { Link } from "react-router-dom";

export function Login() {
  return (
    <div className="auth">
      <h1>Login</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="text" placeholder="Enter your username" required />
        <input type="password" placeholder="Enter your password" required />
        <button type="submit">Login</button>
        <p>This is an error!</p>
        <span>Don't you have an account? <Link to="/register" >Register</Link> </span>
      </form>
    </div>
  );
}
