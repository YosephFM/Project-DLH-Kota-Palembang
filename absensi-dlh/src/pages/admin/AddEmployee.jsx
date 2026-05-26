import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { auth, db } from "../../firebase/firebase";
import AdminLayout from "../../layouts/AdminLayout";

function AddEmployee() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("123456");
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

      alert("Pegawai berhasil ditambahkan");
      navigate("/admin/employees");
    } catch (error) {
      console.log(error);
      alert("Gagal tambah pegawai");
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

          <input
            type="password"
            placeholder="Password"
            value={password}
            className="w-full border p-3 rounded-xl"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

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