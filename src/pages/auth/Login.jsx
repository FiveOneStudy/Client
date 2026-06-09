import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../../api/auth";
import { Button } from "../../components/auth/Button";
import { Input } from "../../components/auth/Input";
import { Password } from "../../components/auth/Password";
import { PopUp } from "../../components/PopUp"; // 추가

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalMessage, setModalMessage] = useState(""); // 추가
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email.trim()) {
      setModalMessage("이메일을 입력해주세요."); // alert 대신
      return;
    }
    if (!password.trim()) {
      setModalMessage("비밀번호를 입력해주세요."); // alert 대신
      return;
    }

    try {
      const response = await login(email, password);
      console.log("로그인 성공:", response.data); // 추가

      if (response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        navigate("/main");
      }
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 400) {
        setModalMessage(error.response.data.message); // "로그인 실패! 이메일이나 비밀번호를 확인해주세요."
      } else {
        setModalMessage("로그인에 실패했습니다.");
      }
      console.error("로그인 실패:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      {modalMessage && (
        <PopUp message={modalMessage} onClose={() => setModalMessage("")} />
      )}

      <div className="flex flex-col w-96 h-[500px]">
        {/* 위 영역 */}
        <div>
          <h1 className="text-2xl font-bold text-center mb-16 tracking-tight font-pretendard">
            로그인
          </h1>

          <div className="flex flex-col gap-4 w-full">
            <Input
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="flex flex-col gap-1">
              <Password
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="text-sm text-gray-600 text-left font-medium font-noto">
                비밀번호를 잊으셨나요?{" "}
                <Link
                  to="/passwordreset"
                  className="text-P400 font-medium no-underline"
                >
                  <b>비밀번호 재설정</b>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 아래 영역 */}
        <div className="flex flex-col w-full mt-28 items-center">
          <Button className="w-full mb-1" onClick={handleLogin}>
            {" "}
            {/* mb-4 → mb-2 */}
            로그인
          </Button>

          <div className="text-sm text-gray-600 text-center font-medium font-noto">
            따잇이 처음이신가요?{" "}
            <Link to="/SignUp" className="text-P400 font-medium">
              <b>회원가입</b>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
