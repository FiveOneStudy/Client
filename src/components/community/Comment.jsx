import { useState } from "react";
import { useParams } from 'react-router-dom';
import { createComment } from '../../api/post.js';
import { CommentItem } from './CommentItem.jsx';

export function Comment({ comments, onCommentAdded }) {
  const { id } = useParams();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!content.trim() || isSubmitting) return;
    setIsSubmitting(true);

    createComment(id, { content, parentId: null })
      .then(json => {
        if (json.success) {
          setContent('');
          onCommentAdded();
        }
      })
      .finally(() => setIsSubmitting(false));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleReply = (body) => {
    return createComment(id, body).then(json => {
      if (json.success) onCommentAdded();
    });
  };

  const firstCommentId = comments.length > 0 
  ? Math.min(...comments.map(c => c.commentId)) 
  : null;

  return(
    <div>
      <div className='mt-[8px] flex flex-col gap-[12px] pl-[12px]'>
        {comments.length === 0 ? (
          <div className='text-[14px] text-gray-400 cursor-default'>댓글이 없습니다.</div>
        ) : (
          comments.map((comment) => (
            <CommentItem 
              key={comment.commentId} 
              comment={comment} 
              onReply={handleReply}
              onCommentDeleted={onCommentAdded}
              isFirst={comment.commentId === firstCommentId}
            />
          ))
        )}
      </div>

      <div className='flex flex-row gap-[8px] items-end mt-[12px]'>
        <textarea
          placeholder="댓글 작성하기"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          className="flex-1 border-b border-G300 outline-none text-[14px] py-[4px] resize-none"
        />
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className='px-[12px] py-[4px] bg-P400 text-white rounded-[16px] text-[14px] disabled:opacity-50'
        >
          {isSubmitting ? '올리는 중...' : '올리기'}
        </button>
      </div>
    </div>
  );
}