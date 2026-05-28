import {LayoutDashboard,Users,ClipboardList,FileText,Settings} from "lucide-react";
import { Link } from "react-router-dom";

function Sidebar() {

  return (

    <div className="w-64 bg-green-700 dark:bg-gray-950 text-white min-h-full h-full p-5">

      <h1 className="text-2xl font-bold mb-10">
        DLH Absensi
      </h1>

      <ul className="space-y-5">

        <Link
            to="/admin/dashboard"
            className="flex items-center gap-3"
          >
            <LayoutDashboard size={20} />
              Dashboard
          </Link>

          <Link
            to="/admin/employees"
            className="flex items-center gap-3"
          >
            <Users size={20} />
              Pegawai
          </Link>

          <Link
            to="/admin/attendance"
            className="flex items-center gap-3"
          >
            <ClipboardList size={20} />
              Absensi
          </Link>

        <Link to="/admin/reports" className="flex items-center gap-3">
          <FileText size={20} />
            Laporan
          </Link>

        <Link to="/admin/settings" className="flex items-center gap-3">
          <Settings size={20} />
            Settings
          </Link>

      </ul>

    </div>
  );
}

export default Sidebar;