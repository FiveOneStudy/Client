import { CertificateItem } from './CertificateItem';

export function CertificateList({
  certifications,
  openMenu,
  onMenuClick,
  onDelete,
}) {
  return (
    <div className="w-[68%] flex flex-col overflow-auto">
      <div className="flex justify-center items-center px-2 py-2 border-b sticky top-0 bg-white">
        <div className="text-[16px] font-semibold">MY CERTIFICATE</div>
      </div>

      <div className="flex flex-col">
        {certifications.length === 0 ? (
          <div className="flex items-center justify-center py-8 text-gray-400 text-sm">
            등록된 자격증이 없습니다.
          </div>
        ) : (
          certifications.map((cert, index) => (
            <CertificateItem
              key={cert.id}
              {...cert}
              index={index}
              openMenu={openMenu}
              onMenuClick={() => onMenuClick(cert.id)}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
