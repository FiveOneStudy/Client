import { useState, useEffect } from 'react';
import profile from '../../assets/profile.svg';
import { fetchProfileImageBlob } from '../../api/post.js';

export function WriteUser({ writer, createdAt, viewCount, userId, profileImageUrl }) {
  const [imgSrc, setImgSrc] = useState(profile);

  useEffect(() => {
    const path = profileImageUrl || (userId ? `/mypage/profile-image/${userId}` : null);
    if (path) {
      fetchProfileImageBlob(path)
        .then(url => setImgSrc(url))
        .catch(() => setImgSrc(profile));
    }
  }, [userId, profileImageUrl]);

  return(
    <div className='flex flex-row gap-2 mb-[12px] py-[8px] border-b border-G300 cursor-default'>
      <img 
        src={imgSrc} 
        className="w-[40px] h-[40px] rounded-full object-cover" 
        onError={(e) => { e.target.onerror = null; e.target.src = profile; }}
      />
      <div>
        <div className='text-[16px]'>{writer}</div>
        <div className='flex flex-row gap-2'>
          <div className='text-[12px] text-G500 font-light'>{createdAt}</div>
          {viewCount === 'write' ? <div></div> : 
            <div className='text-[12px] text-G500 font-light'>조회 {viewCount}</div>
          }
        </div>
      </div>
    </div>
  );
}