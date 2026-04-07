import { Link } from "react-router-dom";
import { Button } from "../../components/auth/Button";
import { Input } from "../../components/auth/Input";
import { AuthCode } from "../../components/auth/AuthCode";

export function FindePassword() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col w-96">
        <h1 className="text-2xl font-bold text-center mb-16 tracking-tight font-pretendard">
          비밀번호 찾기
        </h1>

        {/* 입력 전체 */}
        <div className="flex flex-col gap-4 w-full">
          <Input placeholder="이메일" />

            <AuthCode />
        </div>

        {/* 버튼 영역 */}
        <div className="flex flex-col mt-20 w-full items-center">
          <Button className="w-full mb-4">비밀번호 찾기</Button>

        </div>
      </div>
    </div>
  );
}
