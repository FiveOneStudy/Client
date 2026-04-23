import dropdown from '../../assets/dropdown.svg';
import { useState } from 'react';
import { PostListItem } from './PostListItem';

export function PostList({ posts, items }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = items;

  const totalPages = Math.ceil(posts.length / itemsPerPage);

  const currentPosts = posts.slice(
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
        {currentPosts.map((post, index) => (
          <PostListItem 
            key={index}
            title={post.title}
            date={post.date}
            views={post.views}
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