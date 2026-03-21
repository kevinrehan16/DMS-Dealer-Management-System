import { ListGroup } from "react-bootstrap";
import SkeletonLoading from "./SkeletonLoading";

const SkeletonListLoading = ({ count = 5 }) => {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <ListGroup.Item key={i}>
          <SkeletonLoading />
        </ListGroup.Item>
      ))}
    </>
  );
};

export default SkeletonListLoading;