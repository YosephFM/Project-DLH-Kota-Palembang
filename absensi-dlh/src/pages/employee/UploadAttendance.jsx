import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import { uploadImageToCloudinary } from "../../services/cloudinaryService";
import EmployeeLayout from "../../layouts/EmployeeLayout";
function UploadAttendance() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [description, setDescription] = useState("");
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
      alert("Pilih foto bukti kehadiran terlebih dahulu");
      return;
    }

    setIsLoading(true);

    try {
      const imageUrl = await uploadImageToCloudinary(image);

      await addDoc(collection(db, "attendance"), {
        userId: auth.currentUser.uid,
        email: auth.currentUser.email,
        imageUrl: imageUrl,
        description: description,
        status: "pending",
        createdAt: new Date(),
      });

      alert("Bukti kehadiran berhasil dikirim");

      setImage(null);
      setPreview("");
      setDescription("");
    } catch (error) {
      console.log(error);
      alert("Gagal mengirim bukti kehadiran");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <EmployeeLayout>
      <div className="max-w-2xl bg-white rounded-2xl shadow-sm p-6 mx-auto">
        <h1 className="text-2xl font-bold mb-2">
          Upload Bukti Kehadiran
        </h1>

        <p className="text-gray-500 mb-6">
          Upload foto bukti kehadiran Anda untuk diverifikasi admin.
        </p>

        <form onSubmit={handleUploadAttendance} className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">
              Foto Bukti Kehadiran
            </label>

            <input
              type="file"
              accept="image/*"
              className="w-full border p-3 rounded-xl"
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
            <label className="block mb-2 font-medium">
              Keterangan
            </label>

            <textarea
              placeholder="Contoh: Hadir tepat waktu"
              className="w-full border p-3 rounded-xl"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 text-white p-3 rounded-xl"
          >
            {isLoading ? "Mengupload..." : "Kirim Bukti Kehadiran"}
          </button>
        </form>
      </div>
    </EmployeeLayout>
  );
}

export default UploadAttendance;