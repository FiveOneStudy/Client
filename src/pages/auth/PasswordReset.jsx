import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/auth/Button";
import { Input } from "../../components/auth/Input";
import { AuthCode } from "../../components/auth/AuthCode";
import { Password } from "../../components/auth/Password";
import { PopUp } from "../../components/PopUp";
import { sendAuthCode, resetPassword } from "../../api/auth";

export function PasswordReset() {
  const [email, setEmail] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [timerActive, setTimerActive] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();

  const handleButton = async () => {
    if (step === 1) {
      if (!email.trim()) { setModalMessage("이메일을 입력해주세요."); return; }
      if (sending) return;

      setSending(true);
      try {
        const res = await sendAuthCode(email);
        if (res.data.success) {
          console.log("인증코드 발송 성공:", res.data.data.message);
          setTimerActive(true);
          setStep(2);
        }
      } catch (error) {
        if (error.response?.data?.error?.code === "USER_NOT_FOUND") {
          setModalMessage(error.response.data.error.message);
        } else {
          setModalMessage("인증코드 발송에 실패했습니다.");
        }
        console.error("인증코드 발송 실패:", error);
      } finally {
        setSending(false);
      }
      return;
    }

    if (step === 2) {
      if (!authCode.trim()) { setModalMessage("인증번호를 입력해주세요."); return; }
      if (!newPassword.trim()) { setModalMessage("새 비밀번호를 입력해주세요."); return; }

      try {
        const res = await resetPassword(email, authCode, newPassword);
        if (res.data.success) {
          console.log("비밀번호 재설정 성공:", res.data.data.message);
          setModalMessage("비밀번호가 재설정 되었습니다.");
        }
      } catch (error) {
        if (error.response?.data?.error?.message) {
          setModalMessage(error.response.data.error.message);
        } else {
          setModalMessage("비밀번호 재설정에 실패했습니다.");
        }
        console.error("비밀번호 재설정 실패:", error);
      }
    }
  };

  const handleModalClose = () => {
    if (modalMessage === "비밀번호가 재설정 되었습니다.") {
      navigate("/login");
    }
    setModalMessage("");
  };

  const buttonLabel = step === 1 ? "인증번호 발송" : "완료";

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
              <>
                <AuthCode
                  value={authCode}
                  onChange={(e) => setAuthCode(e.target.value)}
                  active={timerActive}
                  onResend={async () => {
                    try {
                      await sendAuthCode(email);
                      console.log("인증코드 재발송 성공");
                    } catch (error) {
                      console.error("재발송 실패:", error);
                    }
                  }}
                />
                <Password
                  placeholder="새로운 비밀번호"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col w-full mt-auto mb-[72px] items-center">
          <Button className="w-full" onClick={handleButton} disabled={sending}>
            {sending ? "발송 중..." : buttonLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}