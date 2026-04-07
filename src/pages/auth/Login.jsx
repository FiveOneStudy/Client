import { Link } from "react-router-dom";
import { Button } from "../../components/auth/Button";
import { Input } from "../../components/auth/Input";
import { Password } from "../../components/auth/Password";

export function Login() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col w-96">
        <h1 className="text-2xl font-bold text-center mb-16 tracking-tight font-pretendard">로그인</h1>

        {/* 입력 전체 */}
        <div className="flex flex-col gap-4 w-full">
          <Input placeholder="이메일" />

          {/* 비밀번호 + 찾기 묶기 */}
          <div className="flex flex-col gap-2">
            <Password>비밀번호</Password>

            <div className="text-sm text-gray-600 text-left font-medium font-noto">
              비밀번호를 잊으셨나요?{" "}
              <a
                href="#"
                className="text-P400 font-medium no-underline hover:no-underline"
              >
                <b>비밀번호 찾기</b>
              </a>
            </div>
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="flex flex-col mt-20 w-full items-center">
          <Button className="w-full mb-4">로그인</Button>

          <div className="text-sm mt-1 text-gray-600 text-center font-medium font-noto">
            따잇이 처음이신가요?{" "}
            <Link to="/SignUp"
              className="text-P400 font-medium no-underline hover:no-underline"
            >
              <b>회원가입</b>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}