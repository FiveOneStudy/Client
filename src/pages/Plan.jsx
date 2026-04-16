import { useState } from "react";
import UpIcon from "../assets/up.svg";
import DownIcon from "../assets/down.svg";
import CheckItem from "../components/CheckItem";
import MoreMenu from "../components/plan/MoreMenu";
import { PlusButton } from "../components/plan/PlusButton";

export function Plan() {
  const today = new Date();

  const [selectedDate, setSelectedDate] = useState(today);
  const [todos, setTodos] = useState([]);
  const [checklist, setChecklist] = useState([]);

  return (
    <div className="flex gap-40 justify-center mt-10">
      <Calendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        todos={todos}
      />
      <Schedule
        selectedDate={selectedDate}
        todos={todos}
        setTodos={setTodos}
        checklist={checklist}
        setChecklist={setChecklist}
      />
    </div>
  );
}

/* ================== Calendar ================== */

function Calendar({ selectedDate, setSelectedDate, todos }) {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const prevLastDate = new Date(year, month, 0).getDate();

  const dates = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    dates.push({ day: prevLastDate - i, isCurrent: false });
  }

  for (let i = 1; i <= lastDate; i++) {
    dates.push({ day: i, isCurrent: true });
  }

  let nextDay = 1;
  while (dates.length % 7 !== 0) {
    dates.push({ day: nextDay++, isCurrent: false });
  }

  const changeMonth = (diff) => {
    setCurrentDate(new Date(year, month + diff, 1));
  };

  const isSelectedToday = selectedDate.toDateString() === today.toDateString();

  return (
    <div className="w-[600px] h-[590px] border border-G300 rounded-2xl bg-white overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {year}년 {month + 1}월
          </h2>

          <div className="flex gap-5 items-center">
            <div
              onClick={() => {
                setCurrentDate(new Date());
                setSelectedDate(new Date());
              }}
              className={`px-3 py-1 border border-gray-400 rounded-lg font-semibold cursor-pointer ${
                isSelectedToday ? "text-P400" : "text-G500"
              }`}
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
          {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>
      </div>

      <div className="border-t border-G300">
        <div className="grid grid-cols-7">
          {dates.map((date, idx) => {
            const isLastCol = (idx + 1) % 7 === 0;
            const isLastRow = idx >= dates.length - 7;

            const cellDate = (() => {
              if (!date.isCurrent) {
                if (idx < 7 && date.day > 15) {
                  return new Date(year, month - 1, date.day);
                }
                return new Date(year, month + 1, date.day);
              }
              return new Date(year, month, date.day);
            })();

            const isToday =
              date.isCurrent &&
              cellDate.toDateString() === today.toDateString();

            const isSelected =
              date.isCurrent &&
              selectedDate.toDateString() === cellDate.toDateString();

            return (
              <div
                key={idx}
                onClick={() => {
                  if (date.isCurrent)
                    setSelectedDate(new Date(year, month, date.day));
                }}
                className={`h-[80px] cursor-pointer border-r border-b-2 border-G200
                ${isLastCol && "border-r-0"}
                ${isLastRow && "border-b-0"}
                ${!date.isCurrent && "text-gray-300"}`}
              >
                <div className="flex flex-col h-full">
                  <div className="flex justify-end p-[0.15rem]">
                    <span
                      className={`flex items-center justify-center
                      h-7 w-7 rounded-md text-sm font-bold
                      ${isSelected ? "bg-P400 text-black" : ""}
                      ${isToday && !isSelected ? "text-P400" : ""}`}
                    >
                      {date.day}
                    </span>
                  </div>

                  <div className="flex flex-col px-1 gap-1">
                    {date.isCurrent &&
                      todos
                        .filter((todo) => todo.date === cellDate.toDateString())
                        .slice(0, 2)
                        .map((todo, i) => (
                          <div
                            key={i}
                            className="text-xs rounded truncate flex items-center px-[2px] gap-1 h-5 font-medium border-l-[5px] border-[#6FCF8D]  bg-[#6FCF8D]/50"
                          >
                            
                            {todo.text}
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

/* ================== Schedule ================== */

export function Schedule({ selectedDate, todos, setTodos, checklist, setChecklist }) {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [editingIndex, setEditingIndex] = useState(null);
  const [menuIndex, setMenuIndex] = useState(null);

  const [checkInput, setCheckInput] = useState("");
  const [showCheckInput, setShowCheckInput] = useState(false);
  const [checkEditingIndex, setCheckEditingIndex] = useState(null);
  const [checkMenuIndex, setCheckMenuIndex] = useState(null);

  const filteredTodos = todos.filter(
    (todo) => todo.date === selectedDate.toDateString(),
  );

  const filteredChecklist = checklist.filter(
    (item) => item.date === selectedDate.toDateString(),
  );

  // 일정 추가
  const handleAdd = () => {
    if (inputValue.trim() === "") {
      setShowInput(false);
      return;
    }
    setTodos([...todos, { text: inputValue, date: selectedDate.toDateString() }]);
    setInputValue("");
    setShowInput(false);
  };

  // 일정 수정
  const handleEditSave = (index, newText) => {
    if (newText.trim() === "") {
      handleDelete(index);
      return;
    }
    const target = filteredTodos[index];
    const globalIndex = todos.indexOf(target);
    const newTodos = [...todos];
    newTodos[globalIndex] = { ...newTodos[globalIndex], text: newText };
    setTodos(newTodos);
    setEditingIndex(null);
  };

  // 일정 삭제
  const handleDelete = (index) => {
    const target = filteredTodos[index];
    setTodos(todos.filter((todo) => todo !== target));
    setMenuIndex(null);
  };

  // 계획 추가
  const handleAddCheck = () => {
    if (checkInput.trim() === "") {
      setShowCheckInput(false);
      return;
    }
    setChecklist([
      ...checklist,
      { text: checkInput, checked: false, date: selectedDate.toDateString() },
    ]);
    setCheckInput("");
    setShowCheckInput(false);
  };

  // 계획 수정
  const handleCheckEditSave = (index, newText) => {
    if (newText.trim() === "") {
      handleCheckDelete(index);
      return;
    }
    const target = filteredChecklist[index];
    const globalIndex = checklist.indexOf(target);
    const newList = [...checklist];
    newList[globalIndex] = { ...newList[globalIndex], text: newText };
    setChecklist(newList);
    setCheckEditingIndex(null);
  };

  // 계획 삭제
  const handleCheckDelete = (index) => {
    const target = filteredChecklist[index];
    setChecklist(checklist.filter((item) => item !== target));
    setCheckMenuIndex(null);
  };

  return (
    <div className="w-[580px] h-[590px] border-2 border-G300 rounded-2xl bg-white flex flex-col">
      <div className="p-6 overflow-auto">
        <div className="font-medium">
          {selectedDate.getFullYear()}.
          {String(selectedDate.getMonth() + 1).padStart(2, "0")}.
          {String(selectedDate.getDate()).padStart(2, "0")}
        </div>

        {/* 일정 */}
        <h2 className="text-2xl font-medium mt-7">Schedule</h2>

        <ul className="mt-4 mb-4 ml-1">
          {filteredTodos.map((todo, index) => (
            <li key={index} className="flex items-center mb-3">
              <div className="w-[4px] h-5 bg-P400 mr-2 rounded-sm"></div>

              {editingIndex === index ? (
                <input
                  autoFocus
                  defaultValue={todo.text}
                  onBlur={(e) => handleEditSave(index, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleEditSave(index, e.target.value);
                    if (e.key === "Escape") setEditingIndex(null);
                  }}
                  className="w-full outline-none bg-transparent font-medium text-base"
                />
              ) : (
                <span className="font-medium text-base flex-1">{todo.text}</span>
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
                value={inputValue}
                autoFocus
                onChange={(e) => setInputValue(e.target.value)}
                onBlur={handleAdd}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAdd();
                }}
                className="w-full outline-none bg-transparent font-medium text-base"
                placeholder="일정을 입력하세요"
              />
            </li>
          )}
        </ul>

        <div
          className="flex items-center gap-2 mb-4 cursor-pointer"
          onClick={() => setShowInput(true)}
        >
          <PlusButton />
          <div className="text-G500">일정 추가</div>
        </div>

        <div className="w-full h-[0.5px] my-2 mb-4 bg-P300"></div>

        {/* 체크리스트 */}
        <h2 className="text-2xl font-medium mb-5">CheckList</h2>

        <ul className="mb-4">
          {filteredChecklist.map((item, index) => (
            <li key={index} className="flex items-center mb-3">
              {checkEditingIndex === index ? (
                <>
                  <div className="w-6 h-6 border rounded-sm flex items-center justify-center bg-P100 border-P300 mr-2" />
                  <input
                    autoFocus
                    defaultValue={item.text}
                    onBlur={(e) => handleCheckEditSave(index, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleCheckEditSave(index, e.target.value);
                      if (e.key === "Escape") setCheckEditingIndex(null);
                    }}
                    className="flex-1 outline-none font-medium text-base"
                  />
                </>
              ) : (
                <div className="flex-1">
                  <CheckItem
                    text={item.text}
                    checked={item.checked}
                    onToggle={() => {
                      const target = filteredChecklist[index];
                      const globalIndex = checklist.indexOf(target);
                      const newList = [...checklist];
                      newList[globalIndex].checked = !newList[globalIndex].checked;
                      setChecklist(newList);
                    }}
                  />
                </div>
              )}

              <MoreMenu
                index={index}
                menuIndex={checkMenuIndex}
                setMenuIndex={setCheckMenuIndex}
                setEditingIndex={setCheckEditingIndex}
                handleDelete={handleCheckDelete}
              />
            </li>
          ))}

          {showCheckInput && (
            <li className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 border rounded-sm flex items-center justify-center bg-P100 border-P300" />
              <input
                value={checkInput}
                autoFocus
                onChange={(e) => setCheckInput(e.target.value)}
                onBlur={handleAddCheck}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddCheck();
                }}
                className="outline-none font-medium text-base flex-1"
                placeholder="계획을 입력하세요"
              />
            </li>
          )}
        </ul>

        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setShowCheckInput(true)}
        >
          <PlusButton />
          <div className="text-G500">계획 추가</div>
        </div>
      </div>
    </div>
  );
}