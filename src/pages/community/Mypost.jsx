import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import dropdown from '../../assets/dropdown.svg';
import { PostTableHeader } from '../../components/community/PostTableHeader'; 
import { PostList } from '../../components/community/PostList';
import { UserActionPanel } from '../../components/community/UserActionPanel';
import { fetchMyPosts } from '../../api/post.js';

export function Mypost() { 
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMyPosts()
      .then(json => {
        if (json.success) setPosts(json.data);
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
            <img src={dropdown} className="w-[32px] rotate-180 cursor-pointer" onClick={() => navigate("/community")} />
            <div className="w-[1040px] pl-[4px] text-black text-[32px] font-medium cursor-default">내가 작성한 글</div> 
          </div>
          <PostTableHeader /> 
          <PostList 
            posts={posts} 
            items={10}
            onPostClick={(post) => navigate(`/community/post/${post.postId}?sort=MYPOST`)}
          />
        </div> 
      </div>

      <UserActionPanel />
    </div>
  ); 
}