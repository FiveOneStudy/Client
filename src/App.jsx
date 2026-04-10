import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Nav } from "./components/Nav.jsx";
import { Login } from "./pages/auth/Login.jsx";
import { SignUp } from "./pages/auth/SignUp.jsx";
import { FindPassword } from "./pages/auth/FindPassword.jsx";
import { PasswordReset } from "./pages/auth/PasswordReset.jsx";
import { My } from "./pages/My.jsx";
import { Plan } from "./pages/Plan.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/findpassword" element={<FindPassword />} />
        <Route path="/passwordreset" element={<PasswordReset />} />
      </Routes>
      <Nav />
      <Routes>
        <Route path="/my" element={<My />} />
        <Route path="/plan" element={<Plan />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
