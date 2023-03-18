import React, { useState, useEffect } from "react";
import { firestore } from "./firebase";
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
        <h1>Message Board</h1>
        <button onClick={logout}>Logout</button>
      </header>
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <strong>{message.author}:</strong> {message.content}
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
