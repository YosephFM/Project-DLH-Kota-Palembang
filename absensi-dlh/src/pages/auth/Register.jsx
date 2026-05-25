import { useState } from "react";

import {doc,setDoc} from "firebase/firestore";

import {createUserWithEmailAndPassword} from "firebase/auth";

import { db, auth }from "../../firebase/firebase";

function Register() {

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  // Function Register
  const handleRegister = async () => {

    try {

      // Register Firebase Auth
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      console.log(userCredential.user);

      // Save user to Firestore
      await setDoc(
        doc(db, "users", userCredential.user.uid),
        {
          name: name,
          email: email,
          role: "employee",
          createdAt: new Date()
        }
      );

      alert("Register berhasil");

    } catch (error) {

      console.log(error.message);

      alert("Register gagal");
    }
  };

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-md w-96">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Register DLH
        </h1>

        {/* Nama */}
        <input
          type="text"
          placeholder="Nama Lengkap"
          className="w-full border p-3 rounded mb-4"
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={handleRegister}
          className="w-full bg-green-600 text-white p-3 rounded"
        >
          Register
        </button>

      </div>

    </div>
  );
}

export default Register;