import { useEffect, useState } from "react";
import {Upload,History,Eye,Clock} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {collection,getDocs,query,where} from "firebase/firestore";
import { auth, db }from "../../firebase/firebase";
import EmployeeLayout from "../../layouts/EmployeeLayout";

function EmployeeDashboard() {

  const navigate = useNavigate();

  const [totalAttendance, setTotalAttendance] = useState(0);

  const [todayStatus, setTodayStatus] = useState("Belum Absen");

  const [lastStatus, setLastStatus] = useState("Pending");

  const getDashboardData = async () => {

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

    // Total attendance
    setTotalAttendance(data.length);

    // Cek attendance hari ini
    const today = new Date().toDateString();

    const todayAttendance = data.find((item) => {

      if (!item.createdAt?.toDate) return false;

      return (
        item.createdAt.toDate().toDateString() === today
      );
    });

    if (todayAttendance) {

      setTodayStatus("Sudah Absen");

    } else {

      setTodayStatus("Belum Absen");
    }

    // Status terakhir
    if (data.length > 0) {

      const latestAttendance =
        data[data.length - 1];

      setLastStatus(latestAttendance.status);
    }
  };

  useEffect(() => {

    getDashboardData();

  }, []);

  return (

    <EmployeeLayout>

      <div className="mb-6">

        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard Pegawai
        </h1>

        <p className="text-gray-500 mt-1">
          Kelola kehadiran dan riwayat absensi Anda
        </p>

      </div>

      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

        {/* Status Hari Ini */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">

          <Clock className="text-green-600 mb-3" />

          <p className="text-gray-500">
            Status Hari Ini
          </p>

          <h2 className="text-2xl font-bold">

            {todayStatus}

          </h2>

        </div>

        {/* Total Attendance */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">

          <Eye className="text-blue-600 mb-3" />

          <p className="text-gray-500">
            Total Kehadiran
          </p>

          <h2 className="text-2xl font-bold">

            {totalAttendance} Hari

          </h2>

        </div>

        {/* Last Status */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">

          <History className="text-yellow-600 mb-3" />

          <p className="text-gray-500">
            Status Terakhir
          </p>

          <h2 className="text-2xl font-bold capitalize">

            {lastStatus}

          </h2>

        </div>

      </div>

      {/* Menu */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* Upload */}
        <button
          onClick={() => navigate("/employee/upload")}
          className="bg-white p-6 rounded-2xl shadow-sm text-left hover:scale-[1.02] transition-all duration-200"
        >

          <Upload className="text-green-600 mb-3" />

          <h3 className="text-xl font-bold">
            Upload Bukti Kehadiran
          </h3>

          <p className="text-gray-500 mt-2">
            Kirim foto bukti kehadiran untuk diverifikasi admin.
          </p>

        </button>

        {/* History */}
        <button
          onClick={() => navigate("/employee/history")}
          className="bg-white p-6 rounded-2xl shadow-sm text-left hover:scale-[1.02] transition-all duration-200"
        >

          <History className="text-blue-600 mb-3" />

          <h3 className="text-xl font-bold">
            Riwayat Kehadiran
          </h3>

          <p className="text-gray-500 mt-2">
            Lihat daftar absensi yang pernah dikirim.
          </p>

        </button>

        {/* Status */}
        <button
          onClick={() => navigate("/employee/attendance")}
          className="bg-white p-6 rounded-2xl shadow-sm text-left hover:scale-[1.02] transition-all duration-200"
        >

          <Eye className="text-purple-600 mb-3" />

          <h3 className="text-xl font-bold">
            Lihat Absensi
          </h3>

          <p className="text-gray-500 mt-2">
            Lihat status absensi hari ini.
          </p>

        </button>

      </div>

    </EmployeeLayout>
  );
}

export default EmployeeDashboard;