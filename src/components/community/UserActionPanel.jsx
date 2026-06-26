import profile from '../../assets/profile.svg';
import { useNavigate } from 'react-router-dom';
import { useMyPage, getProfile } from '../../api/post.js';

function ActionButton({ children, onClick }) {
  return (
    <button onClick={onClick} className="bg-[#FFFFFF] rounded-[4px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] text-center text-[20x] font-normal py-[4px] w-[200px]">
      {children}
    </button>
  );
}

export function UserActionPanel() {
  const navigate = useNavigate();
  const { myPageData, loading, error } = useMyPage();

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류: {error}</div>;
  if (!myPageData) return null;

  const imgSrc = myPageData.profileImageUrl ? getProfile(myPageData.profileImageUrl) : profile;

  return(
    <div className='mt-[80px] ml-[44px] pt-[32px] pb-[48px] flex flex-col justify-between items-center w-[300px] h-[432px] bg-[#F8F8F8] border-r border-[#CDCDCF] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'>
      <img 
        src={imgSrc} 
        className="h-[160px] rounded-full object-cover" 
        onError={(e) => { e.target.onerror = null; e.target.src = profile; }}
      />
      <div className='text-center justify-start text-[30px] font-semibold cursor-default'>{myPageData.nickname}</div>
      <ActionButton children={"글 작성하기"} onClick={() => navigate('/community/write')} />
      <ActionButton children={"내가 작성한 글"} onClick={() => navigate('/community/mypost')} />
      <ActionButton children={"내가 작성한 댓글"} onClick={() => navigate('/community/mycomment')} />
    </div>
  );
}