import { useState } from "react";
import { Menu } from "lucide-react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950">
      <div className="hidden md:block min-h-screen bg-gradient-to-b from-emerald-700 via-green-700 to-slate-950">
        <Sidebar />
      </div>

      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="w-64 bg-gradient-to-b from-emerald-700 via-green-700 to-slate-950">
            <Sidebar />
          </div>

          <div
            className="flex-1 bg-black/40"
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>
      )}

      <div className="flex-1">
        <div className="md:hidden bg-white dark:bg-slate-900 shadow px-4 py-3 border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-slate-900 dark:text-white"
          >
            <Menu size={26} />
          </button>
        </div>

        <Navbar />

        <main className="p-4 md:p-6 max-w-[1600px] mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;