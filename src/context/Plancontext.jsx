import { createContext, useContext, useState, useCallback } from 'react';
import { fetchPlanByDate } from '../api/PlanAPI';

const PlanContext = createContext();

export function PlanProvider({ children }) {
  const [monthPlans, setMonthPlans] = useState([]);  // [{ date, plans[] }]
  const [planList, setPlanList]     = useState([]);  // 선택 날짜 일정
  const [checkList, setCheckList]   = useState([]);  // 선택 날짜 체크리스트

  // API 응답으로 전체 상태 동기화
  const syncFromResponse = useCallback((data) => {
    if (!data) return;
    if (data.monthPlans !== undefined) setMonthPlans(data.monthPlans);
    if (data.planList   !== undefined) setPlanList(data.planList);
    if (data.checkList  !== undefined) setCheckList(data.checkList);
  }, []);

  // 날짜 선택 시 호출
  const loadByDate = useCallback(async (date) => {
    // date: "YYYY-MM-DD" 형식
    const data = await fetchPlanByDate(date);
    syncFromResponse(data);
  }, [syncFromResponse]);

  return (
    <PlanContext.Provider value={{
      monthPlans, planList, checkList,
      syncFromResponse, loadByDate,
    }}>
      {children}
    </PlanContext.Provider>
  );
}

export const usePlan = () => useContext(PlanContext);