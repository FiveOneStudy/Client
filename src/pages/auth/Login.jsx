import { Button } from "../../components/auth/Button";
import { Input } from "../../components/auth/Input";

export function Login() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen gap-6">
        <Input placeholder="이메일" />
        <Input placeholder="비밀번호" />
        <Button>로그인</Button>
      </div>
    </>
  );
}
