import { useState } from "react";
import { Menu } from "lucide-react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="hidden md:block min-h-screen bg-green-700 dark:bg-gray-950">
        <Sidebar />
      </div>

      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="w-64">
            <Sidebar />
          </div>

          <div
            className="flex-1 bg-black/40"
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>
      )}

      <div className="flex-1">
        <div className="md:hidden bg-white dark:bg-gray-800 shadow px-4 py-3">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-800 dark:text-white"
          >
            <Menu size={26} />
          </button>
        </div>

        <Navbar />

        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;