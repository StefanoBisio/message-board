import React, { useEffect, useState } from "react";
// import firebase from "firebase/app";
import { auth } from "./firebase";
import Login from "./Login";
import MessageBoard from "./MessageBoard";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    await auth.signInWithEmailAndPassword(email, password);
  };

  const signup = async (email, password) => {
    await auth.createUserWithEmailAndPassword(email, password);
  };

  const logout = async () => {
    await auth.signOut();
  };

  return (
    <div className="App">
      {user ? (
        <MessageBoard user={user} logout={logout} />
      ) : (
        <Login login={login} signup={signup} />
      )}
    </div>
  );
}

export default App;
