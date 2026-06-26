import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchPost, fetchComments, fetchPosts } from '../../api/post.js';
import dropdown from '../../assets/dropdown.svg';
import dropdownG from '../../assets/dropdown-G300.svg';
import { WriteUser } from '../../components/community/WriteUser';
import { PostBottom } from '../../components/community/PostBottom.jsx';

const SORT_TO_PATH = {
  LATEST: 'recent',
  POPULAR: 'popularity',
  MYPOST: 'mypost',
};

export function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || 'LATEST';
  const sortPath = SORT_TO_PATH[sort] || 'recent';
  const isMyPost = sort === 'MYPOST';
  const fetchedRef = useRef(null);

  const handleNextPost = useCallback(async () => {
    if (post.nextPostId != null) {
      navigate(`/community/post/${post.nextPostId}?sort=${sort}`);
      return;
    }

    try {
      const json = await fetchPosts(sort);
      if (json.success && json.data.length > 0) {
        const firstPostId = json.data[0].postId;
        navigate(`/community/post/${firstPostId}?sort=${sort}`);
      }
    } catch (err) {
      console.error('첫 게시물 조회 실패:', err);
    }
  }, [post, sort, navigate]);

  useEffect(() => {
    const key = `${id}-${sort}-${isMyPost}`;
    if (fetchedRef.current === key) return;
    fetchedRef.current = key;
  
    const promise = isMyPost ? fetchPost(id) : fetchPost(id, sort);
    promise.then(json => {
      if (json.success) setPost(json.data);
    });
  }, [id, sort, isMyPost]);

  const loadComments = useCallback(() => {
    fetchComments(id).then(json => {
      if (json.success) setComments(json.data);
    });
  }, [id]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  if (!post) return <div>로딩중...</div>;

  return (
    <div className='min-w-[100%] pt-[80px] flex justify-center items-center'>
      <div className='w-[720px]'>
        <div className="flex flex-row w-full justify-between items-start">
          <div>
            <div className="flex flex-row cursor-pointer" onClick={() => navigate(`/community/${sortPath}`)}>
              <div className="text-[14px]">
                {sort === 'POPULAR' ? '인기순' : sort === 'MYPOST' ? '내가 작성한 글' : '최신순'}
              </div>
              <img src={dropdown} className='w-[14px]'/>
            </div>
            <div className="w-full border-none outline-none text-[36px] font-medium">{post.title}</div>
          </div>

          <div className='flex flex-row'>
            {!isMyPost && (
              <div
                className='flex flex-row gap-1 px-[10px] py-[4px] rounded-[14px] border border-G300 cursor-pointer'
                onClick={handleNextPost}
              >
                <img src={dropdownG} className='w-[14px] rotate-90'/>
                <div className="text-[14px] text-G300 font-normal cursor-pointer">다음글</div>
              </div>
            )}
            <div
              className='flex flex-row gap-1 ml-[12px] px-[14px] py-[4px] rounded-[14px] border border-G300 cursor-pointer'
              onClick={() => navigate(`/community/${sortPath}`)}
            >
              <div className="text-[14px] text-G300 font-normal">목록</div>
            </div>
          </div>
        </div>

        <WriteUser
          writer={post.writer}
          createdAt={post.createdAt}
          viewCount={post.viewCount}
          userId={post.userId}
        />
        <div className='w-full h-[300px] text-[16px] font-light whitespace-pre-wrap'>{post.content}</div>

        <PostBottom
          onDelete={() => navigate('/community')}
          comments={comments}
          onCommentAdded={loadComments}
          canDelete={post.canDelete}
          postWriter={post.writer}
        />
      </div>
    </div>
  );
}