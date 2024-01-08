import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const NetworthTableSkeletonLoader = () => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Category</th>
          <th scope="col">Type</th>
          <th scope="col">Assets</th>
          <th scope="col">Value (N)</th>
          <th scope="col">Value ($)</th>
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

export default NetworthTableSkeletonLoader;
