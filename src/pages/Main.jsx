import MyStudy from '../components/MyStudy';
import Calendar from '../components/Calendar';
import Checklist from '../components/Checklist';
import Certificate from '../components/Certificate';

export function Main() {
  return (
    <div className="w-full h-full flex justify-center py-6">
      
      <div className="w-[1200px] flex gap-6 items-start">

        {/* 왼쪽 영역 */}
        <div className="flex-1 flex flex-col gap-14 mt-6">

          {/* MY STUDY */}
          <MyStudy />

          {/* 하단 */}
          <div className="flex gap-6">

            {/* CALENDAR */}
            <div className="flex flex-col">
              <div className="text-[14px] font-semibold mb-2">
                CALENDER
              </div>
              <Calendar />
            </div>

            {/* CHECK LIST */}
            <div className="flex flex-col">
              
              <Checklist />
            </div>

          </div>
        </div>

        {/* 오른쪽 */}
        <div className="mt-12 ml-[40px]">
          <Certificate />
        </div>

      </div>
    </div>
  );
}