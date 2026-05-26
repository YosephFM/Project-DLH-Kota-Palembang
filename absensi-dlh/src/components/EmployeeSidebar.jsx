import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Upload,
  History,
  Eye,
  LogOut
} from "lucide-react";

function EmployeeSidebar() {
  return (
    <div className="w-64 bg-green-700 text-white min-h-screen p-5">
      <h1 className="text-2xl font-bold mb-10">
        DLH Pegawai
      </h1>

      <ul className="space-y-5">
        <Link to="/employee/dashboard" className="flex items-center gap-3">
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link to="/employee/upload" className="flex items-center gap-3">
          <Upload size={20} />
          Upload Bukti
        </Link>

        <Link to="/employee/history" className="flex items-center gap-3">
          <History size={20} />
          Riwayat Kehadiran
        </Link>

        <Link to="/employee/attendance" className="flex items-center gap-3">
          <Eye size={20} />
          Lihat Absensi
        </Link>
      </ul>
    </div>
  );
}

export default EmployeeSidebar;