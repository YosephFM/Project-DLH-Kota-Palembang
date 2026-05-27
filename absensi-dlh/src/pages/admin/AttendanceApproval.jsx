import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../firebase/firebase";
import AdminLayout from "../../layouts/AdminLayout";

function AttendanceApproval() {
  const [attendance, setAttendance] = useState([]);

  const getAttendance = async () => {
    const querySnapshot = await getDocs(collection(db, "attendance"));

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setAttendance(data);
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, "attendance", id), {
        status,
        updatedAt: new Date(),
      });

      alert(`Absensi berhasil di-${status}`);
      getAttendance();
    } catch (error) {
      console.log(error);
      alert("Gagal update status absensi");
    }
  };

  const pendingAttendance = attendance.filter((item) => {
    return item.status === "pending";
  });

  useEffect(() => {
    getAttendance();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Approval Absensi
          </h1>

          <p className="text-gray-500 mt-1">
            Verifikasi bukti kehadiran pegawai yang masih pending
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b text-gray-500">
                  <th className="py-4">Email</th>
                  <th className="py-4">Keterangan</th>
                  <th className="py-4">Foto</th>
                  <th className="py-4">Status</th>
                  <th className="py-4">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {pendingAttendance.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-4">{item.email}</td>

                    <td className="py-4">
                      {item.description || "-"}
                    </td>

                    <td className="py-4">
                      <a
                        href={item.imageUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={item.imageUrl}
                          alt="Bukti"
                          className="w-20 h-20 object-cover rounded-xl border"
                        />
                      </a>
                    </td>

                    <td className="py-4">
                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                        {item.status}
                      </span>
                    </td>

                    <td className="py-4 flex gap-2">
                      <button
                        onClick={() =>
                          handleUpdateStatus(item.id, "approved")
                        }
                        className="bg-green-100 text-green-700 px-3 py-1 rounded-lg"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          handleUpdateStatus(item.id, "rejected")
                        }
                        className="bg-red-100 text-red-700 px-3 py-1 rounded-lg"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {pendingAttendance.length === 0 && (
              <p className="text-center text-gray-500 mt-6">
                Tidak ada absensi pending
              </p>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AttendanceApproval;