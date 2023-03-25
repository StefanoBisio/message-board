import React, { useEffect, useState } from "react";
import { auth } from "./firebase";


import Login from "./components/Login/Login";
import MessageBoard from "./components/MessageBoard/MessageBoard";
// import Navigation from "./components/Navigation/Navigation";

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

  const logout = async () => {
    await auth.signOut();
  };

  return (
    <div className="App">
      {/* <Navigation user={user} logout={logout}/> */}

      {/* If the user is logged in, show the message board, otherwise show the login form */}
      {user ? (
        <MessageBoard user={user} logout={logout} />
      ) : (
        <Login />
      )}

    </div>
  );
}

export default App;
