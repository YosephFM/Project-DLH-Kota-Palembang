import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";
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
      toast.error("Data pegawai tidak ditemukan");
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

      toast.success("Data pegawai berhasil diperbarui");
      navigate("/admin/employees");
    } catch (error) {
      console.log(error);
      toast.error("Gagal memperbarui data pegawai");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getEmployeeDetail();
  }, []);

  return (
    <AdminLayout>
      <div className="max-w-2xl card-surface p-6 mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Edit Pegawai</h1>

        <form onSubmit={handleUpdateEmployee} className="space-y-4">
          <input
            type="text"
            placeholder="Nama lengkap"
            value={name}
            className="input-field"
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            className="input-field"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <select
            className="input-field"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>

          <select
            className="input-field"
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
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-2xl shadow-md transition-colors duration-200"
            >
              {isLoading ? "Menyimpan..." : "Update"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/employees")}
              className="bg-slate-200 hover:bg-slate-300 text-slate-900 px-5 py-3 rounded-2xl transition-colors duration-200"
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