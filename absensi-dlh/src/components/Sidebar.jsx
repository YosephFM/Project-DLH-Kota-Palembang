import {
  LayoutDashboard,
  Users,
  ClipboardList,
  FileText,
  Settings
} from "lucide-react";

function Sidebar() {

  return (

    <div className="w-64 bg-green-700 text-white min-h-screen p-5">

      <h1 className="text-2xl font-bold mb-10">
        DLH Absensi
      </h1>

      <ul className="space-y-5">

        <li className="flex items-center gap-3 cursor-pointer">
          <LayoutDashboard size={20} />
          Dashboard
        </li>

        <li className="flex items-center gap-3 cursor-pointer">
          <Users size={20} />
          Pegawai
        </li>

        <li className="flex items-center gap-3 cursor-pointer">
          <ClipboardList size={20} />
          Absensi
        </li>

        <li className="flex items-center gap-3 cursor-pointer">
          <FileText size={20} />
          Laporan
        </li>

        <li className="flex items-center gap-3 cursor-pointer">
          <Settings size={20} />
          Settings
        </li>

      </ul>

    </div>
  );
}

export default Sidebar;