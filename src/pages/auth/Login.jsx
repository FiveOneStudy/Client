import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../../api/auth";
import axios from "axios";
import { Button } from "../../components/auth/Button";
import { Input } from "../../components/auth/Input";
import { Password } from "../../components/auth/Password";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
const handleLogin = async () => {
  
    try {
      const response = await login(email, password);
      localStorage.setItem("accessToken", response.data.accessToken);
      console.log("로그인 성공:", {email, password});
      navigate("/main"); // 로그인 성공 시 이동
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
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

            <div className="flex flex-col gap-2">
              <Password
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="text-sm text-gray-600 text-left font-medium font-noto">
                비밀번호를 잊으셨나요?{" "}
                <Link
                  to="/FindPassword"
                  className="text-P400 font-medium no-underline"
                >
                  <b>비밀번호 찾기</b>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 아래 영역 */}
        <div className="flex flex-col w-full mt-28 items-center">
          <Button className="w-full mb-4" onClick={handleLogin}>
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