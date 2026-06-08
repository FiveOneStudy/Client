import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchPost } from '../../api/post.js';
import dropdown from '../../assets/dropdown.svg';
import dropdownG from '../../assets/dropdown-G300.svg';
import { WriteUser } from '../../components/community/WriteUser';
import { Comment } from '../../components/community/Comment.jsx';

export function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');

  useEffect(() => {
    fetchPost(id).then(json => {
      if (json.success) setPost(json.data);
    });
  }, [id]);

  if (!post) return <div>로딩중...</div>;

  return(
    <div className='min-w-[100%] pt-[80px] flex justify-center items-center'>
      <div className='w-[720px]'>
        <div className="flex flex-row w-full justify-between items-start"> 
          <div>
            <div className="flex flex-row" onClick={() => navigate(`/community/${sort}`)}>
            <div className="text-[14px]">{sort === 'popularity' ? '인기순' : '최신순'}</div>
              <img src={dropdown} className='w-[14px]'/>
            </div>
            <div className="w-full border-none outline-none text-[36px] font-medium">{post.title}</div>
          </div>

          <div className='flex flex-row'>
            <div className='flex flex-row gap-1 px-[10px] py-[4px] rounded-[14px] border border-G300'>
              <img src={dropdownG} className='w-[14px] rotate-90'/>
              <div className="text-[14px] text-G300 font-normal">다음글</div>
            </div>
        
            <div 
              className='flex flex-row gap-1 ml-[12px] px-[14px] py-[4px] rounded-[14px] border border-G300' 
              onClick={() => navigate("/community/popularity")}
              >
              <div className="text-[14px] text-G300 font-normal">목록</div>
            </div>
          </div>
        </div>
        
        <WriteUser writer={post.writer} createdAt={post.createdAt} viewCount={post.viewCount} />

        <div className='w-full h-[300px] text-[16px] font-light '>{post.content}</div>

        <Comment />
      </div>
    </div>
  );
}