import { Button } from "../../components/auth/Button";
import { Input } from "../../components/auth/Input";
import { AuthCode } from "../../components/auth/AuthCode";
import { Password } from "../../components/auth/Password";

export function PasswordReset() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col w-96 h-[500px]">
        
        {/* 입력 */}
        <div>
          <h1 className="text-2xl font-bold text-center mb-16 tracking-tight font-pretendard">
            비밀번호 재설정
          </h1>

          <div className="flex flex-col gap-4 w-full">
            <Password>비밀번호</Password>
            <Password>비밀번호 확인</Password>
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex flex-col w-full mt-[140px] items-center">
          <Button className="w-full">완료</Button>
        </div>

      </div>
    </div>
  );
}