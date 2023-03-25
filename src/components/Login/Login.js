import React, { useState } from "react";
import { auth } from "../../firebase";
import firebase from "firebase/compat/app";
import "./login.css";

function Login({ }) {

  // Initialize state for email and password input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle login and sign-up form submission
  const handleSubmit = async (e) => {

    // Prevent default form submission behavior
    e.preventDefault();

    try {
      // Attempt to log in the user with the entered email and password
      await auth.signInWithEmailAndPassword(email, password);

      // If successful, clear the form inputs
      setEmail("");
      setPassword("");

    } catch (error) {
      console.error(error);
    }
  };

  // Handle login with Google
  const loginWithGoogle = async () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider).then(function (result) {
      // This gives you a Google Access Token.
      // var token = result.credential.accessToken;
      // The signed-in user info.
      // var user = result.user;
    });
  }

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
          Login with email and password
        </button>
        <button className="login-google" type="submit" onClick={loginWithGoogle} name="login">
          Login with Google
        </button>
        <button type="submit" name="signup">
          Sign Up
        </button>
      </form>
    </div>
  );
}


export default Login;