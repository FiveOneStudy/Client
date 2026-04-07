import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/auth/Login.jsx";
import { SignUp } from "./pages/auth/SignUp.jsx";
import { FindePassword } from "./pages/auth/FindPassword.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/findpassword" element={<FindePassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;