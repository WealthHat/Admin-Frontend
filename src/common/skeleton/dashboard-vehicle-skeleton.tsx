import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DashboardVehicleSkeletonLoader = () => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Activated</th>
          <th scope="col">Onboarded</th>
          <th scope="col">Profiled</th>
          <th scope="col">Action</th>
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
            <Skeleton height={25} width={25} />
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
            <Skeleton height={25} width={25} />
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
            <Skeleton height={25} width={25} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default DashboardVehicleSkeletonLoader;
