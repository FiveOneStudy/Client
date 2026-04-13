import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Nav } from './components/Nav.jsx';
import { Login } from './pages/auth/Login.jsx';
import { SignUp } from './pages/auth/SignUp.jsx';
import { FindPassword } from './pages/auth/FindPassword.jsx';
import { PasswordReset } from './pages/auth/PasswordReset.jsx';
import { My } from './pages/My.jsx';
import { Community } from './pages/community/Community.jsx';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/findpassword" element={<FindPassword />} />
        <Route path="/passwordreset" element={<PasswordReset />} />
        <Route path="/my" element={<My />} />
        <Route path='/community' element={<Community/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
