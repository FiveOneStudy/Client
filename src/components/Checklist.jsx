import { useNavigate } from 'react-router-dom';
import CheckItem from './CheckItem';
import { usePlan } from '../context/Plancontext';
import { completeCheck } from '../api/PlanAPI';

export default function Checklist() {
  const navigate = useNavigate();
  const { checkList, syncFromResponse, loadByDate } = usePlan();

  // 오늘 날짜
  const today = new Date();
  const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const sorted = [...checkList].sort((a, b) => Number(a.completed) - Number(b.completed));

  const handleToggle = async (item) => {
    const data = await completeCheck(dateStr, item.content);
    syncFromResponse(data);
  };

  return (
    <div className="w-[490px] h-[270px]">
      <div className="border border-red-300 rounded-lg p-5 bg-white w-full h-full">
        <h2
          onClick={() => navigate('/plan')}
          className="font-bold text-[#563D3D] mb-4 cursor-pointer hover:opacity-70"
        >
          CHECK LIST
        </h2>
        <div className="flex h-[calc(100%-32px)]">
          <div className="flex-1 space-y-3">
            {sorted.slice(0, 5).map((item, idx) => (
              <CheckItem
                key={idx}
                text={item.content}
                checked={item.completed}
                onToggle={() => handleToggle(item)}
              />
            ))}
          </div>
          <div className="w-px bg-gray-300 mx-5"></div>
          <div className="flex-1 space-y-3">
            {sorted.slice(5).map((item, idx) => (
              <CheckItem
                key={idx + 5}
                text={item.content}
                checked={item.completed}
                onToggle={() => handleToggle(item)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}