import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import toast from "react-hot-toast";
import { auth, db } from "../../firebase/firebase";
import { uploadImageToCloudinary } from "../../services/cloudinaryService";
import EmployeeLayout from "../../layouts/EmployeeLayout";

const lokasiKerjaOptions = [
  "KECAMATAN ILIR TIMUR III (RAJAWALI, VETERAN, DAN M.ISA)",
  "KECAMATAN ILIR TIMUR III (M.ISA, VETERAN, PERINTIS DAN TPS KUTO)",
  "KECAMATAN ILIR TIMUR III (R SUKAMTO, GOLF, MANGKUNEGARA)",
  "KECAMATAN ILIR TIMUR III (RAJAWALI, DEMPO, SEKIP BENDUNG, DAN TPS GLEDEK)",
  "KECAMATAN ILIR TIMUR III (BANGAU, IBA, DAN MAYOR RUSLAN)",
  "KECAMATAN ILIR TIMUR III (ABDUL ROZAK, LAMPU MERAH PATAL, UNDERPASS, DAN TAMAN KENTEN)",
  "KECAMATAN ILIR TIMUR III DAN KECAMATAN KEMUNING",
  "KECAMATAN ILIR TIMUR III",
  "KECAMATAN ILIR TIMUR III (MANGKUNEGARA, ABDUL ROZAK, KIWAL, TAMAN KENTEN, GOLF, R SUKAMTO, DAN TPS SEDUDUK PUTIH)",
  "KECAMATAN ILIR TIMUR III (KONTAINER IBA, LORONG MASJID DEPAN PTC, M. ISA, BANGAU, MAYOR RUSLAN, BAMBANG UTOYO, DAN TPS RAMAKASIH)",
  "KECAMATAN ILIR TIMUR III (TPS SEDUDUK PUTIH)",
  "KECAMATAN ILIR TIMUR III (SELURUH WILAYAH DI KECAMATAN ILIR TIMUR TIGA)",
];

function UploadAttendance() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [workLocation, setWorkLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUploadAttendance = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Pilih foto bukti kehadiran terlebih dahulu");
      return;
    }

    if (!workLocation) {
      toast.error("Pilih lokasi kerja terlebih dahulu");
      return;
    }

    setIsLoading(true);

    try {
      const imageUrl = await uploadImageToCloudinary(image);

      await addDoc(collection(db, "attendance"), {
        userId: auth.currentUser.uid,
        email: auth.currentUser.email,
        imageUrl,
        workLocation,
        status: "pending",
        createdAt: new Date(),
      });

      toast.success("Bukti kehadiran berhasil dikirim");

      setImage(null);
      setPreview("");
      setWorkLocation("");
    } catch (error) {
      console.log(error);
      toast.error("Gagal mengirim bukti kehadiran");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <EmployeeLayout>
      <div className="max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mx-auto">
        <h1 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
          Upload Bukti Kehadiran
        </h1>

        <p className="text-gray-500 dark:text-gray-300 mb-6">
          Upload foto bukti kehadiran Anda untuk diverifikasi admin.
        </p>

        <form onSubmit={handleUploadAttendance} className="space-y-4">
          <div>
            <label className="block mb-2 font-medium text-gray-800 dark:text-white">
              Foto Bukti Kehadiran
            </label>

            <input
              type="file"
              accept="image/*"
              className="w-full border p-3 rounded-xl dark:bg-gray-700 dark:text-white"
              onChange={handleImageChange}
            />
          </div>

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-64 object-cover rounded-xl border"
            />
          )}

          <div>
            <label className="block mb-2 font-medium text-gray-800 dark:text-white">
              Lokasi Kerja
            </label>

            <select
              value={workLocation}
              onChange={(e) => setWorkLocation(e.target.value)}
              className="w-full border p-3 rounded-xl dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="">Pilih lokasi kerja</option>

              {lokasiKerjaOptions.map((lokasi, index) => (
                <option key={index} value={lokasi}>
                  {lokasi}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-xl"
          >
            {isLoading ? "Mengupload..." : "Kirim Bukti Kehadiran"}
          </button>
        </form>
      </div>
    </EmployeeLayout>
  );
}

export default UploadAttendance;