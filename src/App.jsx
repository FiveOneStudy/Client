import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Nav } from './components/Nav.jsx';
import { Login } from './pages/auth/Login.jsx';
import { SignUp } from './pages/auth/SignUp.jsx';
import { FindPassword } from './pages/auth/FindPassword.jsx';
import { PasswordReset } from './pages/auth/PasswordReset.jsx';
import { MyStudy } from './pages/MyStudy.jsx';
import { My } from './pages/My.jsx';
import { Main } from './pages/Main.jsx';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/main" element={<Main />} />
        <Route path="/study" element={<MyStudy />} />
        <Route path="/findpassword" element={<FindPassword />} />
        <Route path="/passwordreset" element={<PasswordReset />} />
        <Route path="/my" element={<My />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
