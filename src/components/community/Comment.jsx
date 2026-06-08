import dropdownP from '../../assets/dropdown-P400.svg';
import settings from '../../assets/settings.svg';

export function Comment() {
  return(
    <div className='flex flex-row gap-3 py-[12px] border border-y-G300 border-x-0'>
      <div className='w-fit flex flex-row gap-1 px-[11px] py-[2px] rounded-[48px] border border-P400'>
        <div className="text-[14px] text-P400 font-normal">댓글보기</div>
        <img src={dropdownP} className='w-[12px] rotate-90'/>
      </div>
      <img src={settings} className=''/>
    </div>
  );
}