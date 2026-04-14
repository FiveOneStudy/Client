import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Nav } from './components/Nav.jsx';
import { Login } from './pages/auth/Login.jsx';
import { SignUp } from './pages/auth/SignUp.jsx';
import { FindPassword } from './pages/auth/FindPassword.jsx';
import { PasswordReset } from './pages/auth/PasswordReset.jsx';
import { My } from './pages/My.jsx';
import { Community } from './pages/community/Community.jsx';
import { Popularity } from './pages/community/Popularity.jsx';
import { Recent } from './pages/community/Recent.jsx';
import { Mypost } from './pages/community/Mypost.jsx';
import { Mycomment } from './pages/community/Mycomment.jsx';
import { Write } from './pages/community/Write.jsx'

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
        <Route path='/community/popularity' element={<Popularity/>} />
        <Route path='/community/recent' element={<Recent/>} />
        <Route path='/community/mypost' element={<Mypost/>} />
        <Route path='/community/mycomment' element={<Mycomment/>} />
        <Route path='/community/write' element={<Write/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
