import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { auth, db } from "../../firebase/firebase";
import AdminLayout from "../../layouts/AdminLayout";

function AddEmployee() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("employee");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", userCredential.user.uid), {
        name,
        email,
        role,
        status: "active",
        createdAt: new Date(),
      });

      toast.success("Pegawai berhasil ditambahkan");
      navigate("/admin/employees");
    } catch (error) {
      console.log(error);
      toast.error("Gagal menambahkan pegawai");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl bg-white rounded-2xl shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6">Tambah Pegawai</h1>

        <form onSubmit={handleAddEmployee} className="space-y-4">
          <input
            type="text"
            placeholder="Nama lengkap"
            className="w-full border p-3 rounded-xl"
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded-xl"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative">
          <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-4 rounded-2xl pr-12"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? (
              <EyeOff size={22} />
            ) : (
              <Eye size={22} />
            )}
          </button>
        </div>

          <select
            className="w-full border p-3 rounded-xl"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-green-600 text-white px-5 py-3 rounded-xl"
            >
              {isLoading ? "Menyimpan..." : "Simpan"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/employees")}
              className="bg-gray-200 px-5 py-3 rounded-xl"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

export default AddEmployee;