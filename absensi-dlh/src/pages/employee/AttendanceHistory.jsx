import { useEffect, useState } from "react";
import {collection,getDocs,query,where} from "firebase/firestore";
import EmployeeLayout from "../../layouts/EmployeeLayout";
import { auth, db } from "../../firebase/firebase";

function AttendanceHistory() {
  const [history, setHistory] = useState([]);

  const getHistory = async () => {
    const q = query(
      collection(db, "attendance"),
      where("userId", "==", auth.currentUser.uid)
    );

    const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setHistory(data);
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <EmployeeLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Riwayat Kehadiran
          </h1>
          <p className="text-gray-500 dark:text-gray-300 mt-1">
            Daftar bukti kehadiran yang pernah Anda kirim
          </p>
        </div>

        <div className="card-surface p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b text-gray-500">
                  <th className="py-4">Tanggal</th>
                  <th className="py-4">Lokasi</th>
                  <th className="py-4">Foto</th>
                  <th className="py-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {history.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-4">
                      {item.createdAt?.toDate
                        ? item.createdAt.toDate().toLocaleString("id-ID")
                        : "-"}
                    </td>

                    <td className="py-4">
                      {item.workLocation || "-"}
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
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          item.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : item.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {history.length === 0 && (
              <p className="text-center text-gray-500 mt-6">
                Belum ada riwayat absensi
              </p>
            )}
          </div>
        </div>
      </div>
    </EmployeeLayout>
  );
}

export default AttendanceHistory;