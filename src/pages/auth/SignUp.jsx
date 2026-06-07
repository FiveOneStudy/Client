import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/auth/Button";
import { Input } from "../../components/auth/Input";
import { Password } from "../../components/auth/Password";
import { PopUp } from "../../components/PopUp";

export function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setModalMessage("이메일을 입력해주세요.");
      return;
    }
    if (!password.trim()) {
      setModalMessage("비밀번호를 입력해주세요.");
      return;
    }
    if (!confirmPassword.trim()) {
      setModalMessage("비밀번호 재확인을 입력해주세요.");
      return;
    }
    if (password !== confirmPassword) {
      setModalMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("회원가입 데이터:", { email, password });
    setModalMessage("회원가입이 완료되었습니다!");
  };

  const handleModalClose = () => {
    if (modalMessage === "회원가입이 완료되었습니다!") {
      navigate("/login");
    }
    setModalMessage("");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      {modalMessage && (
        <PopUp message={modalMessage} onClose={handleModalClose} />
      )}

      <div className="flex flex-col w-96 h-[500px]">
        <div>
          <h1 className="text-2xl font-bold text-center mb-16 tracking-tight font-pretendard">
            회원가입
          </h1>

          <div className="flex flex-col gap-4 w-full">
            <Input
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Password
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Password
              placeholder="비밀번호 재확인"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col w-full mt-16 items-center">
          <Button className="w-full mb-4" onClick={handleSubmit}>
            회원가입
          </Button>
        </div>
      </div>
    </div>
  );
}
