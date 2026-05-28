import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {doc,setDoc} from "firebase/firestore";

import {createUserWithEmailAndPassword} from "firebase/auth";
import { useNavigate }from "react-router-dom";
import { db, auth }from "../../firebase/firebase";
import { Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
      navigate("/");

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
        <div className="relative mb-4">
        <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            className="w-full border p-3 rounded pr-12"
            onChange={(e) => setPassword(e.target.value)}
        />

        <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
        </div>

        {/* Button */}
        <button
          onClick={handleRegister}
          className="w-full bg-green-600 text-white p-3 rounded"
        >
          Register
        </button>
        <p className="text-center mt-4">

            Sudah punya akun?

           <Link
              to="/"
              className="text-green-600 font-semibold ml-1"
            >
              Login
          </Link>

        </p>


      </div>

    </div>
  );
}

export default Register;