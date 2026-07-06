import ApprovalTable from "../../components/admin/ApprovalTable";

export default function Admin() {
  return (
    <div>
      <h1 className="text-2xl font-semibold absolute top-10 left-28 ">
        관리자 승인 대기
      </h1>
      <div className="flex w-full h-96 mt-20 items-center justify-center">
        <ApprovalTable
          title="자격증 검증 대기"
          columns={[
            { key: "id", label: "ID" },
            { key: "certName", label: "자격증명" },
            { key: "issuer", label: "발급기관" },
            { key: "acquiredDate", label: "취득일" },
            { key: "status", label: "상태" },
            { key: "submittedAt", label: "신청일" },
          ]}
          data={[
            {
              id: 1,
              certName: "SQLD",
              issuer: "한국산업인력공단",
              acquiredDate: "2026.03.25",
              status: "PENDING",
              submittedAt: "2026.07.06",
            },
            // ...
          ]}
          page={1}
          totalPages={1}
          onPageChange={(page) => console.log("페이지 이동", page)}
          onApprove={(row) => console.log("승인", row.id)}
          onReject={(row) => console.log("거절", row.id)}
        />
      </div>
    </div>
  );
}
