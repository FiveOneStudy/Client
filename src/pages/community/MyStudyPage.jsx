import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import profileSvg from "../../assets/profile.svg";
import { useStudy } from "../../context/StudyContext";
import { BASE_URL, getToken } from "../../api/index";
import Vector from "../../assets/Vector.svg";
import dropdown from "../../assets/dropdown.svg";
import { fetchProgress, completeProgress, searchProgress, fetchTips, fetchTipDetail, insertTip, deleteTip } from "../../api/StudyAPI";

const toPercent = (value) => {
  if (value === null || value === undefined) return 0;
  const num = parseFloat(String(value).replace(/[^0-9.-]/g, ""));
  return isNaN(num) ? 0 : num;
};

function ProgressBar({ percent }) {
  return (
    <div className="relative w-full h-[27px] rounded-full overflow-hidden border-[2px]"
      style={{ backgroundColor: "white", borderColor: "#F5AFAF" }}>
      <div className="absolute left-0 top-0 h-full rounded-full"
        style={{ width: `${percent}%`, backgroundColor: "#F5AFAF" }} />
    </div>
  );
}

function Avatar({ src, size = 44 }) {
  const [imgSrc, setImgSrc] = useState(profileSvg);

  useEffect(() => {
    if (!src) {
      setImgSrc(profileSvg);
      return;
    }
    const loadImage = async () => {
      try {
        const res = await fetch(`${BASE_URL}${src}?t=${Date.now()}`, {
          headers: { Authorization: `Bearer ${getToken()}` },
          cache: "no-store",
        });
        if (!res.ok) throw new Error();
        const blob = await res.blob();
        setImgSrc((prev) => {
          if (prev.startsWith("blob:")) URL.revokeObjectURL(prev);
          return URL.createObjectURL(blob);
        });
      } catch {
        setImgSrc(profileSvg);
      }
    };
    loadImage();
  }, [src]);

  return (
    <img src={imgSrc} alt="profile"
      style={{ width: size, height: size }}
      className="rounded-full object-cover shrink-0" />
  );
}

function CheckItem({ text, checked, onToggle }) {
  return (
    <div onClick={onToggle} className="flex items-center gap-2 cursor-pointer py-1">
      <div className={`w-[20px] h-[20px] shrink-0 rounded-[2px] border flex items-center justify-center transition-all
        ${checked ? "border-[#F4CACA] bg-[#FFF7F7]" : "border-[#E5DADA] bg-transparent"}`}>
        {checked && (
          <svg viewBox="0 0 24 24" className="w-[14px] h-[14px]" fill="none"
            stroke="#F4B3B3" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17L4 12" />
          </svg>
        )}
      </div>
      <span className={`text-[14px] ${checked ? "text-[#6E6E6E]" : "text-[#7B7B7B]"}`}>
        {text}
      </span>
    </div>
  );
}

function GearIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-black"
      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M11.983 13.938a1.955 1.955 0 100-3.91 1.955 1.955 0 000 3.91z" />
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M18.063 13.938a1 1 0 00.2 1.1l.036.036a2 2 0 11-2.829 2.829l-.036-.036a1 1 0 00-1.1-.2 1 1 0 00-.6.92V19a2 2 0 11-4 0v-.051a1 1 0 00-.6-.92 1 1 0 00-1.1.2l-.036.036a2 2 0 11-2.829-2.829l.036-.036a1 1 0 00.2-1.1 1 1 0 00-.92-.6H5a2 2 0 110-4h.051a1 1 0 00.92-.6 1 1 0 00-.2-1.1l-.036-.036a2 2 0 112.829-2.829l.036.036a1 1 0 001.1.2h.001a1 1 0 00.599-.92V5a2 2 0 114 0v.051a1 1 0 00.6.92 1 1 0 001.1-.2l.036-.036a2 2 0 112.829 2.829l-.036.036a1 1 0 00-.2 1.1v.001a1 1 0 00.92.599H19a2 2 0 110 4h-.051a1 1 0 00-.92.6z" />
    </svg>
  );
}

export default function MyStudyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { leaveStudy } = useStudy();

  const [activeTab, setActiveTab] = useState("TIPS");
  const [topicSearch, setTopicSearch] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPostMenu, setShowPostMenu] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const [progressData, setProgressData] = useState(null);
  const [progressLoading, setProgressLoading] = useState(false);

  const [tipPosts, setTipPosts] = useState([]);
  const [tipsLoading, setTipsLoading] = useState(false);

  const [writeTitle, setWriteTitle] = useState("");
  const [writeContent, setWriteContent] = useState("");
  const [writeUrls, setWriteUrls] = useState([""]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (activeTab === "TIPS") loadTips();
    if (activeTab === "PROGRESS") loadProgress();
  }, [activeTab]);

  // 검색창에서 넘어온 경우 바로 TIPS 탭 열기
  useEffect(() => {
    if (location.state?.openTips) {
      setActiveTab("TIPS");
    }
  }, []);

  const loadTips = async () => {
    setTipsLoading(true);
    const data = await fetchTips(id);
    if (data?.tips) {
      setTipPosts(data.tips.map(([tipId, title, author, date]) => ({
        id: tipId, title, author, date
      })));
    }
    setTipsLoading(false);
  };

  const loadTipDetail = async (tipId) => {
    const data = await fetchTipDetail(tipId);
    if (data) setSelectedPost({ ...data, id: tipId });
  };

  const handleUrlChange = (index, value) => {
    setWriteUrls((prev) => { const next = [...prev]; next[index] = value; return next; });
  };

  const handleAddUrl = () => setWriteUrls((prev) => [...prev, ""]);

  const handleRemoveUrl = (index) => setWriteUrls((prev) => prev.filter((_, i) => i !== index));

  const handleInsertTip = async () => {
    if (!writeTitle.trim() || !writeContent.trim()) return;
    setSubmitting(true);
    const urls = writeUrls.map((u) => u.trim()).filter(Boolean);
    const res = await insertTip(id, writeTitle, writeContent, urls);
    if (res?.answer) {
      setWriteTitle(""); setWriteContent(""); setWriteUrls([""]);
      setActiveTab("TIPS");
      await loadTips();
    }
    setSubmitting(false);
  };

  const handleDeleteTip = async (tipId) => {
    await deleteTip(tipId);
    setSelectedPost(null);
    await loadTips();
  };

  const loadProgress = async () => {
    setProgressLoading(true);
    const data = await fetchProgress(id);
    setProgressData(data);
    setProgressLoading(false);
  };

  const handleToggleMission = async (subject) => {
    await completeProgress(id, subject);
    await loadProgress();
  };

  const handleSearch = async (value) => {
    setTopicSearch(value);
    if (value.trim() === "") {
      await loadProgress();
    } else {
      const data = await searchProgress(id, value);
      if (data) setProgressData((prev) => ({ ...prev, mission: data.mission }));
    }
  };

  const handleConfirmLeave = async () => {
    setLeaving(true);
    try {
      await leaveStudy(id);
      navigate("/study");
    } catch (e) {
      console.error("탈퇴 실패:", e);
      setLeaving(false);
    }
  };

  const memberProgress = progressData?.memberProgress ?? [];
  const mainProgress = memberProgress.length > 0
    ? Math.round(memberProgress.reduce((sum, m) => sum + toPercent(m[2]), 0) / memberProgress.length)
    : 0;
  const myProgress = toPercent(progressData?.progress ?? 0);
  const missions = progressData?.mission ?? [];

  return (
    <div className="flex">
      {/* 좌측 사이드 */}
      <div className="w-[220px] h-[705px] border-r border-G200 shrink-0">
        <div onClick={() => navigate("/study")}
          className="p-4 text-[14px] font-semibold border-b border-G200 cursor-pointer">
          &lt; STUDY
        </div>
        <div onClick={() => setActiveTab("TIPS")}
          className={`p-4 border-b border-G200 flex items-center justify-center gap-2 cursor-pointer transition-all
            ${activeTab === "TIPS" ? "bg-[#E6E6E7] text-black" : "bg-white text-[#B9B9B9]"}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M9 18h6M10 22h4M12 2a7 7 0 00-4 12c.5.6 1 1.5 1 2h6c0-.5.5-1.4 1-2a7 7 0 00-4-12z" />
          </svg>
          <span className="text-[13px] font-extrabold">TIPS</span>
        </div>
        <div onClick={() => setActiveTab("WRITING")}
          className={`py-3 border-b border-G200 text-[13px] text-center cursor-pointer transition-all
            ${activeTab === "WRITING" ? "bg-[#E6E6E7] text-black" : "bg-white text-[#B9B9B9]"}`}>
          글 작성하기
        </div>
        <div onClick={() => setActiveTab("PROGRESS")}
          className={`py-3 border-b border-G200 text-[13px] text-center cursor-pointer transition-all
            ${activeTab === "PROGRESS" ? "bg-[#E6E6E7] text-black font-bold" : "bg-white text-[#B9B9B9]"}`}>
          <div className="flex items-center justify-center gap-[6px]">
            <span>PROGRESS</span>
          </div>
        </div>
      </div>

      {/* 메인 */}
      <div className="flex-1">

        {/* TIPS */}
        {activeTab === "TIPS" && (
          <>
            {!selectedPost ? (
              <div className="w-full px-8 pt-14">
                <div className="mb-8 flex items-center gap-2">
                  <div className="inline-flex items-end gap-2 border-b-2 border-G500 pb-[2px] ml-10">
                    <span className="text-[26px] font-bold leading-none">{id}</span>
                    <span className="text-[13px] leading-none">STUDY</span>
                  </div>
                  <button className="-translate-y-[4px]" onClick={() => setShowExitModal(true)}>
                    <GearIcon />
                  </button>
                </div>
                {tipsLoading ? (
                  <div className="flex justify-center mt-20 text-[#999] text-[14px]">불러오는 중...</div>
                ) : tipPosts.length === 0 ? (
                  <div className="flex justify-center mt-20 text-[#999] text-[14px]">아직 작성된 글이 없습니다.</div>
                ) : (
                  <div className="flex justify-center w-full mt-24">
                    <div className="flex justify-center w-full -mt-10">
                      <div className="grid grid-cols-4 gap-6">
                        {tipPosts.map((post, i) => (
                          <div key={i} onClick={() => loadTipDetail(post.id)}
                            className="cursor-pointer hover:scale-[1.02] transition-all w-[220px]">
                            <div className="w-full h-[150px] rounded-[12px] flex items-center justify-center border border-[#E5E5E5] bg-white">
                              <span className="text-gray-400 text-[11px]">이미지</span>
                            </div>
                            <div className="text-[12px] text-[#4E4F51] mt-2.5">{post.author}</div>
                            <div className="flex justify-between items-center mt-1 border-b border-G200 pb-1.5">
                              <div className="text-[19px] truncate">{post.title}</div>
                              <div className="text-[10px] text-G500">{post.date}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full flex justify-center pt-10 px-10" onClick={() => setShowPostMenu(false)}>
                <div className="w-full max-w-[800px]">
                  <div
  className="flex items-center gap-1 text-[15px] text-[#666] mb-4 cursor-pointer"
  onClick={() => setSelectedPost(null)}
>
  <img src={dropdown} alt="dropdown" className="w-4 h-4 scale-x-[-1]" />
  되돌아가기
</div>
                  <div className="flex items-start justify-between">
                    <div className="text-[36px] font-bold text-[#222]">{selectedPost.title}</div>
                    <div className="relative mt-3">
                      <button onClick={(e) => { e.stopPropagation(); setShowPostMenu((prev) => !prev); }}
                        className="flex items-center justify-center gap-[5px] p-2">
                        <span className="w-[4px] h-[4px] rounded-full bg-[#888]" />
                        <span className="w-[4px] h-[4px] rounded-full bg-[#888]" />
                        <span className="w-[4px] h-[4px] rounded-full bg-[#888]" />
                      </button>
                      {showPostMenu && selectedPost.button && (
                        <div className="absolute right-0 top-9 w-[90px] bg-white border border-G200 rounded-[8px] shadow-md z-10">
                          <button onClick={() => { setShowPostMenu(false); handleDeleteTip(selectedPost.id); }}
                            className="w-full text-left px-4 py-2 text-[13px] text-[#888] hover:bg-[#FFF5F5] rounded-[8px]">
                            삭제하기
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-5">
                    <Avatar src={selectedPost.profileImage} size={36} />
                    <div>
                      <div className="text-[15px] font-semibold">{selectedPost.writer}</div>
                      <div className="text-[13px] text-[#999]">{selectedPost.date}</div>
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-[#D9D9D9] mt-4 mb-5" />
                  <div className="text-[15px] leading-[2] text-[#555] whitespace-pre-line min-h-[260px]">
                    {selectedPost.content}
                  </div>
                  {selectedPost.url?.length > 0 && (
                    <div className="mt-4 flex flex-col gap-2">
                      {selectedPost.url.map((u, i) => (
                        <a key={i} href={u} target="_blank" rel="noreferrer"
                          className="text-[13px] text-blue-500 underline">{u}</a>
                      ))}
                    </div>
                  )}
                  <div className="w-full h-[1px] bg-[#D9D9D9] mt-10 mb-4" />
                </div>
              </div>
            )}
          </>
        )}

        {/* WRITING */}
        {activeTab === "WRITING" && (
          <div className="w-full flex justify-center pt-10 pb-10">
            <div className="w-[800px]">
              <div className="text-[16px] text-[#666] mb-2 cursor-pointer" onClick={() => setActiveTab("TIPS")}>
                &lt; 되돌아가기
              </div>
              <div className="w-full min-h-[580px] rounded-[10px] p-8 flex flex-col"
                style={{ border: "1px solid #F5DADA", backgroundColor: "white" }}>
                <input type="text" value={writeTitle} onChange={(e) => setWriteTitle(e.target.value)}
                  placeholder="제목을 입력하세요"
                  className="w-full text-[30px] font-bold outline-none border-b border-[#D8D8D8] pb-3 shrink-0 placeholder:text-[#ccc]" />
                <textarea value={writeContent} onChange={(e) => setWriteContent(e.target.value)}
                  placeholder="내용을 입력하세요"
                  className="w-full resize-none outline-none mt-6 text-[16px] leading-relaxed min-h-[300px] placeholder:text-[#ccc]" />
                <div className="mt-6 flex flex-col gap-3 shrink-0">
                  <div className="flex flex-col gap-3">
                    {writeUrls.map((url, idx) => (
                      <div key={idx} className="relative flex items-center w-full h-[30px] rounded-full border border-P400 px-5 pr-9">
                        <span className="text-P400 text-[14px] whitespace-nowrap shrink-0 mr-2">
                          {idx === 0 ? "도서 정보 | " : "기타 정보 | "}
                        </span>
                        <input
                          type="text"
                          value={url}
                          onChange={(e) => handleUrlChange(idx, e.target.value)}
                          placeholder="URL"
                          className="flex-1 min-w-0 h-full outline-none text-[14px] bg-transparent placeholder:text-P400"
                        />
                        {writeUrls.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveUrl(idx)}
                            className="absolute right-3 w-[16px] h-[16px] flex items-center justify-center text-[#CFA9A9] text-[13px] shrink-0"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handleAddUrl}
                      className="w-full h-[30px] rounded-full border border-[#F3CFCF] px-5 flex items-center gap-2 text-[14px] text-[#F3CFCF]"
                    >
                      <span className="text-[14px] ml-[-10px] leading-none">
                        <img src={Vector} alt="vector" />
                      </span>
                      추가 정보
                    </button>
                  </div>
                  <button onClick={handleInsertTip} disabled={submitting}
                    className="self-end w-[120px] h-[48px] rounded-[12px] text-white text-[18px] font-semibold shrink-0"
                    style={{ backgroundColor: "#F2B1B1", boxShadow: "0px 2px 6px rgba(0,0,0,0.08)" }}>
                    {submitting ? "올리는 중..." : "올리기"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PROGRESS */}
        {activeTab === "PROGRESS" && (
          <div className="ml-8 max-w-[1180px] px-8 pt-14">
            <div className="mb-10 flex items-center gap-2">
              <div className="inline-flex items-end gap-2 border-b-2 border-G500 pb-[2px]">
                <span className="text-[26px] font-bold leading-none">{id}</span>
                <span className="text-[13px] leading-none">STUDY</span>
              </div>
              <button className="-translate-y-[4px]" onClick={() => setShowExitModal(true)}>
                <GearIcon />
              </button>
            </div>

            {progressLoading ? (
              <div className="flex items-center justify-center h-[400px] text-[#999] text-[14px]">
                불러오는 중...
              </div>
            ) : (
              <div className="flex gap-14 items-start">
                <div className="w-[720px] flex flex-col gap-5">
                  <div className="h-[100px] rounded-[10px] px-6 py-5"
                    style={{ backgroundColor: "#FDF0F0", border: "1px solid #F5DCDC" }}>
                    <div className="text-[15px] font-semibold text-[#5B4B4B] mb-4">평균 진척도</div>
                    <div className="flex items-center gap-3">
                      <div className="relative flex-1 h-[22px] rounded-full overflow-hidden" style={{ backgroundColor: "#FFFFFF" }}>
                        <div className="absolute left-0 top-0 h-full rounded-full"
                          style={{ width: `${mainProgress}%`, backgroundColor: "#EDA7A7" }} />
                      </div>
                      <span className="text-[25px] font-bold text-[#5B4B4B] leading-none">{mainProgress}%</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {memberProgress.map((m, i) => (
                      <div key={i} className="flex items-center gap-4 px-2 py-2">
                        <Avatar src={m[1]} size={52} />
                        <div className="flex flex-col justify-center flex-1 min-w-0 gap-[8px]">
                          <span className="text-[13px] font-medium text-gray-700">{m[0]}</span>
                          <ProgressBar percent={toPercent(m[2])} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-[350px] flex flex-col gap-4">
                  <div className="flex items-center gap-4 rounded-[16px] px-5 py-4"
                    style={{ backgroundColor: "#FFF0F0", border: "1px solid #FADADD", boxShadow: "0px 2px 6px rgba(0,0,0,0.08)" }}>
                    <Avatar src={progressData?.profileImage} size={56} />
                    <div className="flex-1 min-w-0">
                      <div className="text-[14px] font-bold text-gray-700">
                        {progressData?.name ?? "불러오는 중..."}
                      </div>
                      <div className="relative w-full h-[24px] rounded-full overflow-hidden mt-3" style={{ backgroundColor: "white" }}>
                        <div className="absolute left-0 top-0 h-full rounded-full flex items-center justify-end pr-3"
                          style={{ width: `${myProgress}%`, backgroundColor: "#F5AFAF", minWidth: "70px" }}>
                          <span className="text-white text-[12px] font-semibold">{myProgress}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col p-4 rounded-[16px] bg-[#FFF8F8]">
                    <div className="relative mb-5">
                      <input type="text" value={topicSearch} onChange={(e) => handleSearch(e.target.value)}
                        placeholder="과목 검색"
                        className="w-full h-[36px] rounded-full border border-P300 bg-white pl-4 pr-10 outline-none text-[13px]" />
                    </div>
                    <div className="flex flex-col gap-4 h-[245px] overflow-y-auto pr-1">
                      {missions.length === 0 ? (
                        <div className="text-[13px] text-[#999] text-center mt-10">과목이 없습니다</div>
                      ) : (
                        missions.map(([subject, checked], index) => (
                          <CheckItem key={index} text={subject} checked={checked}
                            onToggle={() => handleToggleMission(subject)} />
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 스터디 탈퇴 모달 */}
        {showExitModal && (
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="w-[430px] h-[300px] bg-white rounded-[26px] flex flex-col items-center pt-8">
              <div className="text-[20px] font-bold text-[#222]">스터디 탈퇴</div>
              <div className="mt-14 text-[18px] text-[#444]">스터디를 탈퇴하시겠습니까?</div>
              <div className="flex gap-4 mt-14">
                <button onClick={() => { setShowExitModal(false); setShowConfirmModal(true); }}
                  className="w-[120px] h-[44px] rounded-full bg-[#A9A9A9] text-white text-[18px] font-semibold">
                  탈퇴
                </button>
                <button onClick={() => setShowExitModal(false)}
                  className="w-[120px] h-[44px] rounded-full bg-[#EEA9A9] text-white text-[18px] font-semibold">
                  취소
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 확인 모달 */}
        {showConfirmModal && (
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="w-[430px] h-[300px] bg-white rounded-[26px] flex flex-col items-center pt-8">
              <div className="text-[20px] font-bold text-[#222]">스터디 탈퇴</div>
              <div className="mt-14 text-[18px] text-[#444]">스터디를 탈퇴합니다.</div>
              <div className="flex gap-4 mt-14">
                <button onClick={handleConfirmLeave} disabled={leaving}
                  className="w-[120px] h-[44px] rounded-full bg-[#A9A9A9] text-white text-[18px] font-semibold">
                  {leaving ? "처리중..." : "확인"}
                </button>
                <button onClick={() => setShowConfirmModal(false)}
                  className="w-[120px] h-[44px] rounded-full bg-[#EEA9A9] text-white text-[18px] font-semibold">
                  취소
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}