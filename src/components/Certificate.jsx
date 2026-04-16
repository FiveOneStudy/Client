import profileIcon from '../assets/profile.png';

const CERTIFICATES = [
  '컴퓨터활용능력 1급',
  '한국사능력검정시험 1급',
  'SQLD',
];

export default function Certificate() {
  return (
    <div className="w-[260px] h-full relative flex flex-col items-center pt-6">

      {/* 왼쪽 세로 라인 */}
      <div className="absolute left-0 top-0 w-[2px] h-full bg-[#F5AFAF]" />

      {/* 프로필 */}
      <img
        src={profileIcon}
        className="w-[90px] mb-4"
      />

      {/* 타이틀 */}
      <div className="text-[16px] font-bold mb-6">
        MY CERTIFICATE
      </div>

      {/* 리스트 */}
      <div className="w-full flex flex-col gap-4 px-4">
        {CERTIFICATES.map((cert, idx) => (
          <div
            key={idx}
            className="relative bg-white px-4 py-2 rounded-md shadow-[0_2px_6px_rgba(0,0,0,0.2)] text-sm"
          >
            {/* 왼쪽 포인트 라인 */}
            <div className="absolute left-0 top-0 h-full w-[3px] bg-[#F5AFAF] rounded-l-md"></div>

            {cert}
          </div>
        ))}
      </div>

    </div>
  );
}