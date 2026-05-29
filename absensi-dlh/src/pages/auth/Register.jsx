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

    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-100 via-slate-100 to-slate-200 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">

      <div className="card-surface max-w-md w-full p-10 mx-4">

        <h1 className="text-3xl font-bold mb-6 text-center text-slate-900 dark:text-white">
          Register DLH
        </h1>

        <input
          type="text"
          placeholder="Nama Lengkap"
          className="input-field mb-4"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="input-field mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            className="input-field pr-12"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button
          onClick={handleRegister}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-2xl shadow-md transition-colors duration-200"
        >
          Register
        </button>
        <p className="text-center mt-4 text-slate-600 dark:text-slate-300">
          Sudah punya akun?
          <Link
            to="/"
            className="text-emerald-600 dark:text-emerald-400 font-semibold ml-1"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;