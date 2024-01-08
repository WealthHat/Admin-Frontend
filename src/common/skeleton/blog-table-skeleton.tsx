import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BlogTableSkeletonLoader = () => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Category</th>
          <th scope="col">Title</th>
          <th scope="col">Annual</th>
          <th scope="col">Monthly</th>
          <th scope="col">Date</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr className="shaded">
          <td scope="row">
            <Skeleton height={25} width={25} />
          </td>
          <td scope="row">
            <Skeleton height={25} width={80} style={{ borderRadius: "25px" }} />
          </td>
          <td scope="row">
            <Skeleton height={25} width={80} style={{ borderRadius: "25px" }} />
          </td>
          <td scope="row">
            <Skeleton height={25} width={80} style={{ borderRadius: "25px" }} />
          </td>
          <td scope="row">
            <Skeleton height={25} width={80} style={{ borderRadius: "25px" }} />
          </td>
          <td scope="row">
            <Skeleton height={25} width={80} style={{ borderRadius: "25px" }} />
          </td>
          <td scope="row">
            <Skeleton height={25} width={80} style={{ borderRadius: "25px" }} />
          </td>
          <td scope="row">
            <Skeleton height={25} width={80} style={{ borderRadius: "25px" }} />
          </td>
        </tr>
        <tr className="shaded">
          <td scope="row">
            <Skeleton height={25} width={25} />
          </td>
          <td scope="row">
            <Skeleton height={25} width={80} style={{ borderRadius: "25px" }} />
          </td>
          <td scope="row">
            <Skeleton height={25} width={80} style={{ borderRadius: "25px" }} />
          </td>
          <td scope="row">
            <Skeleton height={25} width={80} style={{ borderRadius: "25px" }} />
          </td>
          <td scope="row">
            <Skeleton height={25} width={80} style={{ borderRadius: "25px" }} />
          </td>
          <td scope="row">
            <Skeleton height={25} width={80} style={{ borderRadius: "25px" }} />
          </td>
          <td scope="row">
            <Skeleton height={25} width={80} style={{ borderRadius: "25px" }} />
          </td>
          <td scope="row">
            <Skeleton height={25} width={80} style={{ borderRadius: "25px" }} />
          </td>
        </tr>
        <tr className="shaded">
          <td scope="row">
            <Skeleton height={25} width={25} />
          </td>
          <td scope="row">
            <Skeleton height={25} width={80} style={{ borderRadius: "25px" }} />
          </td>
          <td scope="row">
            <Skeleton height={25} width={80} style={{ borderRadius: "25px" }} />
          </td>
          <td scope="row">
            <Skeleton height={25} width={80} style={{ borderRadius: "25px" }} />
          </td>
          <td scope="row">
            <Skeleton height={25} width={80} style={{ borderRadius: "25px" }} />
          </td>
          <td scope="row">
            <Skeleton height={25} width={80} style={{ borderRadius: "25px" }} />
          </td>
          <td scope="row">
            <Skeleton height={25} width={80} style={{ borderRadius: "25px" }} />
          </td>
          <td scope="row">
            <Skeleton height={25} width={80} style={{ borderRadius: "25px" }} />
          </td>
        </tr>
        <tr className="shaded">
          <td scope="row">
            <Skeleton height={25} width={25} />
          </td>
          <td scope="row">
            <Skeleton height={25} width={80} style={{ borderRadius: "25px" }} />
          </td>
          <td scope="row">
            <Skeleton height={25} width={80} style={{ borderRadius: "25px" }} />
          </td>
          <td scope="row">
            <Skeleton height={25} width={80} style={{ borderRadius: "25px" }} />
          </td>
          <td scope="row">
            <Skeleton height={25} width={80} style={{ borderRadius: "25px" }} />
          </td>
          <td scope="row">
            <Skeleton height={25} width={80} style={{ borderRadius: "25px" }} />
          </td>
          <td scope="row">
            <Skeleton height={25} width={80} style={{ borderRadius: "25px" }} />
          </td>
          <td scope="row">
            <Skeleton height={25} width={80} style={{ borderRadius: "25px" }} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default BlogTableSkeletonLoader;
