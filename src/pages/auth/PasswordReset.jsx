import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/auth/Button";
import { Input } from "../../components/auth/Input";
import { AuthCode } from "../../components/auth/AuthCode";
import { Password } from "../../components/auth/Password";
import { PopUp } from "../../components/PopUp";

const MOCK_EMAIL = "test@test.com";
const MOCK_CODE = "123456";

export function PasswordReset() {
  const [email, setEmail] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [step, setStep] = useState(1); // 1: 이메일, 2: 인증번호, 3: 새 비밀번호
  const [timerActive, setTimerActive] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  const handleButton = () => {
    if (step === 1) {
      if (!email.trim()) { setModalMessage("이메일을 입력해주세요."); return; }
      if (email !== MOCK_EMAIL) { setModalMessage("등록되지 않은 이메일입니다."); return; }
      console.log("인증코드 발송 (Mock):", MOCK_CODE);
      setTimerActive(true);
      setStep(2);
      return;
    }

    if (step === 2) {
      if (!authCode.trim()) { setModalMessage("인증번호를 입력해주세요."); return; }
      if (authCode !== MOCK_CODE) { setModalMessage("인증번호가 올바르지 않습니다."); return; }
      setStep(3);
      return;
    }

    if (step === 3) {
      if (!newPassword.trim()) { setModalMessage("새 비밀번호를 입력해주세요."); return; }
      console.log("비밀번호 재설정 (Mock):", newPassword);
      setModalMessage("비밀번호가 재설정 되었습니다.");
    }
  };

  const handleModalClose = () => {
    if (modalMessage === "비밀번호가 재설정 되었습니다.") {
      navigate("/login");
    }
    setModalMessage("");
  };

  const buttonLabel = step === 1 ? "인증번호 발송" : step === 2 ? "인증번호 확인" : "완료";

  return (
    <div className="flex items-center justify-center h-screen">
      {modalMessage && (
        <PopUp message={modalMessage} onClose={handleModalClose} />
      )}

      <div className="flex flex-col w-96 h-[500px]">
        <div>
          <h1 className="text-2xl font-bold text-center mb-16 tracking-tight font-pretendard">
            비밀번호 재설정
          </h1>

          <div className="flex flex-col gap-4 w-full">
            <Input
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {step >= 2 && (
              <AuthCode
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value)}
                active={timerActive}
                onResend={() => console.log("인증코드 재발송 (Mock):", MOCK_CODE)}
              />
            )}

            {step >= 3 && (
              <>
                <Password
                  placeholder="새로운 비밀번호"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col w-full mt-auto mb-[68px] items-center">
          <Button className="w-full" onClick={handleButton}>
            {buttonLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}