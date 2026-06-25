import { useNavigate } from 'react-router-dom';
import { UserActionPanel } from '../../components/community/UserActionPanel';
import dropdown from '../../assets/dropdown.svg';
import { useState, useEffect } from 'react';
import { fetchMyComments } from '../../api/post.js';

function PostTableHeader() {
  return(
    <div className="inline-flex h-[36px] px-7 justify-between items-center border-y border-[#68696C]">
      <div className="w-[720px] h-full flex items-center justify-center bg-white">
        <span className="text-black text-20 font-medium">내용</span>
      </div>
      <div className="w-[104px] h-full flex items-center justify-center bg-white">
      </div>
      <div className="w-[160px] h-full flex items-center justify-center bg-white">
        <span className="text-black text-20 font-medium">작성일</span>
      </div>
    </div>
  );
}

function PostListItem({ content, createdAt, onClick }) {
  return(
    <div
      onClick={onClick}
      className="inline-flex h-[32px] px-7 justify-between items-center border-b border-[#B4B5B7] cursor-pointer"
    >
      <div className="w-[720px] h-full flex items-center bg-white">
        <span className="text-black text-[14px] font-normal">{content}</span>
      </div>
      <div className="w-[104px] h-full flex items-center justify-center bg-white">
      </div>
      <div className="w-[160px] h-full flex items-center justify-center bg-white">
        <span className="text-black text-[14px] font-normal">{createdAt}</span>
      </div>
    </div>
  );
}

function PostList({ comments, items }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = items;
  const totalPages = Math.ceil(comments.length / itemsPerPage);

  const currentComments = comments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const minh = 32 * items;

  return(
    <div>
      <div style={{ minHeight: `${minh}px` }}>
        {currentComments.map((comment) => (
          <PostListItem
            key={comment.commentId}
            content={comment.content}
            createdAt={comment.createdAt}
            onClick={() => navigate(`/community/post/${comment.postId}`)}
          />
        ))}
      </div>

      <div className="w-[1040px] h-[40px] flex justify-center items-center border-t border-[#B4B5B7]">
        <div className='flex items-center gap-[22px]'>
          <img src={dropdown} onClick={handlePrev} className="rotate-180" />
          <div>{currentPage}</div>
          <img src={dropdown} onClick={handleNext} />
        </div>
      </div>
    </div>
  );
}

export function Mycomment() { 
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMyComments()
      .then(json => {
        if (json.success) setComments(json.data);
        else setError('데이터를 불러오지 못했습니다.');
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류: {error}</div>;

  return( 
    <div className="min-h-[100%] min-w-[100%] pt-[40px] px-[60px] flex flex-row place-content-between">
      <div className='w-[1040px] flex flex-col gap-[20px] pt-[68px]'>
        <div>
          <div className="w-[780px] flex flex-row gap-1">
            <img src={dropdown} className="w-[32px] rotate-180" onClick={() => navigate("/community")} />
            <div className="w-[1040px] pl-[4px] text-black text-[32px] font-medium">내가 작성한 댓글</div> 
          </div>
          <PostTableHeader /> 
          <PostList comments={comments} items={10}/>
        </div> 
      </div>

      <UserActionPanel />
    </div>
  ); 
}