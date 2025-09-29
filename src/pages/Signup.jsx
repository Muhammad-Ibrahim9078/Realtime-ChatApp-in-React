import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../config/Firebase.js'
import Swal from 'sweetalert2'

function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPass] = useState("")

  const handleSignup = () => {
    Swal.fire({
      title: 'Processing...',
      timer: 1500,
      timerProgressBar: true,
      didOpen: () => Swal.showLoading()
    });

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        Swal.fire({
          icon: "success",
          title: "Signup Successful 🎉",
          timer: 1500,
          showConfirmButton: false
        });
        // console.log(userCredential.user);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Signup Failed",
          text: error.message,
          timer: 2000,
          showConfirmButton: false
        });
      });
  };

  const googleSignup = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        Swal.fire({
          icon: "success",
          title: "Google Signup Successful 🎉",
          timer: 1500,
          showConfirmButton: false
        });
        console.log(result.user);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Google Signup Failed",
          text: error.message,
          timer: 2000,
          showConfirmButton: false
        });
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-200 to-blue-200">
      <div className="bg-white shadow-lg rounded-xl p-8 w-[350px]">
        <h1 className="text-[25px] font-bold text-blue-600 text-center">Ib ChatWeb</h1>
        <h1 className="text-center text-2xl font-bold text-green-600">Create Account</h1>
        <p className="text-center text-gray-500 mb-6">Sign up to get started 🚀</p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded focus:ring-2 focus:ring-green-400"
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPass(e.target.value)}
          className="w-full p-2 mb-4 border rounded focus:ring-2 focus:ring-green-400"
        />

        <button
          onClick={handleSignup}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
        >
          Signup
        </button>

        <button
          onClick={googleSignup}
          className="w-full  bg-gray-500 text-white py-2 rounded mt-3 hover:bg-black transition flex justify-center items-center gap-[20px]"
        >
         <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" alt="Google img"  width={'25px'}/> Signup with Google
        </button>

        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
