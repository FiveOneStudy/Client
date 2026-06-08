import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import dropdown from '../../assets/dropdown.svg';
import { PostTableHeader } from '../../components/community/PostTableHeader'; 
import { PostList } from '../../components/community/PostList';
import { UserActionPanel } from '../../components/community/UserActionPanel';
import { fetchPosts } from '../../api/post.js';

export function Recent() { 
  const [recentPosts, setRecentPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts('LATEST').then(json => {
      if (json.success) setRecentPosts(json.data.slice(0, 5));
    });
  }, []);

  return( 
    <div className="min-h-[100%] min-w-[100%] pt-[40px] px-[60px] flex flex-row place-content-between">
      <div className='w-[1040px] flex flex-col gap-[20px] pt-[68px]'>
        <div> 
          <div className="w-[780px] flex flex-row gap-1">
            <img src={dropdown} className="w-[32px] rotate-180" onClick={() => navigate("/community")} />
            <div className="w-[1040px] pl-[4px] text-black text-[32px] font-medium">최신순</div> 
          </div> 
          <PostTableHeader /> 
          <PostList 
            posts={recentPosts} 
            items={10}
            onPostClick={(post) => navigate(`/community/post/${post.postId}?sort=recent`)}
          />
        </div> 
      </div>

      <UserActionPanel />
    </div>
  ); 
}