import {LayoutDashboard,Users,ClipboardList,FileText,Settings} from "lucide-react";
import { Link } from "react-router-dom";

function Sidebar() {

  return (

    <div className="w-64 bg-gradient-to-b from-emerald-700 via-green-700 to-slate-950 text-white min-h-full h-full p-6">

      <h1 className="text-3xl font-bold mb-10 tracking-tight">
        DLH Admin
      </h1>

      <ul className="space-y-3">

        <Link
          to="/admin/dashboard"
          className="flex items-center gap-3 rounded-2xl px-4 py-3 hover:bg-white/15 transition-colors duration-200 text-sm font-medium"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          to="/admin/employees"
          className="flex items-center gap-3 rounded-2xl px-4 py-3 hover:bg-white/15 transition-colors duration-200 text-sm font-medium"
        >
          <Users size={20} />
          Pegawai
        </Link>

        <Link
          to="/admin/attendance"
          className="flex items-center gap-3 rounded-2xl px-4 py-3 hover:bg-white/15 transition-colors duration-200 text-sm font-medium"
        >
          <ClipboardList size={20} />
          Absensi
        </Link>

        <Link
          to="/admin/reports"
          className="flex items-center gap-3 rounded-2xl px-4 py-3 hover:bg-white/15 transition-colors duration-200 text-sm font-medium"
        >
          <FileText size={20} />
          Laporan
        </Link>

        <Link
          to="/admin/settings"
          className="flex items-center gap-3 rounded-2xl px-4 py-3 hover:bg-white/15 transition-colors duration-200 text-sm font-medium"
        >
          <Settings size={20} />
          Settings
        </Link>

      </ul>

    </div>
  );
}

export default Sidebar;