import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import cogoToast from "cogo-toast";
import Loading from "@/common/loading";
import Nav from "@/components/nav";
import Slider from "react-slick";
import Link from "next/link";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";
import ViewIcon from "@/svg/ViewIcon";
import Donutchart from "@/common/charts/donutchart";
import BarChart2 from "@/common/charts/barchart2";
import BarCharts from "@/common/charts/barcharts";

interface Payload {
  email: string;
  password: string;
}

export default function Overview() {
  // router
  const router = useRouter();

  // PageLoader
  const [pageLoading, setPageLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  // const { user, token } = useSelector((state: any) => state.auth);
  const [transactionCount, setTransactionCount] = useState(null);
  const [availableRiders, setAvailableRiders] = useState(null);
  const [fleetCount, setFleetCount] = useState(null);
  const [orderCount, setOrderCount] = useState(null);

  // responsive slider on smaller devices
  let settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 1233,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1053,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 430,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  if (pageLoading) return;

  return (
    <>
      <Nav />
      <div className="container-fliud dashboard-content-container">
        <div className="statistics">
          {/* summary  */}
          <div className="summary">
            <div className="row p-2">
              <Slider {...settings}>
                <div className="col columns">
                  <div className="card">
                    <p>Total Orders</p>
                    <div className="d-flex align-items-end justify-content-between">
                      <h4 className="mb-0">107</h4>
                    </div>
                  </div>
                </div>

                <div className="col columns">
                  <div className="card">
                    <p>Delivered Orders</p>
                    <div className="d-flex align-items-end justify-content-between">
                      <h4 className="mb-0">99</h4>
                    </div>
                  </div>
                </div>

                <div className="col columns">
                  <div className="card">
                    <p>Ongoing Orders</p>
                    <div className="d-flex align-items-end justify-content-between">
                      <h4 className="mb-0">78</h4>
                    </div>
                  </div>
                </div>

                <div className="col columns">
                  <div className="card">
                    <p>Processing Orders</p>
                    <div className="d-flex align-items-end justify-content-between">
                      <h4 className="mb-0">57</h4>
                    </div>
                  </div>
                </div>

                <div className="col columns">
                  <div className="card">
                    <p>Scheduled Orders</p>
                    <div className="d-flex align-items-end justify-content-between">
                      <h4 className="mb-0">89</h4>
                    </div>
                  </div>
                </div>
              </Slider>
            </div>
          </div>

          {/* overview  */}
          <div className="row graph-overview">
            <div className="col-6 col-left">
              <div className="overview-left">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4>Weekly orders</h4>
                  {/* <div className="date-box">
                    <span>{trackDate(startWeek)}</span>
                    <span> - </span>
                    <span>{trackDate(endWeek)}</span>
                  </div> */}
                </div>

                {/* <BarCharts orderCount={orderCount} /> */}
              </div>
            </div>

            {/* right section */}
            <div className="col-6 col-right">
              <div className="overview-right">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4>Monthly transaction</h4>

                  {/* <div className="date-box">
                    <span>{trackDate(startYear)}</span>
                    <span> - </span>
                    <span>{trackDate(endYear)}</span>
                  </div> */}
                </div>

                {/* <BarChart2 transactionCount={transactionCount} /> */}
              </div>
            </div>
          </div>

          {/* all fleets */}
          <div className="row mt-4 graph-overview">
            <div className="col-5">
              <div className="fleet">
                <h3>All fleets</h3>

                <hr className="rule" />

                {/* <Donutchart fleetCount={fleetCount} /> */}
              </div>
            </div>

            <div className="col-7">
              <div className="riders">
                <div className="riders-heading">
                  <h3>New Users</h3>

                  <hr className="rule" />

                  <Link href="/riders-management">See all</Link>
                </div>

                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Vehicle</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="shaded">
                      <td scope="row">1</td>
                      <td scope="row">Ayodeji Oladimeji</td>
                      <td scope="row" style={{ textTransform: "capitalize" }}>
                        Van
                      </td>
                      <td scope="row">Status</td>
                      <td scope="row">
                        <Tooltip
                          placement="top"
                          overlay={<span>View User</span>}
                        >
                          <small className="order-action">
                            <ViewIcon />
                          </small>
                        </Tooltip>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
