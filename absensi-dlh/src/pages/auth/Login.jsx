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

    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-100 via-slate-100 to-slate-200 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">

      <form
        onSubmit={handleLogin}
        className="card-surface max-w-md w-full p-10 mx-4"
      >

        <h1 className="text-3xl font-bold mb-6 text-center text-slate-900 dark:text-white">
          Login DLH
        </h1>

        {errorMessage && (
          <div className="bg-rose-100 text-rose-700 p-4 rounded-2xl mb-4 shadow-sm">
            {errorMessage}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
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
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full text-white p-3 rounded-2xl shadow-md transition-colors duration-200 ${
            isLoading
              ? "bg-slate-400"
              : "bg-emerald-600 hover:bg-emerald-700"
          }`}
        >
          {isLoading ? "Sedang login..." : "Login"}
        </button>

        <p className="text-center mt-4 text-slate-600 dark:text-slate-300">
          Belum punya akun?
          <Link
            to="/register"
            className="text-emerald-600 dark:text-emerald-400 font-semibold ml-1"
          >
            Register
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Login;