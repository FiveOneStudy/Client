import { useState } from 'react';
import { BASE_URL, getToken } from '../../api/index';

const CERT_OPTIONS = [
  { name: '정보처리산업기사', issuer: '한국산업인력공단' },
  { name: '프로그래밍기능사', issuer: '한국산업인력공단' },
  { name: '한국사능력검정 1급', issuer: '국사편찬위원회' },
  { name: '한국사능력검정 2급', issuer: '국사편찬위원회' },
  { name: '한국사능력검정 3급', issuer: '국사편찬위원회' },
  { name: '컴퓨터활용능력 1급', issuer: '대한상공회의소' },
  { name: '컴퓨터활용능력 2급', issuer: '대한상공회의소' },
  { name: 'ADsP', issuer: '한국데이터산업진흥원' },
  { name: 'SQLD', issuer: '한국데이터산업진흥원' },
];

export function AddCertificateModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: '',
    issuer: '',
    acquiredDate: '',
    verifiedId: '',
  });
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSelectCert = (e) => {
    const selected = CERT_OPTIONS.find((c) => c.name === e.target.value);
    if (selected) {
      setForm((prev) => ({
        ...prev,
        name: selected.name,
        issuer: selected.issuer,
      }));
    } else {
      setForm((prev) => ({ ...prev, name: '', issuer: '' }));
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.issuer || !form.acquiredDate || !form.verifiedId) {
      setError('모든 항목을 입력해주세요.');
      return;
    }
    if (!pdfFile) {
      setError('자격증 PDF 파일을 첨부해주세요.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      const jsonData = JSON.stringify({
        name: form.name,
        issuer: form.issuer,
        acquiredDate: form.acquiredDate,
        verifiedId: form.verifiedId,
      });
      formData.append('data', jsonData);
      formData.append('file', pdfFile);

      const res = await fetch(`${BASE_URL}/mypage/certifications`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${getToken()}` },
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        onSuccess();
        setSuccess(true);
      } else {
        setError(data.error?.message || '등록에 실패했습니다.');
      }
    } catch (err) {
      setError('서버 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white rounded-[20px] w-[420px] shadow-lg p-8 flex flex-col items-center gap-4 text-center">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-2xl">
            ✅
          </div>
          <div className="text-[18px] font-bold">등록 완료!</div>
          <p className="text-[14px] text-gray-500 leading-relaxed">
            자격증 등록이 완료되었습니다.
            <br />
            관리자가 PDF를 검토한 후 승인하면
            <br />
            마이페이지에서 배지를 확인할 수 있어요.
          </p>
          <button
            onClick={onClose}
            className="mt-2 px-6 py-2 text-[14px] text-white bg-gray-800 rounded-[8px] hover:bg-gray-700"
          >
            확인
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-[20px] w-[480px] shadow-lg p-6 flex flex-col gap-4">
        <div className="text-[20px] font-bold">자격증 등록</div>

        {/* 자격증 선택 */}
        <div className="flex flex-col gap-1">
          <label className="text-[13px] text-gray-500">자격증</label>
          <select
            value={form.name}
            onChange={handleSelectCert}
            className="border border-gray-300 rounded-[8px] px-3 py-2 text-[14px] focus:outline-none focus:border-gray-500"
          >
            <option value="" disabled>
              자격증을 선택하세요
            </option>
            {CERT_OPTIONS.map((cert) => (
              <option key={cert.name} value={cert.name}>
                {cert.name}
              </option>
            ))}
          </select>
        </div>

        {/* 발급기관 (자동 입력) */}
        <div className="flex flex-col gap-1">
          <label className="text-[13px] text-gray-500">발급기관</label>
          <input
            type="text"
            value={form.issuer}
            readOnly
            placeholder="자격증 선택 시 자동 입력"
            className="border border-gray-200 rounded-[8px] px-3 py-2 text-[14px] bg-gray-50 text-gray-400"
          />
        </div>

        {/* 취득일 */}
        <div className="flex flex-col gap-1">
          <label className="text-[13px] text-gray-500">취득일</label>
          <input
            type="date"
            name="acquiredDate"
            value={form.acquiredDate}
            onChange={handleChange}
            className="border border-gray-300 rounded-[8px] px-3 py-2 text-[14px] focus:outline-none focus:border-gray-500"
          />
        </div>

        {/* 자격증 번호 */}
        <div className="flex flex-col gap-1">
          <label className="text-[13px] text-gray-500">자격증 번호</label>
          <input
            type="text"
            name="verifiedId"
            value={form.verifiedId}
            onChange={handleChange}
            placeholder="예) 12345"
            className="border border-gray-300 rounded-[8px] px-3 py-2 text-[14px] focus:outline-none focus:border-gray-500"
          />
        </div>

        {/* PDF 첨부 */}
        <div className="flex flex-col gap-1">
          <label className="text-[13px] text-gray-500">자격증 PDF</label>
          <label className="flex items-center gap-3 border border-gray-300 rounded-[8px] px-3 py-2 cursor-pointer hover:bg-gray-50">
            <span className="text-[13px] text-gray-400 border border-gray-300 rounded-[6px] px-2 py-0.5 whitespace-nowrap">
              파일 선택
            </span>
            <span className="text-[13px] text-gray-500 truncate">
              {pdfFile ? pdfFile.name : 'PDF 파일을 첨부하세요'}
            </span>
            <input
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file && file.size > 5 * 1024 * 1024) {
                  setError('파일 크기는 5MB 이하여야 합니다.');
                  return;
                }
                setError('');
                setPdfFile(file);
              }}
            />
          </label>
        </div>

        {error && <p className="text-[13px] text-red-500">{error}</p>}

        {/* 버튼 */}
        <div className="flex gap-2 justify-end mt-1">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[14px] text-gray-500 border border-gray-300 rounded-[8px] hover:bg-gray-100"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 text-[14px] text-white bg-gray-800 rounded-[8px] hover:bg-gray-700 disabled:opacity-50"
          >
            {loading ? '등록 중...' : '등록하기'}
          </button>
        </div>
      </div>
    </div>
  );
}
