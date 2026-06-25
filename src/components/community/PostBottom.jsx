import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import dropdownP from '../../assets/dropdown-P400.svg';
import settings from '../../assets/settings.svg';
import { deletePost } from '../../api/post.js';
import { Comment } from './Comment.jsx';


export function PostBottom({ onDelete, comments = [], onCommentAdded, canDelete }) {
  const { id } = useParams();
  const [showMenu, setShowMenu] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDelete = () => {
    deletePost(id).then(json => {
      if (json.success) onDelete();
    });
  };

  return(
    <div className='flex flex-col py-[12px] border border-y-G300 border-x-0'>
      <div className='flex flex-row gap-3 mb-2'>
        <div 
          className='w-fit flex flex-row gap-1 px-[11px] py-[2px] rounded-[48px] border border-P400 cursor-pointer'
          onClick={() => setShowComments(prev => !prev)}
        >
          <div className="text-[14px] text-P400 font-normal">댓글보기</div>
          <img 
            src={dropdownP} 
            className={`w-[12px] transition-transform duration-200 ${showComments ? 'rotate-90' : '-rotate-90'}`}
          />
        </div>

        {canDelete && (
        <div className='relative' ref={menuRef}>
          {showMenu && (
            <div className='absolute top-[-40px] left-0 bg-white rounded-[4px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]'>
              <button 
                onClick={handleDelete}
                className='px-[16px] py-[8px] text-[14px] w-[100px]'
              >
                삭제하기
              </button>
            </div>
          )}
          <img 
            src={settings} 
            className='cursor-pointer'
            onClick={() => setShowMenu(prev => !prev)}
          />
        </div>
      )}
      </div>

      {showComments && (
        <Comment comments={comments} onCommentAdded={onCommentAdded} />
      )}
    </div>
  );
}