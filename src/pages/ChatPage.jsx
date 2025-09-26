import React, { useEffect, useState } from "react";
import { db, auth } from "../config/Firebase";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

function ChatPage({ otherUserId }) {
  const currentUser = auth.currentUser; // Logged-in user
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Realtime listener for chat between 2 users
  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "chats"),
      where("sender", "in", [currentUser.uid, otherUserId]),
      where("receiver", "in", [currentUser.uid, otherUserId]),
      orderBy("timestamp")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => doc.data());
      setMessages(msgs);
    });

    return () => unsub();
  }, [currentUser, otherUserId]);

  // Send message
  async function sendMessage(e) {
    e.preventDefault();
    if (!message) return;

    await addDoc(collection(db, "chats"), {
      sender: currentUser.uid,
      receiver: otherUserId,
      message: message,
      timestamp: serverTimestamp(),
    });

    setMessage("");
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold text-center mb-4">Chat with User</h1>

      <div className="border p-2 h-96 overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded ${
              msg.sender === currentUser.uid ? "bg-green-200 text-right" : "bg-gray-200 text-left"
            }`}
          >
            {msg.message}
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="border p-2 flex-1 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 rounded">
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatPage;
