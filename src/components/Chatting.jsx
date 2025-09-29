import React, { useState, useEffect } from "react";
import { auth, db } from "../config/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import Swal from "sweetalert2";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import Logout from "./Logout";

function Home() {
  const [user, setUser] = useState(null);
  const [searchEmail, setSearchEmail] = useState("");
  const [chatId, setChatId] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // ✅ Track current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Add user to "users" collection
        await setDoc(doc(db, "users", currentUser.email), {
          email: currentUser.email,
        });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // ✅ Create unique chatId
  const createChatId = (email1, email2) => {
    return email1 < email2 ? `${email1}_${email2}` : `${email2}_${email1}`;
  };

  // ✅ Search user and set chat
  const handleSearch = async () => {
    if (!searchEmail || !user) return;

        Swal.fire({
          title: ' Processing... Please Wait',
          timer: 1500,
          timerProgressBar: true,
          didOpen: () => Swal.showLoading()
        });
    

    const userDoc = await getDoc(doc(db, "users", searchEmail));
    if (!userDoc.exists()) {

      Swal.fire({
    icon: "error",
    title: "User Not Exist",
    text: "This user is not registered in the app.",
    timer: 2000,
    showConfirmButton: false
  });
      
      return;
    }

    const id = createChatId(user.email, searchEmail);
    setChatId(id);
  };

  // ✅ Fetch messages realtime
  useEffect(() => {
    if (!chatId) return;

    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [chatId]);

  // ✅ Send message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !chatId || !user) return;

    await addDoc(collection(db, "chats", chatId, "messages"), {
      text: message,
      sender: user.email,
      timestamp: new Date(),
    });

    setMessage("");
  };

  // ✅ Delete own message
  const deleteMessage = async (msgId) => {
    if (!chatId || !user) return;
    try {
      await deleteDoc(doc(db, "chats", chatId, "messages", msgId));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };




  // Data Print


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* 🔝 Fixed Header */}
      <div className="fixed top-0 w-full bg-white shadow-md z-50 p-4">
        <div className="flex justify-between m-[10px]">
          <h1 className="text-[25px] font-bold text-green-600">Ib ChatWeb</h1>
        <Logout />
        </div>
        <h1 className="text-lg font-bold text-center mb-2">
          Your Email: <span className="text-blue-600">{user?.email}</span>
        </h1>
        <div className="flex justify-center">
          <input
            type="email"
            placeholder="Enter user's email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            className="border p-2 rounded-l w-64"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 rounded-r"
          >
            Start Chat
          </button>
        </div>
      </div>

      {/* 💬 Messages Section */}
      <div className="flex-1 overflow-y-auto max-w-md mx-auto mb-[70px] mt-[180px] border p-2 bg-white rounded">
        {chatId ? (
          messages.map((msg) => {
            // Format date/time
            const time = msg.timestamp?.toDate
              ? msg.timestamp.toDate().toLocaleString()
              : new Date(msg.timestamp).toLocaleString();

            return (
              <div
                key={msg.id}
                className={`text-start p-2 my-1 rounded relative ${
                  msg.sender === user?.email
                    ? "bg-blue-200 text-right"
                    : "bg-gray-300 text-left"
                }`}
              >
                {/* Sender + Time */}
                <div className="text-xs text-gray-600 mb-1 flex justify-between">
                  <span>{msg.sender === user?.email ? "You" : msg.sender}</span>
                  <span className="text-[10px] text-gray-500">{time}</span>
                </div>

                {/* Message Text */}
                <div>{msg.text}</div>

                {/* Delete Button (only own msg) */}
                {msg.sender === user?.email && (
                  <button
                    onClick={() => deleteMessage(msg.id)}
                    className="absolute top-1 right-1 text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500">
            🔍 Search an email to start chat
          </p>
        )}
      </div>

      {/* ✍️ Fixed Input Bottom */}
{chatId && (
  <form
    onSubmit={sendMessage}
    className="fixed bottom-0 w-full flex justify-center bg-white p-2 shadow"
  >
    <div className="flex max-w-md w-full">
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 p-2 border rounded-l"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 rounded-r"
      >
        Send
      </button>
    </div>
  </form>
)}

    </div>
  );
}

export default Home;
