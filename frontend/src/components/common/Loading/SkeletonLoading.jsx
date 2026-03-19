import "../../../assets/css/AdminLayout.css"

const SkeletonLoading = ({ width = "100%", height = "12px", className = "" }) => {
  return (
    <div
      className={`skeleton-text ${className}`}
      style={{
        width,
        height,
        borderRadius: "4px"
      }}
    ></div>
  );
};

export default SkeletonLoading;