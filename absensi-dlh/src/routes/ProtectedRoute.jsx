import { Navigate } from "react-router-dom";

import { auth }
from "../firebase/firebase";

function ProtectedRoute({ children }) {

  const user = auth.currentUser;

  // Jika belum login
  if (!user) {

    return <Navigate to="/" />;
  }

  // Jika sudah login
  return children;
}

export default ProtectedRoute;