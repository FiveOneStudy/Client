import { useEffect } from "react";
import { usePlan } from "../context/Plancontext";
import MyStudy from '../components/MyStudy';
import Calendar from '../components/Calendar';
import Checklist from '../components/Checklist';
import Certificate from '../components/Certificate';

export function Main() {
  const { loadByDate } = usePlan();

  useEffect(() => {
    const today = new Date();
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    loadByDate(dateStr);
  }, [loadByDate]);

  return (
    <div className="w-full h-full flex justify-center py-6">
      <div className="w-[1200px] flex gap-6 items-start">

        {/* 왼쪽 영역 */}
        <div className="flex-1 flex flex-col gap-14 mt-6">
          <MyStudy />

          <div className="flex gap-12">
            <div className="flex flex-col">
              <div className="text-[20px] font-semibold mb-2 -mt-4">CALENDER</div>
              <Calendar />
            </div>

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