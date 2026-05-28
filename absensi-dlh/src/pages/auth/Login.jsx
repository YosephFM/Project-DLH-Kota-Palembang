import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {doc, getDoc} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword }from "firebase/auth";
import { auth }from "../../firebase/firebase";
import { db }from "../../firebase/firebase";
import { Link } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  // Function Login
  const handleLogin = async (e) => {

    e.preventDefault();

    setErrorMessage("");

    // Validasi input
    if (!email || !password) {
      setErrorMessage("Email dan password harus diisi");
      return;
    }

    setIsLoading(true);

    try {

      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      console.log("LOGIN BERHASIL");
      console.log(userCredential.user);
      const uid = userCredential.user.uid;
      const userDoc = await getDoc(doc(db, "users", uid));
      const userData = userDoc.data();
      console.log(userData);
      if (userData.role === "admin") {
        navigate("/admin/dashboard");
        } else {
        navigate("/employee/dashboard");
        }

      

    } catch (error) {

      console.log(error);

      if (error.code === "auth/user-not-found") {

        setErrorMessage("Email tidak terdaftar");

      } else if (error.code === "auth/wrong-password") {

        setErrorMessage("Password salah");

      } else if (error.code === "auth/invalid-credential") {

        setErrorMessage("Email atau password salah");

      } else {

        setErrorMessage("Login gagal");
      }

    } finally {

      setIsLoading(false);
    }
  };

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-md w-96"
      >

        <h1 className="text-2xl font-bold mb-6 text-center">
          Login DLH
        </h1>

        {/* Error */}
        {errorMessage && (

          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">

            {errorMessage}

          </div>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
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
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full text-white p-3 rounded ${
            isLoading
              ? "bg-gray-400"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >

          {isLoading
            ? "Sedang login..."
            : "Login"}

        </button>
        <p className="text-center mt-4">

          Belum punya akun?

          <Link
            to="/register"
            className="text-green-600 font-semibold ml-1"
          >
            Register
          </Link>

        </p>

      </form>

    </div>
  );
}

export default Login;