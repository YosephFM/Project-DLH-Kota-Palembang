import { signOut }from "firebase/auth";

import { auth }from "../firebase/firebase";

import { useNavigate }from "react-router-dom";
function Navbar() {

  const navigate = useNavigate();

  const handleLogout = async () => {

    try {

      await signOut(auth);

      navigate("/");

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="bg-white border-b border-slate-200 shadow-sm px-6 py-4 flex justify-between items-center">

      <h1 className="text-xl font-semibold text-slate-900">
        Panel Admin
      </h1>

      <button
        onClick={handleLogout}
        className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-2xl transition-colors duration-200"
      >
        Logout
      </button>

    </div>
  );
}

export default Navbar;