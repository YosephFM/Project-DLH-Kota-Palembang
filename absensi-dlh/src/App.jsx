import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/admin/Dashboard";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/admin/dashboard"
          element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>}
        />
        <Route
          path="/employee/dashboard"
          element={
          <ProtectedRoute>
            <EmployeeDashboard />
          </ProtectedRoute>}
        />


      </Routes>

    </BrowserRouter>
  );
}

export default App;