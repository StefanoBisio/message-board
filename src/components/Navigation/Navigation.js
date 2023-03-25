import React from "react";
import { Link } from "react-router-dom";
import "./navigation.css";

function Navigation({ user, logout }) {
    return (
        <nav>
            <ul>
                <li>
                    {/* <Link to="/">Home</Link> */}
                </li>
                <li>
                    {/* <Link to="/about">About</Link> */}
                </li>
                <li>
                    {user ? (
                        //button that logs out the user
                        <button onClick={logout}>Logout</button>
                    ) : (
                        //display nothing if the user is not logged in
                        <p></p>     
                    )}
                </li>
            </ul>
        </nav>
    )
}

export default Navigation;