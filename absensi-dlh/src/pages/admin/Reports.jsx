import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { db } from "../../firebase/firebase";
import AdminLayout from "../../layouts/AdminLayout";

function Reports() {
  const [attendance, setAttendance] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const getAttendance = async () => {
    const querySnapshot = await getDocs(collection(db, "attendance"));

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setAttendance(data);
  };

  const filteredAttendance = attendance.filter((item) => {
    const matchStatus =
      statusFilter === "all" || item.status === statusFilter;

    if (!startDate && !endDate) return matchStatus;

    if (!item.createdAt?.toDate) return false;

    const itemDate = item.createdAt.toDate();
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (end) end.setHours(23, 59, 59, 999);

    const matchStart = start ? itemDate >= start : true;
    const matchEnd = end ? itemDate <= end : true;

    return matchStatus && matchStart && matchEnd;
  });

  const handleExportExcel = () => {
    const exportData = filteredAttendance.map((item) => ({
      Email: item.email,
      Lokasi: item.workLocation || "-",
      Status: item.status,
      Tanggal: item.createdAt?.toDate
        ? item.createdAt.toDate().toLocaleString("id-ID")
        : "-",
      Foto: item.imageUrl,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Absensi");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const fileData = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(fileData, "laporan-absensi.xlsx");
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Laporan Absensi DLH Palembang", 14, 20);

    doc.setFontSize(11);
    doc.text(`Tanggal Export: ${new Date().toLocaleString("id-ID")}`, 14, 30);

    const tableData = filteredAttendance.map((item) => [
      item.email,
      item.workLocation || "-",
      item.status,
      item.createdAt?.toDate
        ? item.createdAt.toDate().toLocaleString("id-ID")
        : "-",
    ]);

    autoTable(doc, {
      startY: 40,
      head: [["Email", "Lokasi", "Status", "Tanggal"]],
      body: tableData,
    });

    doc.save("laporan-absensi.pdf");
  };

  useEffect(() => {
    getAttendance();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Laporan Absensi
            </h1>
            <p className="text-gray-500 dark:text-gray-300 mt-1">
              Filter dan export laporan absensi pegawai
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border px-4 py-3 rounded-xl"
            >
              <option value="all">Semua Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>

            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border px-4 py-3 rounded-xl"
            />

            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border px-4 py-3 rounded-xl"
            />

            <button
              onClick={handleExportExcel}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl"
            >
              Export Excel
            </button>

            <button
              onClick={handleExportPDF}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl"
            >
              Export PDF
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b text-gray-500">
                  <th className="py-4">Email</th>
                  <th className="py-4">Lokasi</th>
                  <th className="py-4">Status</th>
                  <th className="py-4">Tanggal</th>
                  <th className="py-4">Foto</th>
                </tr>
              </thead>

              <tbody>
                {filteredAttendance.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-4">{item.email}</td>
                    <td className="py-4">{item.workLocation || "-"}</td>
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
                    <td className="py-4">
                      {item.createdAt?.toDate
                        ? item.createdAt.toDate().toLocaleString("id-ID")
                        : "-"}
                    </td>
                    <td className="py-4">
                      <a href={item.imageUrl} target="_blank" rel="noreferrer">
                        <img
                          src={item.imageUrl}
                          alt="Bukti"
                          className="w-16 h-16 object-cover rounded-xl border"
                        />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredAttendance.length === 0 && (
              <p className="text-center text-gray-500 mt-6">
                Data laporan tidak ditemukan
              </p>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Reports;