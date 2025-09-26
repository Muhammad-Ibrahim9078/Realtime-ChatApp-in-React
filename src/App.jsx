import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/Firebase.js";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);   // <-- Ye state update karega automatically
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) {

     return <div className="flex justify-center text-center mt-[50px]">
      <div>
        <img src="https://cdn.pixabay.com/animation/2023/05/02/04/29/04-29-06-428_512.gif" alt="loader" width={'200px'} />
        <br />
    <p>Loading....</p>
      </div>
    </div>
 

  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: user ? <Navigate to="/home" /> : <Login />,
    },
    {
      path: "/signup",
      element: user ? <Navigate to="/home" /> : <Signup />,
    },
    {
      path: "/home",
      element: user ? <Home user={user} /> : <Navigate to="/" />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
