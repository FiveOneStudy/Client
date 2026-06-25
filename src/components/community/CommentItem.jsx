import { useState } from "react"; // useRef, useEffect 제거
import { useParams } from 'react-router-dom';
import profile from '../../assets/profile.svg'
import { deleteComment } from '../../api/post.js'; // settings import 제거

export function CommentItem({ comment, onReply, onCommentDeleted, isFirst }) {
  const { id } = useParams();
  const [showReply, setShowReply] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReplySubmit = () => {
    if (!replyContent.trim() || isSubmitting) return;
    setIsSubmitting(true);

    onReply({ content: replyContent, parentId: comment.commentId })
      .then(() => {
        setReplyContent('');
        setShowReply(false);
      })
      .finally(() => setIsSubmitting(false));
  };

  const handleReplyKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleReplySubmit();
    }
  };

  const handleDelete = (commentId) => {
    deleteComment(id, commentId).then(json => {
      if (json.success) onCommentDeleted();
    });
  };

  return (
    <div className='flex flex-col gap-[12px]'>
      <div className={`flex flex-row items-start justify-between ${!isFirst ? 'pt-[12px] border-t border-G300' : ''}`}>
        <div className='flex flex-row items-start'>
          <img src={profile} className="w-[32px] mr-3" />
          <div>
            <div className='text-[14px] font-medium'>{comment.writer}</div>
            <div className='text-[14px] font-light whitespace-pre-wrap'>{comment.content}</div>
            <div className="flex flex-row">
              <div className="text-[11px] font-light text-G500 mr-2">{comment.createdAt}</div>
              <button 
                onClick={() => setShowReply(prev => !prev)}
                className='text-[11px] font-light text-G500'
              >
                답글쓰기
              </button>
            </div>
          </div>
        </div>

        {comment.canDelete && (
          <button 
            onClick={() => handleDelete(comment.commentId)}
            className='text-[11px] font-light text-G500'
          >
            삭제
          </button>
        )}
      </div>

      {comment.children?.map((child) => (
        <div key={child.commentId} className='ml-[30px] flex flex-row items-start justify-between'>
          <div className='flex flex-row items-start'>
            <img src={profile} className="w-[32px] mr-3" />
            <div>
              <div className='text-[14px] font-medium'>{child.writer}</div>
              <div className='text-[14px] font-light whitespace-pre-wrap'>{child.content}</div>
              <div className="flex flex-row">
                <div className="text-[11px] font-light text-G500 mr-2">{child.createdAt}</div>
              </div>
            </div>
          </div>

          {child.canDelete && (
            <button 
              onClick={() => handleDelete(child.commentId)}
              className='text-[11px] font-light text-G500'
            >
              삭제
            </button>
          )}
        </div>
      ))}

      {showReply && (
        <div className='ml-[30px] flex flex-row gap-[8px] items-end'>
          <textarea
            placeholder="답글 작성하기"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            onKeyDown={handleReplyKeyDown}
            rows={1}
            className="flex-1 border-b border-G300 outline-none text-[14px] py-[4px] resize-none"
          />
          <button
            onClick={handleReplySubmit}
            disabled={isSubmitting} 
            className='px-[12px] py-[4px] bg-P400 text-white rounded-[16px] text-[12px] disabled:opacity-50'
          >
            {isSubmitting ? '올리는 중...' : '올리기'}
          </button>
        </div>
      )}
    </div>
  );
}