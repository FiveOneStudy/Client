import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { PostTableHeader } from '../../components/community/PostTableHeader'; 
import { PostList } from '../../components/community/PostList';
import { UserActionPanel } from '../../components/community/UserActionPanel';
import { fetchPosts } from '../../api/post.js';

export function Community() { 
  const [popularPosts, setPopularPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts('POPULAR').then(json => {
      if (json.success) setPopularPosts(json.data.slice(0, 5));
    });
    fetchPosts('LATEST').then(json => {
      if (json.success) setRecentPosts(json.data.slice(0, 5));
    });
  }, []);

  return( 
    <div className="min-h-[100%] min-w-[100%] pt-[40px] px-[60px] flex flex-row place-content-between">
      <div className='w-[1040px] flex flex-col gap-[20px]'>
        <div> 
          <div className="w-[1040px] pl-[20px] text-black text-[32px] font-medium" onClick={() => navigate('/community/popularity')}>인기순</div> 
          <PostTableHeader /> 
          <PostList 
            posts={popularPosts} 
            items={5} 
            onPostClick={(post) => navigate(`/community/post/${post.postId}?sort=popularity`)}
          />
        </div> 

        <div>
          <div className="w-[1040px] pl-[20px] text-black text-[32px] font-medium" onClick={() => navigate('/community/recent')}>최신순</div> 
          <PostTableHeader /> 
          <PostList 
            posts={recentPosts} 
            items={5} 
            onPostClick={(post) => navigate(`/community/post/${post.postId}?sort=recent`)}
          />
        </div>
      </div>

      <UserActionPanel />
    </div>
  ); 
}