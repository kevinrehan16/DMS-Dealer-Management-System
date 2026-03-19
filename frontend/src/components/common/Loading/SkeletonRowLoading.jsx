import SkeletonLoading from "./SkeletonLoading";

const SkeletonRowLoading = ({ columns = 8 }) => {
  return (
    <tr>
      {[...Array(columns)].map((_, i) => (
        <td key={i}>
          <SkeletonLoading />
        </td>
      ))}
    </tr>
  );
};

export default SkeletonRowLoading;