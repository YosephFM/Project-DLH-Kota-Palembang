import { useEffect, useState } from "react";
import {
  Users,
  CheckCircle,
  Clock,
  XCircle
} from "lucide-react";

import {
  collection,
  getDocs
} from "firebase/firestore";

import { db } from "../../firebase/firebase";
import AdminLayout from "../../layouts/AdminLayout";
import StatCard from "../../components/StatCard";

function Dashboard() {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [recentAttendance, setRecentAttendance] = useState([]);

  const getDashboardData = async () => {
    try {
      const usersSnapshot = await getDocs(collection(db, "users"));
      const attendanceSnapshot = await getDocs(collection(db, "attendance"));

      const usersData = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const attendanceData = attendanceSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTotalEmployees(usersData.length);

      setApprovedCount(
        attendanceData.filter((item) => item.status === "approved").length
      );

      setPendingCount(
        attendanceData.filter((item) => item.status === "pending").length
      );

      setRejectedCount(
        attendanceData.filter((item) => item.status === "rejected").length
      );

      const sortedAttendance = attendanceData.sort((a, b) => {
        const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(0);
        const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(0);

        return dateB - dateA;
      });

      setRecentAttendance(sortedAttendance.slice(0, 5));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Dashboard Admin
          </h1>
          <p className="text-gray-500 mt-1">
            Monitoring absensi pegawai DLH Palembang
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          <StatCard
            title="Total Pegawai"
            value={totalEmployees}
            icon={<Users className="text-blue-600" />}
            color="bg-blue-100"
          />

          <StatCard
            title="Approved"
            value={approvedCount}
            icon={<CheckCircle className="text-green-600" />}
            color="bg-green-100"
          />

          <StatCard
            title="Pending"
            value={pendingCount}
            icon={<Clock className="text-yellow-600" />}
            color="bg-yellow-100"
          />

          <StatCard
            title="Rejected"
            value={rejectedCount}
            icon={<XCircle className="text-red-600" />}
            color="bg-red-100"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">
            Absensi Terbaru
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b text-gray-500">
                  <th className="py-3">Email</th>
                  <th className="py-3">Keterangan</th>
                  <th className="py-3">Tanggal</th>
                  <th className="py-3">Status</th>
                  <th className="py-3">Foto</th>
                </tr>
              </thead>

              <tbody>
                {recentAttendance.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-3">{item.email}</td>
                    <td className="py-3">{item.description || "-"}</td>
                    <td className="py-3">
                      {item.createdAt?.toDate
                        ? item.createdAt.toDate().toLocaleString("id-ID")
                        : "-"}
                    </td>
                    <td className="py-3">
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
                    <td className="py-3">
                      <a
                        href={item.imageUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={item.imageUrl}
                          alt="Bukti"
                          className="w-14 h-14 object-cover rounded-lg border"
                        />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {recentAttendance.length === 0 && (
              <p className="text-center text-gray-500 mt-6">
                Belum ada data absensi
              </p>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Dashboard;