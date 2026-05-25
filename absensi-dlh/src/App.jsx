import { BrowserRouter, Routes, Route } 
from "react-router-dom";

import { db } from "./firebase/firebase";

import TestUpload from "./pages/TestUpload";

function App() {

  console.log(db);

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/test-upload"
          element={<TestUpload />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;