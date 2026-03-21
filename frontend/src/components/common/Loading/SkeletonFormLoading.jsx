import SkeletonLoading from "./SkeletonLoading";

const SkeletonFormLoading = ({ fields = 6, labelWidth = "30%", inputWidth = "70%", gap = "12px" }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: gap,
        padding: "10px",
      }}
    >
      {[...Array(fields)].map((_, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Label placeholder */}
          <SkeletonLoading width={labelWidth} height="14px" />
          {/* Input placeholder */}
          <SkeletonLoading width={inputWidth} height="20px" />
        </div>
      ))}
    </div>
  );
};

export default SkeletonFormLoading;