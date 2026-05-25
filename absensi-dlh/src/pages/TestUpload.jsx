import { useState } from "react";

import { uploadImageToCloudinary }
from "../services/cloudinaryService";

function TestUpload() {

  const [image, setImage] = useState(null);

  const handleUpload = async () => {

    if (!image) return;

    const imageUrl =
      await uploadImageToCloudinary(image);

    console.log(imageUrl);
  };

  return (
    <div>

      <input
        type="file"
        onChange={(e) =>
          setImage(e.target.files[0])
        }
      />

      <button onClick={handleUpload}>
        Upload
      </button>

    </div>
  );
}

export default TestUpload;