import { useNavigate } from 'react-router-dom';
import { UserActionPanel } from '../../components/community/UserActionPanel';
import dropdown from '../../assets/dropdown.svg';
import { useState } from 'react';

function PostTableHeader() {
  return(
    <div className="inline-flex h-[36px] px-7 justify-between items-center border-t border-[#68696C]">
      <div className="w-[720px] h-full flex items-center justify-center bg-white">
        <span className="text-black text-20 font-medium">내용</span>
      </div>
      <div className="w-[160px] h-full flex items-center justify-center bg-white">
        <span className="text-black text-20 font-medium">작성일</span>
      </div>
      <div className="w-[104px] h-full flex items-center justify-center bg-white">
        <span className="text-black text-20 font-medium">답글</span>
      </div>
    </div>
  );
}

function PostListItem({ comment, date, reply }) {
  return(
    <div className="inline-flex h-[32px] px-7 justify-between items-center border-t border-[#B4B5B7]">
      <div className="w-[720px] h-full flex items-center  bg-white">
        <span className="text-black text-[14px] font-normal">{comment}</span>
      </div>
      <div className="w-[160px] h-full flex items-center justify-center bg-white">
        <span className="text-black text-[14px] font-normal">{date}</span>
      </div>
      <div className="w-[104px] h-full flex items-center justify-center bg-white">
        <span className="text-black text-[14px] font-normal">{reply}</span>
      </div>
    </div>
  );
}

function PostList({ comments, items }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = items;

  const totalPages = Math.ceil(comments.length / itemsPerPage);

  const currentComments = comments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  }
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const minh = 32 * items;

  return(
    <div>
      <div style={{ minHeight: `${minh}px` }}>
        {currentComments.map((post, index) => (
          <PostListItem 
            key={index}
            comment={post.comment}
            date={post.date}
            reply={post.reply}
          />
        ))}
      </div>

      <div className="w-[1040px] h-[40px] flex justify-center items-center border-t border-[#B4B5B7]">
        <div className='flex items-center gap-[22px]'>
          <img 
            src={dropdown} 
            onClick={handlePrev}
            className="rotate-180"
          />
          <div>{currentPage}</div>
          <img 
            src={dropdown}    
            onClick={handleNext}
          />
        </div>
      </div>
    </div>
  );
}

export function Mycomment() { 
  const comments = [ 
    { comment: "안녕하세용!", date: "2026.03.30", reply: 3 }, 
    { comment: "안녕하세용!", date: "2026.03.30", reply: 3 }, 
    { comment: "안녕하세용!", date: "2026.03.30", reply: 3 }, 
    { comment: "안녕하세용!", date: "2026.03.30", reply: 3 }, 
    { comment: "안녕하세용!", date: "2026.03.30", reply: 3 }, 
    { comment: "안녕하세용!", date: "2026.03.30", reply: 3 }, 
    { comment: "안녕하세용!", date: "2026.03.30", reply: 3 }, 
    { comment: "안녕하세용!", date: "2026.03.30", reply: 3 }, 
    { comment: "안녕하세용!", date: "2026.03.30", reply: 3 }, 
    { comment: "안녕하세용!", date: "2026.03.30", reply: 3 }, 
    { comment: "안녕하세용!", date: "2026.03.30", reply: 3 }, 
    { comment: "안녕하세용!", date: "2026.03.30", reply: 3 }, 
    { comment: "안녕하세용!", date: "2026.03.30", reply: 3 }, 
    { comment: "안녕하세용!", date: "2026.03.30", reply: 3 }, 
    { comment: "안녕하세용!", date: "2026.03.30", reply: 3 }, 
    { comment: "안녕하세용!", date: "2026.03.30", reply: 3 }
  ];

  const navigate = useNavigate();

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