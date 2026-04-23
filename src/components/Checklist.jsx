import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckItem from "./CheckItem";

export default function Checklist() {
  const navigate = useNavigate();

  const [items, setItems] = useState([
    { text: "최태성 16강 시청", done: false },
    { text: "한국사 2025 모의 시험", done: false },
    { text: "문제 100개 풀기", done: false },
    { text: "CBT 90점 달성하기", done: false },
    { text: "SQLD 챕터3 끝내기", done: false },

    { text: "정하진이랑 놀기", done: false },
    { text: "CBT 80점 달성하기", done: true },
    { text: "최태성 15강 시청", done: true },
  ]);

  const toggleItem = (index) => {
    const newItems = [...items];
    newItems[index].done = !newItems[index].done;
    setItems(newItems);
  };

  return (
    <div className="w-[490px] h-[270px]">
      <div className="border border-red-300 rounded-lg p-5 bg-white w-full h-full">
        
        {/* 🔥 제목 클릭 시 이동 */}
        <h2
          onClick={() => navigate('/plan')}
          className="font-bold text-[#563D3D] mb-4 cursor-pointer hover:opacity-70"
        >
          CHECK LIST
        </h2>

        <div className="flex h-[calc(100%-32px)]">

          {/* 왼쪽 */}
          <div className="flex-1 space-y-3">
            {items.slice(0, 5).map((item, idx) => (
              <CheckItem
                key={idx}
                text={item.text}
                checked={item.done}
                onToggle={() => toggleItem(idx)}
              />
            ))}
          </div>

          {/* 가운데 선 */}
          <div className="w-px bg-gray-300 mx-5"></div>

          {/* 오른쪽 */}
          <div className="flex-1 space-y-3">
            {items.slice(5).map((item, idx) => (
              <CheckItem
                key={idx}
                text={item.text}
                checked={item.done}
                onToggle={() => toggleItem(idx + 5)}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}