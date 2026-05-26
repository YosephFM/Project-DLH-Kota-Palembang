import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import { db } from "../../firebase/firebase";
import AdminLayout from "../../layouts/AdminLayout";

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("employee");
  const [status, setStatus] = useState("active");
  const [isLoading, setIsLoading] = useState(false);

  const getEmployeeDetail = async () => {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      setName(data.name || "");
      setEmail(data.email || "");
      setRole(data.role || "employee");
      setStatus(data.status || "active");
    } else {
      alert("Data pegawai tidak ditemukan");
      navigate("/admin/employees");
    }
  };

  const handleUpdateEmployee = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateDoc(doc(db, "users", id), {
        name,
        email,
        role,
        status,
        updatedAt: new Date(),
      });

      alert("Data pegawai berhasil diperbarui");
      navigate("/admin/employees");
    } catch (error) {
      console.log(error);
      alert("Gagal memperbarui data pegawai");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getEmployeeDetail();
  }, []);

  return (
    <AdminLayout>
      <div className="max-w-2xl bg-white rounded-2xl shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6">Edit Pegawai</h1>

        <form onSubmit={handleUpdateEmployee} className="space-y-4">
          <input
            type="text"
            placeholder="Nama lengkap"
            value={name}
            className="w-full border p-3 rounded-xl"
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            className="w-full border p-3 rounded-xl"
            onChange={(e) => setEmail(e.target.value)}
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

          <select
            className="w-full border p-3 rounded-xl"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-green-600 text-white px-5 py-3 rounded-xl"
            >
              {isLoading ? "Menyimpan..." : "Update"}
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

export default EditEmployee;