import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "../../firebase/firebase";
import AdminLayout from "../../layouts/AdminLayout";

function Employees() {

  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [roleFilter, setRoleFilter] = useState("all");

  // GET EMPLOYEES
  const getEmployees = async () => {

    const querySnapshot =
      await getDocs(collection(db, "users"));

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setEmployees(data);
  };

  // DELETE EMPLOYEE
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Yakin ingin menghapus pegawai ini?"
    );

    if (!confirmDelete) return;

    try {

      await deleteDoc(doc(db, "users", id));

      toast.success("Pegawai berhasil dihapus");

      getEmployees();

    } catch (error) {

      console.log(error);

      toast.error("Gagal menghapus pegawai");
    }
  };

  useEffect(() => {

    getEmployees();

  }, []);

  // FILTER SEARCH + ROLE
  const filteredEmployees = employees.filter((employee) => {

    const matchSearch =
      employee.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||

      employee.email
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchRole =
      roleFilter === "all" ||
      employee.role === roleFilter;

    return matchSearch && matchRole;
  });

  return (

    <AdminLayout>

      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Data Pegawai
            </h1>

            <p className="text-gray-500 dark:text-gray-300 mt-1">
              Daftar seluruh pegawai DLH
            </p>

          </div>

          {/* ACTION */}
          <div className="flex gap-3 flex-wrap">

            {/* SEARCH */}
            <input
              type="text"
              placeholder="Cari pegawai..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="input-field w-64"
            />

            {/* FILTER ROLE */}
            <select
              value={roleFilter}
              onChange={(e) =>
                setRoleFilter(e.target.value)
              }
              className="input-field"
            >

              <option value="all">
                Semua Role
              </option>

              <option value="admin">
                Admin
              </option>

              <option value="employee">
                Employee
              </option>

            </select>

            {/* BUTTON */}
            <button
              onClick={() =>
                navigate("/admin/employees/add")
              }
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-2xl shadow-md transition-colors duration-200"
            >
              + Tambah Pegawai
            </button>

          </div>

        </div>

        {/* TABLE */}
        <div className="card-surface p-6">

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>

                <tr className="border-b text-gray-500">

                  <th className="py-4">
                    Nama
                  </th>

                  <th className="py-4">
                    Email
                  </th>

                  <th className="py-4">
                    Role
                  </th>

                  <th className="py-4">
                    Aksi
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredEmployees.map((employee) => (

                  <tr
                    key={employee.id}
                    className="border-b"
                  >

                    <td className="py-4">
                      {employee.name}
                    </td>

                    <td className="py-4">
                      {employee.email}
                    </td>

                    <td className="py-4">

                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          employee.role === "admin"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >

                        {employee.role}

                      </span>

                    </td>

                    <td className="py-4">

                      <button
                        onClick={() =>
                          navigate(
                            `/admin/employees/edit/${employee.id}`
                          )
                        }
                        className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg mr-2"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(employee.id)
                        }
                        className="bg-red-100 text-red-700 px-3 py-1 rounded-lg"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

            {/* EMPTY STATE */}
            {employees.length === 0 && (

              <p className="text-center text-gray-500 mt-6">
                Data pegawai belum tersedia
              </p>

            )}

            {/* NOT FOUND */}
            {employees.length > 0 &&
              filteredEmployees.length === 0 && (

              <p className="text-center text-gray-500 mt-6">
                Pegawai tidak ditemukan
              </p>

            )}

          </div>

        </div>

      </div>

    </AdminLayout>
  );
}

export default Employees;