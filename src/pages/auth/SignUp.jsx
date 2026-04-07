import { Input } from "../../components/auth/Input";
import { Password } from "../../components/auth/Password";
import { Button } from "../../components/auth/Button";

export function SignUp() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col w-96">
        <h1 className="text-2xl font-bold text-center mb-16 tracking-tight font-pretendard">
          회원가입
        </h1>

        {/* 입력 전체 */}
        <div className="flex flex-col gap-4 w-full">
          <Input placeholder="이메일" />

          <Password>비밀번호</Password>

          <Password>비밀번호 재확인</Password>
        </div>

        {/* 버튼 영역 */}
        <div className="flex flex-col mt-10 w-full items-center">
          <Button className="w-full mb-4">회원가입</Button>
        </div>
      </div>
    </div>
  );
}
