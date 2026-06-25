import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { fetchStudyList, joinStudy as joinStudyAPI, leaveStudy as leaveStudyAPI } from '../api/StudyAPI';

const StudyContext = createContext();

export function StudyProvider({ children }) {
  const [allStudies, setAllStudies] = useState([]);
  const [myStudies, setMyStudies] = useState([]);

  const loadStudies = useCallback(async () => {
    const data = await fetchStudyList();
    setMyStudies(data.study ?? []);
    setAllStudies(data.allStudy ?? []);
  }, []);

  const joinStudy = async (studyName) => {
    await joinStudyAPI(studyName);
    await loadStudies();
  };

  const leaveStudy = async (studyName) => {
    await leaveStudyAPI(studyName);
    await loadStudies();
  };

  const isJoined = (studyName) => myStudies.some((s) => s.name === studyName);

  useEffect(() => {
    loadStudies();
  }, [loadStudies]);

  return (
    <StudyContext.Provider value={{ allStudies, myStudies, joinStudy, leaveStudy, isJoined }}>
      {children}
    </StudyContext.Provider>
  );
}

export const useStudy = () => useContext(StudyContext);