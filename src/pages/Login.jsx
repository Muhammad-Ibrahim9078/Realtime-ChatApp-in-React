import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../config/Firebase.js'
import Swal from 'sweetalert2'

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPass] = useState("")

  const handleLogin = () => {
    Swal.fire({
      title: 'Processing...',
      timer: 1500,
      timerProgressBar: true,
      didOpen: () => Swal.showLoading()
    });

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        Swal.fire({
          icon: "success",
          title: "Login Successful 🎉",
          timer: 1500,
          showConfirmButton: false
        });
        console.log(userCredential.user);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
          timer: 2000,
          showConfirmButton: false
        });
      });
  };

  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        Swal.fire({
          icon: "success",
          title: "Google Login Successful 🎉",
          timer: 1500,
          showConfirmButton: false
        });
        console.log(result.user);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Google Login Failed",
          text: error.message,
          timer: 2000,
          showConfirmButton: false
        });
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-200">
      <div className="bg-white shadow-lg rounded-xl p-8 w-[350px]">
        <h1 className="text-center text-2xl font-bold text-blue-600">Welcome Back</h1>
        <p className="text-center text-gray-500 mb-6">Login to continue 🔑</p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPass(e.target.value)}
          className="w-full p-2 mb-4 border rounded focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>

        <button
          onClick={googleLogin}
          className="w-full bg-gray-500 text-white py-2 rounded mt-3 hover:bg-gray-700 transition flex justify-center items-center gap-[20px]"
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" alt="Google img"  width={'25px'}/>
          
          Login with Google
        </button>

        <p className="text-center mt-6 text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-green-500 hover:underline">Signup</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
