import profile from '../../assets/profile.svg';

export function WriteUser({ name, date, views }) {
  return(
    <div className='flex flex-row gap-2 mb-[12px] py-[8px] border-b border-G300'>
      <img src={profile} className="w-[40px]" />
      <div>
        <div className='text-[16px]'>{name}</div>
        <div className='flex flex-row gap-2'>
          <div className='text-[12px] text-G500 font-light'>{date}</div>
          <div className='text-[12px] text-G500 font-light'>조회 {views}</div>
        </div>
      </div>
    </div>
  );
}