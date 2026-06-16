import { useState, useEffect, useRef } from 'react';
import profileIcon from '../assets/profile.svg';
import { BASE_URL, getToken } from '../api/index';
import { CertificateList } from '../components/my/CertificateList';
import { AddCertificateModal } from '../components/my/AddCertificateModal';
import { DeleteConfirmModal } from '../components/my/DeleteConfirmModal';

export function My() {
  const [openMenu, setOpenMenu] = useState(null);
  const [nickname, setNickname] = useState('');
  const [profileImageSrc, setProfileImageSrc] = useState(profileIcon);
  const [profileImagePath, setProfileImagePath] = useState(null);
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [imageError, setImageError] = useState('');

  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchMyInfo();
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
      if (!res.ok) throw new Error('이미지 로드 실패');
      const blob = await res.blob();
      setProfileImageSrc((prev) => {
        if (prev.startsWith('blob:')) URL.revokeObjectURL(prev);
        return URL.createObjectURL(blob);
      });
    } catch (err) {
      console.error('프로필 이미지 로드 실패:', err);
      setProfileImageSrc(profileIcon);
    }
  };

  const fetchMyInfo = async () => {
    try {
      const res = await fetch(`${BASE_URL}/mypage`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const data = await res.json();
      if (data.success) {
        setNickname(data.data.nickname);
        setProfileImagePath(data.data.profileImageUrl);
        fetchProfileImage(data.data.profileImageUrl);
        setCertifications(data.data.certifications);
      }
    } catch (err) {
      console.error('내 정보 조회 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/mypage/certifications/${deleteTargetId}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${getToken()}` },
        },
      );
      const data = await res.json();
      if (data.success) {
        setCertifications((prev) =>
          prev.filter((c) => c.id !== deleteTargetId),
        );
        setOpenMenu(null);
      }
    } catch (err) {
      console.error('자격증 삭제 실패:', err);
    } finally {
      setDeleteTargetId(null);
    }
  };

  const handleMenuClick = (id) => {
    setOpenMenu((prev) => (prev === id ? null : id));
  };

  const handleProfileImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setImageError('파일 크기는 5MB 이하여야 합니다.');
      return;
    }

    setImageError('');

    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch(`${BASE_URL}/mypage/profile-image`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${getToken()}` },
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        fetchProfileImage(profileImagePath);
      } else {
        setImageError(data.error?.message || '이미지 변경에 실패했습니다.');
      }
    } catch (err) {
      console.error('이미지 변경 에러:', err);
      setImageError('서버 오류가 발생했습니다.');
    }
  };

  if (loading) {
    return (
      <div className="w-full h-[calc(100vh-80px)] bg-[#FFEEEE] flex items-center justify-center">
        <div className="text-gray-400 text-sm">불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-[calc(100vh-80px)] bg-[#FFEEEE] flex items-center justify-center overflow-hidden">
      <div className="flex flex-col w-[900px] h-[440px] bg-white rounded-[20px] shadow-[4px_4px_4px_rgba(0,0,0,0.25)]">
        {/* 헤더 */}
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <div className="text-[26px] font-bold">MY PAGE</div>
          <button
            onClick={() => setShowModal(true)}
            className="border-2 border-gray-400 px-2 py-0.5 rounded-[10px] text-[16px]"
          >
            + 추가
          </button>
        </div>

        {/* 콘텐츠 */}
        <div className="flex flex-1 overflow-hidden">
          {/* 왼쪽 프로필 */}
          <div className="w-[32%] border-r flex flex-col items-center justify-center bg-[#F8F8F8] rounded-bl-[20px]">
            <div
              className="relative cursor-pointer group"
              onClick={handleProfileImageClick}
            >
              <img
                src={profileImageSrc}
                alt="profile"
                className="h-[156px] w-[156px] object-cover rounded-full"
                onError={(e) => {
                  e.target.src = profileIcon;
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 rounded-full transition-opacity text-white text-[13px]">
                수정
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleProfileImageChange}
              />
            </div>

            <div className="mt-3 text-[26px] font-semibold">
              {nickname || '이름'}
            </div>

            {imageError && (
              <p className="mt-1 text-[12px] text-red-500">{imageError}</p>
            )}
          </div>

          {/* 오른쪽 자격증 목록 */}
          <CertificateList
            certifications={certifications}
            openMenu={openMenu}
            onMenuClick={handleMenuClick}
            onDelete={(id) => setDeleteTargetId(id)}
          />
        </div>
      </div>

      {/* 자격증 등록 모달 */}
      {showModal && (
        <AddCertificateModal
          onClose={() => setShowModal(false)}
          onSuccess={fetchMyInfo}
        />
      )}

      {/* 삭제 확인 모달 */}
      {deleteTargetId && (
        <DeleteConfirmModal
          onConfirm={handleDelete}
          onCancel={() => setDeleteTargetId(null)}
        />
      )}
    </div>
  );
}
