import { useState, useEffect } from 'react';
import profileIcon from '../assets/profile.svg';
import { BASE_URL, getToken } from '../api/index';

export default function Certificate() {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profileImageSrc, setProfileImageSrc] = useState(profileIcon);

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchProfileImage = async (path) => {
    if (!path) {
      setProfileImageSrc(profileIcon);
      return;
    }
    try {
      const res = await fetch(`${BASE_URL}${path}?t=${Date.now()}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
        cache: 'no-store',
      });
      if (!res.ok) throw new Error();
      const blob = await res.blob();
      setProfileImageSrc((prev) => {
        if (prev.startsWith('blob:')) URL.revokeObjectURL(prev);
        return URL.createObjectURL(blob);
      });
    } catch {
      setProfileImageSrc(profileIcon);
    }
  };

  const fetchCertifications = async () => {
    try {
      const res = await fetch(`${BASE_URL}/mypage`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const data = await res.json();
      if (data.success) {
        setCertifications(data.data.certifications);
        // ✅ 프로필 이미지 경로 받아서 fetch
        fetchProfileImage(data.data.profileImageUrl);
      }
    } catch (err) {
      console.error('자격증 조회 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[260px] h-full relative flex flex-col items-center pt-6">
      <div className="absolute -left-4 top-4 bottom-[-185px] w-[2px] bg-P300" />

      {/* ✅ 프로필 이미지 적용 */}
      <img
        src={profileImageSrc}
        alt="profile"
        className="w-[90px] h-[90px] rounded-full object-cover mb-4"
        onError={(e) => { e.target.src = profileIcon; }}
      />

      <div className="text-[16px] font-bold mb-6">MY CERTIFICATE</div>

      <div className="w-full flex flex-col gap-4 px-4">
        {loading ? (
          <div className="text-sm text-gray-400 text-center">불러오는 중...</div>
        ) : certifications.length === 0 ? (
          <div className="text-sm text-gray-400 text-center">등록된 자격증이 없습니다.</div>
        ) : (
          certifications.map((cert) => (
            <div key={cert.id}
              className="relative bg-white px-4 py-2 rounded-md shadow-[0_2px_6px_rgba(0,0,0,0.2)] text-sm">
              <div className="absolute left-0 top-0 h-full w-[3px] bg-[#B88383] rounded-l-md" />
              {cert.name}
            </div>
          ))
        )}
      </div>
    </div>
  );
}