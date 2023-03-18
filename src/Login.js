import React, { useState } from "react";
// import { auth } from "./firebase";


function Login({ login, signup }) {
  // Initialize state for email and password input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle login and sign-up form submission
  const handleSubmit = async (e) => {

    // Prevent default form submission behavior
    e.preventDefault();

    // try {
    //   // Attempt to log in the user with the entered email and password
    //   await auth.signInWithEmailAndPassword(email, password);

    //   // If successful, clear the form inputs
    //   setEmail("");
    //   setPassword("");
    // } catch (error) {
    //   // If there is an error, log it to the console
    //   console.error(error);
    // }

    if (e.nativeEvent.submitter.name === "login") {
      await login(email, password);
    } else {
      await signup(email, password);
    }

  };

  return (
    <div className="Login">
      <h1>Login / Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" name="login">
          Login
        </button>
        <button type="submit" name="signup">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Login;