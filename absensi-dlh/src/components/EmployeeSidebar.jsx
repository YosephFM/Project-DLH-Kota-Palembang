import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Upload,
  History,
  Eye,
  Settings as SettingsIcon,
} from "lucide-react";

function EmployeeSidebar() {
  return (
    <div className="w-64 bg-gradient-to-b from-emerald-700 via-green-700 to-slate-950 text-white min-h-full h-full p-6">
      <h1 className="text-3xl font-bold mb-10 tracking-tight">
        DLH Pegawai
      </h1>

      <ul className="space-y-3">
        <Link
          to="/employee/dashboard"
          className="flex items-center gap-3 rounded-2xl px-4 py-3 hover:bg-white/15 transition-colors duration-200 text-sm font-medium"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          to="/employee/upload"
          className="flex items-center gap-3 rounded-2xl px-4 py-3 hover:bg-white/15 transition-colors duration-200 text-sm font-medium"
        >
          <Upload size={20} />
          Upload Bukti
        </Link>

        <Link
          to="/employee/history"
          className="flex items-center gap-3 rounded-2xl px-4 py-3 hover:bg-white/15 transition-colors duration-200 text-sm font-medium"
        >
          <History size={20} />
          Riwayat Kehadiran
        </Link>

        <Link
          to="/employee/attendance"
          className="flex items-center gap-3 rounded-2xl px-4 py-3 hover:bg-white/15 transition-colors duration-200 text-sm font-medium"
        >
          <Eye size={20} />
          Lihat Absensi
        </Link>
        <Link
          to="/employee/settings"
          className="flex items-center gap-3 rounded-2xl px-4 py-3 hover:bg-white/15 transition-colors duration-200 text-sm font-medium"
        >
          <SettingsIcon size={20} />
          Settings
        </Link>
      </ul>
    </div>
  );
}

export default EmployeeSidebar;