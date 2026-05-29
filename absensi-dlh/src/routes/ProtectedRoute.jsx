import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  // Menunggu Firebase initialization
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
    </div>;
  }

  // Jika belum login
  if (!user) {
    return <Navigate to="/" />;
  }

  // Jika sudah login
  return children;
}

export default ProtectedRoute;