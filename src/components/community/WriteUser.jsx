import profile from '../../assets/profile.svg';

export function WriteUser({ writer, createdAt, viewCount }) {
  return(
    <div className='flex flex-row gap-2 mb-[12px] py-[8px] border-b border-G300'>
      <img src={profile} className="w-[40px]" />
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