import { useEffect, useState } from 'react';
import { usePlan } from '../context/Plancontext';
import {
  insertMonth, updateMonth, deleteMonth,
  insertCheck, modifyCheck, completeCheck, deleteCheck,
} from '../api/PlanAPI';
import CheckItem from '../components/CheckItem';
import MoreMenu from '../components/plan/MoreMenu';
import { PlusButton } from '../components/plan/PlusButton';
import { PopUp } from '../components/PopUp';
import UpIcon from "../assets/up.svg";
import DownIcon from "../assets/down.svg";

export function Plan() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);

  return (
    <div className="flex gap-40 justify-center mt-10">
      <PlanCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <Schedule selectedDate={selectedDate} />
    </div>
  );
}

function PlanCalendar({ selectedDate, setSelectedDate }) {
  const { monthPlans } = usePlan();
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const prevLastDate = new Date(year, month, 0).getDate();

  const dates = [];
  for (let i = firstDay - 1; i >= 0; i--) dates.push({ day: prevLastDate - i, isCurrent: false });
  for (let i = 1; i <= lastDate; i++) dates.push({ day: i, isCurrent: true });
  let nextDay = 1;
  while (dates.length % 7 !== 0) dates.push({ day: nextDay++, isCurrent: false });

  const changeMonth = (diff) => {
    const newMonthDate = new Date(year, month + diff, 1);
    setCurrentDate(newMonthDate);
    const targetYear = newMonthDate.getFullYear();
    const targetMonth = newMonthDate.getMonth();
    const lastDateOfTarget = new Date(targetYear, targetMonth + 1, 0).getDate();
    const day = Math.min(selectedDate.getDate(), lastDateOfTarget);
    setSelectedDate(new Date(targetYear, targetMonth, day));
  };

  const isSelectedToday = selectedDate.toDateString() === today.toDateString();

  const formatDate = (date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

  return (
    <div className="w-[600px] h-[590px] border border-G300 rounded-2xl bg-white overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{year}년 {month + 1}월</h2>
          <div className="flex gap-5 items-center">
            <div
              onClick={() => { setCurrentDate(new Date()); setSelectedDate(new Date()); }}
              className={`px-3 py-1 border border-gray-400 rounded-lg font-semibold cursor-pointer ${isSelectedToday ? "text-P400" : "text-G500"}`}
            >
              today
            </div>
            <button onClick={() => changeMonth(-1)}>
              <img className="w-6 h-3" src={UpIcon} alt="" />
            </button>
            <button onClick={() => changeMonth(1)}>
              <img className="w-[29px] h-7" src={DownIcon} alt="" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 text-center gap-10 mb-[-17px] text-gray-400">
          {["일", "월", "화", "수", "목", "금", "토"].map((d) => <div key={d}>{d}</div>)}
        </div>
      </div>

      <div className="border-t border-G300">
        <div className="grid grid-cols-7">
          {dates.map((date, idx) => {
            const isLastCol = (idx + 1) % 7 === 0;
            const isLastRow = idx >= dates.length - 7;

            const cellDate = (() => {
              if (!date.isCurrent) {
                if (idx < 7 && date.day > 15) return new Date(year, month - 1, date.day);
                return new Date(year, month + 1, date.day);
              }
              return new Date(year, month, date.day);
            })();

            const isToday = date.isCurrent && cellDate.toDateString() === today.toDateString();
            const isSelected = date.isCurrent && selectedDate.toDateString() === cellDate.toDateString();
            const cellDateStr = formatDate(cellDate);
            const dayPlans = monthPlans.find((p) => p.date === cellDateStr)?.plans ?? [];

            return (
              <div
                key={idx}
                onClick={() => { if (date.isCurrent) setSelectedDate(new Date(year, month, date.day)); }}
                className={`h-[80px] cursor-pointer border-r border-b-2 border-G200
                  ${isLastCol ? "border-r-0" : ""}
                  ${isLastRow ? "border-b-0" : ""}
                  ${!date.isCurrent ? "text-gray-300" : ""}`}
              >
                <div className="flex flex-col h-full">
                  <div className="flex justify-end p-[0.15rem]">
                    <span className={`flex items-center justify-center h-7 w-7 rounded-md text-sm font-bold
                      ${isSelected ? "bg-P400 text-black" : ""}
                      ${isToday && !isSelected ? "text-P400" : ""}`}>
                      {date.day}
                    </span>
                  </div>
                  <div className="flex flex-col px-1 gap-1">
                    {date.isCurrent && dayPlans.slice(0, 2).map((plan, i) => (
                      <div key={i} className="text-xs rounded truncate flex items-center px-[2px] gap-1 h-5 font-medium border-l-[5px] border-[#6FCF8D] bg-[#6FCF8D]/50">
                        {plan}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function Schedule({ selectedDate }) {
  const { planList, checkList, loadByDate, syncFromResponse } = usePlan();

  const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;

  useEffect(() => {
    loadByDate(dateStr);
  }, [dateStr, loadByDate]);

  const [showInput, setShowInput]                 = useState(false);
  const [inputValue, setInputValue]               = useState('');
  const [editingIndex, setEditingIndex]           = useState(null);
  const [menuIndex, setMenuIndex]                 = useState(null);
  const [showCheckInput, setShowCheckInput]       = useState(false);
  const [checkInput, setCheckInput]               = useState('');
  const [checkEditingIndex, setCheckEditingIndex] = useState(null);
  const [checkMenuIndex, setCheckMenuIndex]       = useState(null);

  const [popupMessage, setPopupMessage] = useState(null);

  // ── 일정 ──
  const handleAdd = async () => {
    const value = inputValue.trim();
    if (!value) { setShowInput(false); return; }

    if (planList.some((p) => p.planContent === value)) {
      setPopupMessage('이미 같은 일정이 있어요');
      setShowInput(false);
      setInputValue('');
      return;
    }

    setShowInput(false);
    try {
      const data = await insertMonth(dateStr, value);
      syncFromResponse(data);
      setInputValue('');
    } catch (err) {
      console.error('일정 추가 실패:', err);
      setPopupMessage('일정을 추가하지 못했어요. 잠시 후 다시 시도해주세요.');
    }
  };

  const handleEditSave = async (index, newText) => {
    const value = newText.trim();
    if (!value) { handleDelete(index); return; }

    const isDuplicate = planList.some((p, i) => i !== index && p.planContent === value);
    if (isDuplicate) {
      setPopupMessage('이미 같은 일정이 있어요');
      setEditingIndex(null);
      return;
    }

    try {
      const data = await updateMonth(planList[index].planId, value);
      syncFromResponse(data);
      setEditingIndex(null);
    } catch (err) {
      console.error('일정 수정 실패:', err);
      setPopupMessage('일정을 수정하지 못했어요. 잠시 후 다시 시도해주세요.');
    }
  };

  const handleDelete = async (index) => {
    try {
      const data = await deleteMonth(planList[index].planId);
      syncFromResponse(data);
    } catch (err) {
      console.error('일정 삭제 실패:', err);
      setPopupMessage('일정을 삭제하지 못했어요. 잠시 후 다시 시도해주세요.');
    } finally {
      setMenuIndex(null);
    }
  };

  // ── 체크리스트 ──
  const handleAddCheck = async () => {
    const value = checkInput.trim();
    if (!value) { setShowCheckInput(false); return; }

    if (checkList.some((item) => item.checkContent === value)) {
      setPopupMessage('이미 같은 항목이 있어요');
      setShowCheckInput(false);
      setCheckInput('');
      return;
    }

    setShowCheckInput(false);
    try {
      const data = await insertCheck(dateStr, value);
      syncFromResponse(data);
      setCheckInput('');
    } catch (err) {
      console.error('체크리스트 추가 실패:', err);
      setPopupMessage('항목을 추가하지 못했어요. 잠시 후 다시 시도해주세요.');
    }
  };

  const handleCheckEditSave = async (index, newText) => {
    const value = newText.trim();
    if (!value) { handleCheckDelete(index); return; }

    const isDuplicate = checkList.some((item, i) => i !== index && item.checkContent === value);
    if (isDuplicate) {
      setPopupMessage('이미 같은 항목이 있어요');
      setCheckEditingIndex(null);
      return;
    }

    try {
      const data = await modifyCheck(checkList[index].checkId, value);
      syncFromResponse(data);
      setCheckEditingIndex(null);
      setCheckInput('');
    } catch (err) {
      console.error('체크리스트 수정 실패:', err);
      setPopupMessage('항목을 수정하지 못했어요. 잠시 후 다시 시도해주세요.');
    }
  };

  const handleCheckDelete = async (index) => {
    try {
      const data = await deleteCheck(checkList[index].checkId);
      syncFromResponse(data);
    } catch (err) {
      console.error('체크리스트 삭제 실패:', err);
      setPopupMessage('항목을 삭제하지 못했어요. 잠시 후 다시 시도해주세요.');
    } finally {
      setCheckMenuIndex(null);
    }
  };

  const handleToggle = async (index) => {
    try {
      const data = await completeCheck(checkList[index].checkId);
      syncFromResponse(data);
    } catch (err) {
      console.error('체크리스트 토글 실패:', err);
      setPopupMessage('상태를 변경하지 못했어요. 잠시 후 다시 시도해주세요.');
    }
  };

  // 체크리스트 렌더링용 정렬 (체크 안 된 거 먼저, 체크된 거 아래로)
  const sortedCheckList = checkList
    .map((item, originalIndex) => ({ item, originalIndex }))
    .sort((a, b) => Number(a.item.completed) - Number(b.item.completed));

  return (
    <div className="w-[580px] h-[590px] border-2 border-G300 rounded-2xl bg-white flex flex-col">
      <div className="p-6 overflow-auto">
        <div className="font-medium">
          {selectedDate.getFullYear()}. {String(selectedDate.getMonth() + 1).padStart(2, '0')}. {String(selectedDate.getDate()).padStart(2, '0')}
        </div>

        {/* 일정 */}
        <h2 className="text-2xl font-medium mt-7">Schedule</h2>
        <ul className="mt-4 mb-4 ml-1">
          {planList.map((plan, index) => (
            <li key={plan.planId ?? index} className="flex items-center mb-3">
              <div className="w-[4px] h-5 bg-P400 mr-2 rounded-sm"></div>
              {editingIndex === index ? (
                <input
                  autoFocus
                  defaultValue={plan.planContent}
                  onBlur={(e) => handleEditSave(index, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleEditSave(index, e.target.value);
                    if (e.key === 'Escape') setEditingIndex(null);
                  }}
                  className="w-full outline-none bg-transparent font-medium text-base"
                />
              ) : (
                <span className="font-medium text-base flex-1">{plan.planContent}</span>
              )}
              <MoreMenu
                index={index}
                menuIndex={menuIndex}
                setMenuIndex={setMenuIndex}
                setEditingIndex={setEditingIndex}
                handleDelete={handleDelete}
              />
            </li>
          ))}
          {showInput && (
            <li className="flex items-center mb-2">
              <div className="w-[4px] h-5 bg-P400 mr-2 rounded-sm"></div>
              <input
                value={inputValue} autoFocus
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={async (e) => {
                  if (e.key === 'Enter') { e.preventDefault(); await handleAdd(); }
                  if (e.key === 'Escape') { setShowInput(false); setInputValue(''); }
                }}
                onBlur={handleAdd}
                className="w-full outline-none bg-transparent font-medium text-base"
                placeholder="일정을 입력하세요"
              />
            </li>
          )}
        </ul>
        <div className="flex items-center gap-2 mb-4 cursor-pointer" onClick={() => setShowInput(true)}>
          <PlusButton /><div className="text-G500">일정 추가</div>
        </div>

        <div className="w-full h-[0.5px] my-2 mb-4 bg-P300"></div>

        {/* 체크리스트 */}
        <h2 className="text-2xl font-medium mb-5">CheckList</h2>
        <ul className="mb-4">
          {sortedCheckList.map(({ item, originalIndex }) => (
            <li key={item.checkId ?? originalIndex} className="flex items-center mb-3">
              {checkEditingIndex === originalIndex ? (
                <>
                  <div className="w-6 h-6 border rounded-sm flex items-center justify-center bg-P100 border-P300 mr-2" />
                  <input
                    autoFocus
                    value={checkInput}
                    onChange={(e) => setCheckInput(e.target.value)}
                    onBlur={(e) => handleCheckEditSave(originalIndex, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleCheckEditSave(originalIndex, checkInput);
                      if (e.key === 'Escape') { setCheckEditingIndex(null); setCheckInput(''); }
                    }}
                    className="flex-1 outline-none font-medium text-base"
                  />
                </>
              ) : (
                <div className="flex-1">
                  <CheckItem
                    text={item.checkContent}
                    checked={item.completed}
                    onToggle={() => handleToggle(originalIndex)}
                  />
                </div>
              )}
              <MoreMenu
                index={originalIndex}
                menuIndex={checkMenuIndex}
                setMenuIndex={setCheckMenuIndex}
                setEditingIndex={(idx) => {
                  setCheckInput(checkList[idx].checkContent);
                  setCheckEditingIndex(idx);
                }}
                handleDelete={handleCheckDelete}
              />
            </li>
          ))}
          {showCheckInput && (
            <li className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 border rounded-sm flex items-center justify-center bg-P100 border-P300" />
              <input
                value={checkInput} autoFocus
                onChange={(e) => setCheckInput(e.target.value)}
                onKeyDown={async (e) => {
                  if (e.key === 'Enter') { e.preventDefault(); await handleAddCheck(); }
                  if (e.key === 'Escape') { setShowCheckInput(false); setCheckInput(''); }
                }}
                onBlur={handleAddCheck}
                className="outline-none font-medium text-base flex-1"
                placeholder="계획을 입력하세요"
              />
            </li>
          )}
        </ul>
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setShowCheckInput(true)}>
          <PlusButton /><div className="text-G500">계획 추가</div>
        </div>
      </div>

      {popupMessage && (
        <PopUp message={popupMessage} onClose={() => setPopupMessage(null)} />
      )}
    </div>
  );
}