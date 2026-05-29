import { useEffect, useState } from "react";
import {collection,getDocs,query,where} from "firebase/firestore";

import { auth, db } from "../../firebase/firebase";
import EmployeeLayout from "../../layouts/EmployeeLayout";

function TodayAttendance() {
  const [attendance, setAttendance] = useState(null);

  const getTodayAttendance = async () => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "attendance"),
      where("userId", "==", auth.currentUser.uid)
    );

    const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const today = new Date().toDateString();

    const todayData = data.find((item) => {
      if (!item.createdAt?.toDate) return false;

      return item.createdAt.toDate().toDateString() === today;
    });

    setAttendance(todayData || null);
  };

  useEffect(() => {
    getTodayAttendance();
  }, []);

  return (
    <EmployeeLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Absensi Hari Ini
          </h1>
          <p className="text-gray-500 dark:text-gray-300 mt-1">
            Informasi status absensi Anda hari ini
          </p>
        </div>

        {!attendance ? (
          <div className="card-surface p-6">
            <h2 className="text-2xl font-bold text-red-600">
              Belum Absen
            </h2>
            <p className="text-gray-500 mt-2">
              Anda belum mengirim bukti kehadiran hari ini.
            </p>
          </div>
        ) : (
          <div className="card-surface p-6 max-w-2xl">
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              Detail Absensi
            </h2>

            <div className="space-y-3">
              <p>
                <strong>Tanggal:</strong>{" "}
                {attendance.createdAt?.toDate
                  ? attendance.createdAt.toDate().toLocaleDateString("id-ID")
                  : "-"}
              </p>

              <p>
                <strong>Jam Upload:</strong>{" "}
                {attendance.createdAt?.toDate
                  ? attendance.createdAt.toDate().toLocaleTimeString("id-ID")
                  : "-"}
              </p>

              <p>
                <strong>Lokasi:</strong>{" "}
                {attendance.workLocation || "-"}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    attendance.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : attendance.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {attendance.status}
                </span>
              </p>

              <div>
                <strong>Foto Bukti:</strong>

                <a
                  href={attendance.imageUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={attendance.imageUrl}
                    alt="Bukti Absensi"
                    className="w-full h-72 object-cover rounded-xl border mt-3"
                  />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </EmployeeLayout>
  );
}

export default TodayAttendance;