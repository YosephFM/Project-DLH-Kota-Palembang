import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/admin/Dashboard";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Employees from "./pages/admin/Employees";
import AddEmployee from "./pages/admin/AddEmployee";
import EditEmployee from "./pages/admin/EditEmployee";
import UploadAttendance from "./pages/employee/UploadAttendance";
import AttendanceApproval from "./pages/admin/AttendanceApproval";
import AttendanceHistory from "./pages/employee/AttendanceHistory";
import TodayAttendance from "./pages/employee/TodayAttendance";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";
import EmployeeSettings from "./pages/employee/EmployeeSettings";

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
        <Route
          path="/admin/employees"
          element={
            <ProtectedRoute>
              <Employees />
            </ProtectedRoute>
          }
        />
        <Route
        path="/admin/employees/add"
          element={
            <ProtectedRoute>
              <AddEmployee />
            </ProtectedRoute>
          }
        />
        <Route
        path="/admin/employees/edit/:id"
          element={
            <ProtectedRoute>
              <EditEmployee />
            </ProtectedRoute>
          }
        />
        <Route
        path="/employee/upload"
          element={
            <ProtectedRoute>
              <UploadAttendance />
            </ProtectedRoute>
          }
        />
        <Route
        path="/admin/attendance"
          element={
            <ProtectedRoute>
              <AttendanceApproval />
            </ProtectedRoute>
          }       
        />
        <Route
        path="/employee/history"
          element={
            <ProtectedRoute>
              <AttendanceHistory />
            </ProtectedRoute>
          }
        />
        <Route
        path="/employee/attendance"
          element={
            <ProtectedRoute>
              <TodayAttendance />
            </ProtectedRoute>
          }
        />
        <Route
        path="/admin/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route
        path="/admin/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
        path="/employee/settings"
          element={
            <ProtectedRoute>
              <EmployeeSettings />
            </ProtectedRoute>
          }
        />


      </Routes>

    </BrowserRouter>
  );
}

export default App;