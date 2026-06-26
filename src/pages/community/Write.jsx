import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import dropdown from '../../assets/dropdown.svg';
import { WriteUser } from '../../components/community/WriteUser';
import { createPost, useMyPage } from '../../api/post.js';

export function Write() {
  const navigate = useNavigate();
  const { myPageData } = useMyPage();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).replaceAll('. ', '.').replace('.', '.');

  const handleSubmit = () => {
    if (!title.trim()) {
      alert('제목을 입력해주세요.');
      titleRef.current?.focus();
      return;
    }
    if (!content.trim()) {
      alert('내용을 입력해주세요.');
      contentRef.current?.focus();
      return;
    }
    if (isSubmitting) return;

    setIsSubmitting(true);

    createPost({ title, content })
      .then(json => {
        console.log('createPost 응답:', json);
        if (json.success) {
          navigate(`/community/post/${json.data.postId}`);
        } else {
          alert('게시글 등록에 실패했습니다.');
        }
      })
      .finally(() => setIsSubmitting(false));
  };

  return(
    <div className="flex flex-col justify-center items-center pt-[32px] gap-[12px]">
      <div className="w-[780px] flex flex-row gap-1 cursor-pointer" onClick={() => navigate("/community")}>
        <img src={dropdown} className="rotate-180" />
        <div className="text-[14px]">되돌아가기</div>
      </div>
      <div className="w-[780px] h-[560px] flex flex-col px-[34px] pt-[36px] pb-[16px] rounded-xl shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] border border-P300">
        <input 
          ref={titleRef}
          type="text" 
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border-none outline-none text-[36px] font-medium"
        />
        <WriteUser 
          writer={myPageData?.nickname || ''} 
          createdAt={today} 
          viewCount={'write'} 
          profileImageUrl={myPageData?.profileImageUrl} 
        />
        <textarea 
          ref={contentRef}
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-[324px] border-none outline-none text-[18px] font-light resize-none"
        />
        <button 
          onClick={handleSubmit}
          disabled={isSubmitting}
          className='w-[92px] h-[44px] bg-P400 text-White rounded-[16px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] self-end mt-auto disabled:opacity-50'
        >
          {isSubmitting ? '올리는 중...' : '올리기'}
        </button>
      </div>
    </div>
  );
}