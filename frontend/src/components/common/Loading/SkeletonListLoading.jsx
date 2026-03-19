import { ListGroup } from "react-bootstrap";

const SkeletonListLoading = ({ count = 5 }) => {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <ListGroup.Item key={i}>
          <div className="skeleton-text"></div>
        </ListGroup.Item>
      ))}
    </>
  );
};

export default SkeletonListLoading;