import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  updatePassword,
  updateProfile,
} from "firebase/auth";

import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";
import AdminLayout from "../../layouts/AdminLayout";
import { auth, db } from "../../firebase/firebase";

function Settings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const getUserData = async () => {
    try {
      const uid = auth.currentUser.uid;

      const userDoc = await getDoc(
        doc(db, "users", uid)
      );

      const userData = userDoc.data();

      setName(userData.name || "");
      setEmail(userData.email || "");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const uid = auth.currentUser.uid;

      // Update Firestore
      await updateDoc(doc(db, "users", uid), {
        name,
      });

      // Update Firebase Auth
      await updateProfile(auth.currentUser, {
        displayName: name,
      });

      toast.success("Profil berhasil diperbarui");
    } catch (error) {
      console.log(error);
      toast.error("Gagal update profil");
    }
  };

  const handleChangePassword = async () => {
    try {
      if (newPassword.length < 6) {
        return toast.error("Password minimal 6 karakter");
      }

      await updatePassword(
        auth.currentUser,
        newPassword
      );

      toast.success("Password berhasil diubah");

      setNewPassword("");
    } catch (error) {
      console.log(error);
      toast.error("Gagal mengubah password");
    }
  };

  const handleToggleTheme = () => {
    const newTheme = !darkMode;

    setDarkMode(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    getUserData();

    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Settings
          </h1>

          <p className="text-gray-500 dark:text-gray-300 mt-1">
            Kelola profil dan pengaturan aplikasi
          </p>
        </div>

        {/* Profile */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">
            Profil Admin
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Nama"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-4 py-3 rounded-xl dark:bg-gray-700 dark:text-white"
            />

            <input
              type="email"
              value={email}
              disabled
              className="w-full border px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-white"
            />

            <button
              onClick={handleUpdateProfile}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl"
            >
              Update Profil
            </button>
          </div>
        </div>

        {/* Password */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">
            Ganti Password
          </h2>

          <div className="space-y-4">
            <div className="relative">
            <input
                type={showPassword ? "text" : "password"}
                placeholder="Password Baru"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border px-4 py-3 rounded-xl pr-12 dark:bg-gray-700 dark:text-white"
            />

            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
            </div>
            <button
              onClick={handleChangePassword}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
            >
              Update Password
            </button>
          </div>
        </div>

        {/* Theme */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">
            Tampilan
          </h2>

          <button
            onClick={handleToggleTheme}
            className="bg-gray-900 text-white px-5 py-3 rounded-xl"
          >
            {darkMode
              ? "Switch to Light Mode"
              : "Switch to Dark Mode"}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Settings;