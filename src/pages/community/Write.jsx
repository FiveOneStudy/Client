import { useNavigate } from 'react-router-dom';
import dropdown from '../../assets/dropdown.svg';
import { WriteUser } from '../../components/community/WriteUser';

export function Write() {
  const navigate = useNavigate();

  return(
    <form action="">  
      <div className="flex flex-col justify-center items-center pt-[32px] gap-[12px]">
        <div className="w-[780px] flex flex-row gap-1" onClick={() => navigate("/community")}>
          <img src={dropdown} className="rotate-180" />
          <div className="text-[14px]">되돌아가기</div>
        </div>
        <div className="w-[780px] h-[560px] flex flex-col px-[34px] pt-[36px] pb-[16px] rounded-xl shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] border border-P300">
          <input type="text" placeholder="제목"
            className="w-full border-none outline-none text-[36px] font-medium"
          />
          <WriteUser name={"주여진"} date={"2026.04.13"} views={0}/>
          <textarea placeholder="내용"
            className="w-full h-[324px] border-none outline-none text-[18px] font-light resize-none"
          />
          <button 
            type="submit" 
            className='w-[92px] h-[44px] bg-P400 text-White rounded-[16px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] self-end mt-auto'
          >올리기</button>
        </div>
      </div>  
    </form>
  );
}