import { Button } from "../../components/auth/Button";
import { Input } from "../../components/auth/Input";
import { Password } from "../../components/auth/Password";

export function Login() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen gap-6">
        <Input placeholder="이메일" />
        <Password />
        <Button>로그인</Button>
      </div>
    </>
  );
}
