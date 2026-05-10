import { useState } from "react";
import { useParams } from "react-router-dom";
import profileSvg from "../../assets/profile.svg";


const members = [
  { name: "주예진", percent: 80 },
  { name: "함성우", percent: 60 },
  { name: "정하진", percent: 45 },
  { name: "이시준", percent: 70 },
  { name: "이시화", percent: 30 },
  { name: "한성우", percent: 55 },
  { name: "송현영", percent: 20 },
  { name: "에환선", percent: 40 },
];

const topics = [
  "선사시대 ~ 고조선",
  "여러 나라의 성장",
  "삼국 시대",
  "남북국 시대",
  "고려",
  "조선 전기",
  "조선 후기",
  "근대 (개항기)",
];

const tipPosts = [
  {
    title: "컴퓨터활용능력 1급",
    author: "작성자",
    date: "2026.03.30",
    content: `다들 컴활 어떻게 공부하고 계신가요...ㅠㅠ
지금 공부한지 2달 되어 가는데 제가 하는 공부법이 맞는지 잘 모르겠어요ㅠㅠㅠ

저는 하루에 거의 5~6시간씩 하고 간간 독서실 가서 공부하거든요..
일단 개념은 어느정도 다 봤고 모의고사 풀고 있습니다!

이 정도 공부하면 되겠지 싶어서 접수하고 실기 봤는데.. 50점도 못 넘었어요,,,

저만 이런가요?
제 공부법이 이상한건가요,,,

다들 어떻게 공부하시는지 알려주세요!!!!!

참고로 필기는 1트에 땄어요,,!
댓글 많이 써주세요....................🖤`,
  },
  {
    title: "한국사 공부법",
    author: "이서준",
    date: "2026.03.31",
    content: "한국사 공부 팁 공유합니다!",
  },
  {
    title: "토익 후기",
    author: "주예진",
    date: "2026.04.01",
    content: "토익 공부 진짜 힘들다...",
  },
  {
    title: "정처기 합격",
    author: "함성우",
    date: "2026.04.02",
    content: "정처기 드디어 합격!",
  },
  {
    title: "면접 팁",
    author: "정하진",
    date: "2026.04.03",
    content: "면접 준비는 이렇게 했어요",
  },
  {
    title: "한능검 공부",
    author: "이시준",
    date: "2026.04.04",
    content: "한능검 암기법 공유",
  },
  {
    title: "정보처리기사",
    author: "한성우",
    date: "2026.04.05",
    content: "실기 준비중...",
  },
  {
    title: "자격증 추천",
    author: "송현영",
    date: "2026.04.06",
    content: "고등학생 때 따면 좋은 자격증",
  },
];

function ProgressBar({ percent }) {
  return (
    <div
      className="relative w-full h-[27px] rounded-full overflow-hidden border-[2px]"
      style={{
        backgroundColor: "#F9DFDF",
        borderColor: "#F9DFDF",
      }}
    >
      <div
        className="absolute left-0 top-0 h-full rounded-full"
        style={{
          width: `${percent}%`,
          backgroundColor: "white",
        }}
      />
    </div>
  );
}

function Avatar({ size = 44 }) {
  return (
    <img
      src={profileSvg}
      alt="profile"
      style={{ width: size, height: size }}
      className="rounded-full object-cover shrink-0"
    />
  );
}

function CheckItem({ text, checked, onToggle }) {
  return (
    <div
      onClick={onToggle}
      className="flex items-center gap-2 cursor-pointer py-1"
    >
      <div
        className={`
          w-[20px] h-[20px]
          rounded-[2px]
          border
          flex items-center justify-center
          transition-all
          ${
            checked
              ? "border-[#F4CACA] bg-[#FFF7F7]"
              : "border-[#E5DADA] bg-transparent"
          }
        `}
      >
        {checked && (
          <svg
            viewBox="0 0 24 24"
            className="w-[14px] h-[14px]"
            fill="none"
            stroke="#F4B3B3"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17L4 12" />
          </svg>
        )}
      </div>

      <span
        className={`text-[14px] ${
          checked ? "text-[#6E6E6E]" : "text-[#7B7B7B]"
        }`}
      >
        {text}
      </span>
    </div>
  );
}

export default function MyStudyPage() {
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState("TIPS");
  const [topicSearch, setTopicSearch] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPostMenu, setShowPostMenu] = useState(false);

  const [checkedTopics, setCheckedTopics] = useState([
    true,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
  ]);

  const avgPercent = Math.round(
    members.reduce((s, m) => s + m.percent, 0) / members.length
  );

  const topMember = members.reduce((a, b) =>
    a.percent > b.percent ? a : b
  );

  const toggleTopic = (index) => {
    const updated = [...checkedTopics];
    updated[index] = !updated[index];
    setCheckedTopics(updated);
  };

  return (
    <div className="flex">
      {/* ================= 좌측 사이드 ================= */}
      <div className="w-[220px] h-[705px] border-r border-G200 shrink-0">
        <div className="p-4 text-[14px] font-semibold border-b border-G200">
          &lt; STUDY
        </div>

        {/* TIPS */}
        <div
          onClick={() => setActiveTab("TIPS")}
          className={`
            p-4 border-b border-G200
            flex items-center justify-center gap-2
            cursor-pointer transition-all
            ${
              activeTab === "TIPS"
                ? "bg-[#E6E6E7]"
                : "bg-white"
            }
          `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="black"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 18h6M10 22h4M12 2a7 7 0 00-4 12c.5.6 1 1.5 1 2h6c0-.5.5-1.4 1-2a7 7 0 00-4-12z"
            />
          </svg>

          <span className="text-[13px] font-extrabold">
            TIPS
          </span>
        </div>

        {/* 글 작성하기 */}
        <div
          onClick={() => setActiveTab("WRITING")}
          className={`
            py-3 border-b border-G200
            text-[13px] text-center cursor-pointer
            transition-all
            ${
              activeTab === "WRITING"
                ? "bg-[#E6E6E7] text-black"
                : "bg-white text-[#B9B9B9]"
            }
          `}
        >
          글 작성하기
        </div>

        {/* PROGRESS */}
        <div
          onClick={() => setActiveTab("PROGRESS")}
          className={`
            py-3 border-b border-G200
            text-[13px] text-center cursor-pointer
            transition-all
            ${
              activeTab === "PROGRESS"
                ? "bg-[#E6E6E7] text-black font-bold"
                : "bg-white text-[#B9B9B9]"
            }
          `}
        >
          <div className="flex items-center justify-center gap-[6px]">
            <span>PROGRESS</span>
          </div>
        </div>
      </div>

      {/* ================= 메인 ================= */}
      <div className="flex-1">

        {/* ================= TIPS ================= */}
        {activeTab === "TIPS" && (
          <>
            {!selectedPost ? (
              <div className="ml-8 max-w-[1000px] px-8 pt-14">

                {/* 상단 */}
                <div className="mb-8 flex items-center gap-2">

                  {/* 제목 */}
                  <div className="inline-flex items-end gap-2 border-b-2 border-G500 pb-[2px]">
                    <span className="text-[26px] font-bold leading-none">
                      한능검
                    </span>
                    <span className="text-[13px] leading-none">
                      STUDY
                    </span>
                  </div>

                  {/* 톱니바퀴 */}
                  <button
                    className="-translate-y-[4px]"
                    onClick={() => setShowExitModal(true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-black"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.983 13.938a1.955 1.955 0 100-3.91 1.955 1.955 0 000 3.91z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18.063 13.938a1 1 0 00.2 1.1l.036.036a2 2 0 11-2.829 2.829l-.036-.036a1 1 0 00-1.1-.2 1 1 0 00-.6.92V19a2 2 0 11-4 0v-.051a1 1 0 00-.6-.92 1 1 0 00-1.1.2l-.036.036a2 2 0 11-2.829-2.829l.036-.036a1 1 0 00.2-1.1 1 1 0 00-.92-.6H5a2 2 0 110-4h.051a1 1 0 00.92-.6 1 1 0 00-.2-1.1l-.036-.036a2 2 0 112.829-2.829l.036.036a1 1 0 001.1.2h.001a1 1 0 00.599-.92V5a2 2 0 114 0v.051a1 1 0 00.6.92 1 1 0 001.1-.2l.036-.036a2 2 0 112.829 2.829l-.036.036a1 1 0 00-.2 1.1v.001a1 1 0 00.92.599H19a2 2 0 110 4h-.051a1 1 0 00-.92.6z"
                      />
                    </svg>
                  </button>

                </div>

                <div className="grid grid-cols-4 gap-7 mt-24 ml-20">
                  {tipPosts.map((post, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedPost(post)}
                      className="cursor-pointer hover:scale-[1.02] transition-all"
                    >
                      <div className="w-full h-[120px] rounded-[10px] flex items-center justify-center border border-[#E5E5E5] bg-white">
                        <span className="text-gray-400 text-[10px]">
                          이미지
                        </span>
                      </div>

                      <div className="text-[11px] text-[#4E4F51] mt-2">
                        {post.author}
                      </div>

                      <div className="flex justify-between items-center mt-1 border-b border-G200 pb-1">
                        <div className="text-[17px] truncate">
                          {post.title}
                        </div>
                        <div className="text-[10px] text-G500">
                          {post.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
        
  <div className="w-full flex justify-center pt-10 px-10">
  <div className="w-full max-w-[800px]">

                  <div
                    className="text-[11px] text-[#666] mb-4 cursor-pointer"
                    onClick={() => setSelectedPost(null)}
                  >
                    &lt; 되돌아가기
                  </div>

                  {/* 제목 + 점 3개 */}
                  <div className="flex items-start justify-between">
                    <div className="text-[42px] font-bold text-[#222]">
                      {selectedPost.title}
                    </div>

                    {/* 점 3개 버튼 */}
<div className="relative mt-3">
  <button
    onClick={() => setShowPostMenu((prev) => !prev)}
    className="flex items-center justify-center gap-[5px] p-2"
  >
    <span className="w-[4px] h-[4px] rounded-full bg-[#888]" />
    <span className="w-[4px] h-[4px] rounded-full bg-[#888]" />
    <span className="w-[4px] h-[4px] rounded-full bg-[#888]" />
  </button>

  {showPostMenu && (
    <div className="absolute right-0 top-9 w-[90px] bg-white border border-G200 rounded-[8px] shadow-md z-10">
      <button
        onClick={() => {
          setShowPostMenu(false);
          setSelectedPost(null);
        }}
        className="w-full text-left px-4 py-2 text-[13px] text-[#888] hover:bg-[#FFF5F5] rounded-[8px]"
      >
        삭제하기
      </button>
    </div>
  )}
</div>
                  </div>
                  <div className="flex items-center gap-3 mt-5">
                    <Avatar size={34} />
                    <div>
                      <div className="text-[12px] font-semibold">
                        {selectedPost.author}
                      </div>
                      <div className="text-[10px] text-[#999]">
                        {selectedPost.date} 조회
                      </div>
                    </div>
                  </div>

                  <div className="w-full h-[1px] bg-[#D9D9D9] mt-4 mb-5" />

                  <div
                    className="
                      text-[15px]
                      leading-[2]
                      text-[#555]
                      whitespace-pre-line
                      min-h-[260px]
                    "
                  >
                    {selectedPost.content}
                  </div>

                  <div className="w-full h-[1px] bg-[#D9D9D9] mt-10 mb-4" />

                  <input
                    type="text"
                    placeholder="도서 정보 | 에세코 저자명 책"
                    className="
                      w-full
                      h-[30px]
                      rounded-full
                      border
                      border-[#F3CFCF]
                      px-5
                      text-[12px]
                      outline-none
                      placeholder:text-[#E8B1B1]
                    "
                  />
                </div>
              </div>
            )}
          </>
        )}

        {/* ================= WRITING ================= */}
        {activeTab === "WRITING" && (
          <div className="w-full flex justify-center pt-10">
            <div className="w-[800px]">

              <div
                className="text-[11px] text-[#666] mb-2 cursor-pointer"
                onClick={() => setActiveTab("TIPS")}
              >
                &lt; 되돌아가기
              </div>

              <div
                className="
                  w-full
                  h-[580px]
                  rounded-[10px]
                  p-8
                  flex flex-col
                "
                style={{
                  border: "1px solid #F5DADA",
                  backgroundColor: "white",
                }}
              >
                {/* 제목 */}
                <input
                  type="text"
                  defaultValue="컴퓨터활용능력 1급 합격 후기"
                  className="
                    w-full
                    text-[30px]
                    font-bold
                    outline-none
                    border-b
                    border-[#D8D8D8]
                    pb-3
                    shrink-0
                  "
                />

                {/* 내용 */}
                <textarea
                  defaultValue="안녕하세요"
                  className="
                    w-full
                    flex-1
                    resize-none
                    outline-none
                    mt-6
                    text-[16px]
                    leading-relaxed
                    min-h-0
                  "
                />

                {/* 아래 영역 */}
                <div className="mt-6 flex items-center gap-5 shrink-0">

                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="도서 정보 URL"
                      className="
                        placeholder:text-[#F5AFAF]
                        w-full
                        h-[30px]
                        rounded-full
                        border
                        border-[#F3CFCF]
                        px-5
                        text-[14px]
                        outline-none
                      "
                    />

                    <div
                      className="
                        mt-3
                        h-[32px]
                        rounded-full
                        border
                        border-P300
                        flex
                        items-center
                        px-5
                        text-[13px]
                        text-P300
                      "
                    >
                      + 추가 정보
                    </div>
                  </div>

                  <button
                    className="
                      w-[120px]
                      h-[48px]
                      rounded-[12px]
                      text-white
                      text-[18px]
                      font-semibold
                      shrink-0
                    "
                    style={{
                      backgroundColor: "#F2B1B1",
                      boxShadow: "0px 2px 6px rgba(0,0,0,0.08)",
                    }}
                  >
                    올리기
                  </button>

                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= PROGRESS ================= */}
        {activeTab === "PROGRESS" && (
          <div className="ml-8 max-w-[1180px] px-8 pt-14">
            <div className="mb-10">
              <div className="inline-flex items-end gap-2 border-b-2 border-G500 pb-[2px]">
                <span className="text-[26px] font-bold leading-none">
                  한능검
                </span>
                <span className="text-[13px] leading-none">
                  STUDY
                </span>
              </div>
            </div>

            <div className="flex gap-14 items-start">

              {/* 왼쪽 */}
              <div className="w-[720px] flex flex-col gap-5">

                <div
                  className="h-[100px] rounded-[10px] px-6 py-5"
                  style={{
                    backgroundColor: "#FDF0F0",
                    border: "1px solid #F5DCDC",
                  }}
                >
                  <div className="text-[15px] font-semibold text-[#5B4B4B] mb-4">
                    평균 진척도
                  </div>

                  <div className="flex items-center gap-3">
                    <div
                      className="relative flex-1 h-[22px] rounded-full overflow-hidden"
                      style={{ backgroundColor: "#FFFFFF" }}
                    >
                      <div
                        className="absolute left-0 top-0 h-full rounded-full"
                        style={{
                          width: `${avgPercent}%`,
                          backgroundColor: "#EDA7A7",
                        }}
                      />
                    </div>

                    <span className="text-[25px] font-bold text-[#5B4B4B] leading-none">
                      {avgPercent}%
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {members.map((m, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 px-2 py-2"
                    >
                      <Avatar size={52} />
                      <div className="flex flex-col justify-center flex-1 min-w-0 gap-[8px]">
                        <span className="text-[13px] font-medium text-gray-700">
                          {m.name}
                        </span>
                        <ProgressBar percent={m.percent} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

             {/* 오른쪽 */}
              <div className="w-[350px] flex flex-col gap-4">

                {/* 1등 */}
                <div
                  className="flex items-center gap-4 rounded-[16px] px-5 py-4"
                  style={{
                    backgroundColor: "#FFF0F0",
                    border: "1px solid #FADADD",
                    boxShadow: "0px 2px 6px rgba(0,0,0,0.08)",
                  }}
                >
                  <Avatar size={56} />

                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-bold text-gray-700">
                      {topMember.name}
                    </div>

                    <div
                      className="relative w-full h-[24px] rounded-full overflow-hidden mt-3"
                      style={{
                        backgroundColor: "white",
                      }}
                    >
                      <div
                        className="absolute left-0 top-0 h-full rounded-full flex items-center justify-end pr-3"
                        style={{
                          width: `${topMember.percent}%`,
                          backgroundColor: "#F5AFAF",
                          minWidth: "70px",
                        }}
                      >
                        <span className="text-white text-[12px] font-semibold">
                          {topMember.percent}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="flex flex-col p-4 rounded-[16px] bg-[#FFF8F8]">
                  <div className="relative mb-5">
                    <input
                      type="text"
                      value={topicSearch}
                      onChange={(e) => setTopicSearch(e.target.value)}
                      className="w-full h-[36px] rounded-full border border-P300 bg-white pl-4 pr-10 outline-none text-[13px]"
                    />
                  </div>

                  <div className="flex flex-col gap-4 h-[245px] overflow-y-auto pr-1">
                    {topics
                      .map((topic, index) => ({ topic, index }))
                      .filter(({ topic }) => topic.includes(topicSearch))
                      .map(({ topic, index }) => (
                        <CheckItem
                          key={index}
                          text={topic}
                          checked={checkedTopics[index]}
                          onToggle={() => toggleTopic(index)}
                        />
                      ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ================= 스터디 탈퇴 모달 ================= */}
        {showExitModal && (
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="w-[430px] h-[300px] bg-white rounded-[26px] flex flex-col items-center pt-8">

              <div className="text-[20px] font-bold text-[#222]">
                스터디 탈퇴
              </div>

              <div className="mt-14 text-[18px] text-[#444]">
                스터디를 탈퇴하시겠습니까?
              </div>

              <div className="flex gap-4 mt-14">
                <button
                  onClick={() => {
                    setShowExitModal(false);
                    setShowConfirmModal(true);
                  }}
                  className="
                    w-[120px] h-[44px] rounded-full
                    bg-[#A9A9A9] text-white text-[18px] font-semibold
                  "
                >
                  탈퇴
                </button>

                <button
                  onClick={() => setShowExitModal(false)}
                  className="
                    w-[120px] h-[44px] rounded-full
                    bg-[#EEA9A9] text-white text-[18px] font-semibold
                  "
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= 확인 모달 ================= */}
        {showConfirmModal && (
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="w-[430px] h-[300px] bg-white rounded-[26px] flex flex-col items-center pt-8">

              <div className="text-[20px] font-bold text-[#222]">
                스터디 탈퇴
              </div>

              <div className="mt-14 text-[18px] text-[#444]">
                스터디를 탈퇴합니다.
              </div>

              <div className="flex gap-4 mt-14">
                <button
                  onClick={() => { window.location.href = "/study"; }}
                  className="
                    w-[120px] h-[44px] rounded-full
                    bg-[#A9A9A9] text-white text-[18px] font-semibold
                  "
                >
                  확인
                </button>

                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="
                    w-[120px] h-[44px] rounded-full
                    bg-[#EEA9A9] text-white text-[18px] font-semibold
                  "
                >
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