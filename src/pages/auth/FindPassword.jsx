import { Button } from "../../components/auth/Button";
import { Input } from "../../components/auth/Input";
import { AuthCode } from "../../components/auth/AuthCode";

export function FindPassword() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col w-96 h-[500px]">
        
        {/* 위 영역 */}
        <div>
          <h1 className="text-2xl font-bold text-center mb-16 tracking-tight font-pretendard">
            비밀번호 찾기
          </h1>

          <div className="flex flex-col gap-4 w-full">
            <Input placeholder="이메일" />
            <AuthCode />
          </div>
        </div>

        {/* 아래 영역 */}
        <div className="flex flex-col w-full mt-[140px] items-center">
          <Button className="w-full">비밀번호 찾기</Button>
        </div>

      </div>
    </div>
  );
}