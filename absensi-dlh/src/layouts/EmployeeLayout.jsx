import EmployeeSidebar from "../components/EmployeeSidebar";
import EmployeeNavbar from "../components/EmployeeNavbar";

function EmployeeLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <EmployeeSidebar />

      <div className="flex-1">
        <EmployeeNavbar />

        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export default EmployeeLayout;