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

    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">

      <h1 className="text-xl font-semibold">
        Dashboard
      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>

    </div>
  );
}

export default Navbar;