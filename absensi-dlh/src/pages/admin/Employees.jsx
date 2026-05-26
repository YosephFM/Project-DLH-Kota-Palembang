import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebase";
import AdminLayout from "../../layouts/AdminLayout";
import {collection,getDocs,deleteDoc,doc} from "firebase/firestore";

function Employees() {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const getEmployees = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setEmployees(data);
  };
  const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Yakin ingin menghapus pegawai ini?"
  );

  if (!confirmDelete) return;

  try {
    await deleteDoc(doc(db, "users", id));

    alert("Pegawai berhasil dihapus");

    getEmployees();
  } catch (error) {
    console.log(error);
    alert("Gagal menghapus pegawai");
  }
};

  useEffect(() => {
    getEmployees();
  }, []);
  const filteredEmployees = employees.filter((employee) =>
  employee.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  employee.email?.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex gap-3">
            <input
            type="text"
            placeholder="Cari pegawai..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-4 py-3 rounded-xl w-64"
            />
        <button
        onClick={() => navigate("/admin/employees/add")}
        className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl"
        >
        + Tambah Pegawai
        </button>
    </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b text-gray-500">
                  <th className="py-4">Nama</th>
                  <th className="py-4">Email</th>
                  <th className="py-4">Role</th>
                  <th className="py-4">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id} className="border-b">
                    <td className="py-4">{employee.name}</td>
                    <td className="py-4">{employee.email}</td>
                    <td className="py-4">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {employee.role}
                      </span>
                    </td>
                    <td className="py-4">
                      <button
                        onClick={() => navigate(`/admin/employees/edit/${employee.id}`)}
                        className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg mr-2"
                        >
                        Edit
                        </button>
                      <button
                        onClick={() => handleDelete(employee.id)}
                        className="bg-red-100 text-red-700 px-3 py-1 rounded-lg"
                        >
                        Delete
                        </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {employees.length === 0 && (
              <p className="text-center text-gray-500 mt-6">
                Data pegawai belum tersedia
              </p>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Employees;