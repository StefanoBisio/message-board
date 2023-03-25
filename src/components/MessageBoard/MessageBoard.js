import React, { useState, useEffect } from "react";
import { firestore } from "../../firebase";
import "./MessageBoard.css";

function MessageBoard({ user, logout }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Fetch messages from Firestore and subscribe to updates
    const unsubscribe = firestore
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();

    // Add the new message to Firestore
    await firestore.collection("messages").add({
      content: newMessage,
      author: user.displayName || user.email,
      timestamp: new Date(),
    });

    // Clear the input field
    setNewMessage("");
  };

  return (
    <div className="MessageBoard">
      
      <header>
        {/* h1 element that welcomes you, calling you by name, or email */} 
        <h1>Welcome, {user.displayName || user.email}!</h1>
        <button onClick={logout}>Logout</button>
      </header>

      <div className="messages">

        {/* map through message object. display author avatar, name and message */} 
        {messages.map((message) => (
          <div key={message.id} className="message">

            {/* if user.photoURL is not null, display it */}
            {user.photoURL && <img className="user-avatar" title={message.author} src={user.photoURL} alt="avatar" />}

            {/* display the name of the user who wrote the message */}
            {/* <strong className="user-name">{message.author}:</strong>  */}

            {message.content}
          </div>
        ))}


      </div>

      <form onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Write a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          required
        />
        <button type="submit">Send</button>
      </form>
      
    </div>
  );
}

export default MessageBoard;
