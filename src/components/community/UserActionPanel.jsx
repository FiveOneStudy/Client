import profile from '../../assets/profile.svg';

function ActionButton({ children }) {
  return (
    <button className="bg-[#FFFFFF] rounded-[4px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] text-center text-[20x] font-normal py-[4px] w-[200px]">
      {children}
    </button>
  );
}

export function UserActionPanel() {
  return(
    <div className='mt-[80px] ml-[44px] pt-[32px] pb-[48px] flex flex-col justify-between items-center w-[300px] h-[432px] bg-[#F8F8F8] border-r border-[#CDCDCF] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'>
      <img src={profile} className='h-[160px]' />
      <div className='text-center justify-start text-[30px] font-semibold'>정하진</div>
      <ActionButton children={"글 작성하기"} />
      <ActionButton children={"내가 작성한 글"} />
      <ActionButton children={"내가 작성한 댓글"} />
    </div>
  );
}