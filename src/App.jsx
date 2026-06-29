import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { PlanProvider } from "./context/Plancontext";
import { StudyProvider } from "./context/StudyContext";

import { Nav } from "./components/Nav.jsx";

import { Login } from "./pages/auth/Login.jsx";
import { SignUp } from "./pages/auth/SignUp.jsx";
import { PasswordReset } from "./pages/auth/PasswordReset.jsx";

import { Main } from "./pages/Main.jsx";
import { MyStudy } from "./pages/MyStudy.jsx";
import { My } from "./pages/My.jsx";
import { Plan } from "./pages/Plan.jsx";

import { Community } from "./pages/community/Community.jsx";
import { Popularity } from "./pages/community/Popularity.jsx";
import { Recent } from "./pages/community/Recent.jsx";
import { Mypost } from "./pages/community/Mypost.jsx";
import { Mycomment } from "./pages/community/Mycomment.jsx";
import { Write } from "./pages/community/Write.jsx";
import { Post } from "./pages/community/Post.jsx";
import MyStudyPage from "./pages/community/MyStudyPage";

function PrivateRoute() {
  const token = localStorage.getItem("accessToken");
  console.log("PrivateRoute 실행됨, 토큰:", token);
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}

function MainLayout() {
  return (
    <PlanProvider>
      <StudyProvider>
        <Nav />
        <Outlet />
      </StudyProvider>
    </PlanProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Login" element={<Navigate to="/login" replace />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/passwordreset" element={<PasswordReset />} />

        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/main" element={<Main />} />
            <Route path="/study" element={<MyStudy />} />
            <Route path="/my" element={<My />} />
            <Route path="/plan" element={<Plan />} />

            <Route path="/community" element={<Community />} />
            <Route path="/community/popularity" element={<Popularity />} />
            <Route path="/community/recent" element={<Recent />} />
            <Route path="/community/mypost" element={<Mypost />} />
            <Route path="/community/mycomment" element={<Mycomment />} />
            <Route path="/community/write" element={<Write />} />
            <Route path="/community/post/:id" element={<Post />} />

            <Route path="/mystudy/:id" element={<MyStudyPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;