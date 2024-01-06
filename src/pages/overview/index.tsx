import React, { useContext, useEffect, useState } from "react";
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
import { DataContext } from "@/store/GlobalState";
import { GetRequest } from "@/utils/request";
import Skeleton from "react-loading-skeleton";


interface Payload {
  email: string;
  password: string;
}

export default function Overview() {
  // router
  const router = useRouter();

  // PageLoader
  const [pageLoading, setPageLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const { state } = useContext(DataContext);
  const [transactionCount, setTransactionCount] = useState(null);
  const [availableRiders, setAvailableRiders] = useState(null);
  const [fleetCount, setFleetCount] = useState(null);
  const [orderCount, setOrderCount] = useState(null);
  const [count, setCount] = useState(null);

  // get dashboard count
  useEffect(() => {
    if (state?.token) {
      const getCount = async () => {
        const res = await GetRequest("/admin/dashboard-count", state.token);

        if (res.status === 200 || res.status === 201) {
          setCount(res.data.count);
          setLoading(false);
        } else {
          setLoading(false);
        }
      };
      getCount();
    }
  }, [state?.token]);

  // responsive slider on smaller devices
  let settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
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
                  <div className="cards">
                    <p className="">All Users</p>
                    <div className="d-flex align-items-end justify-content-between">
                    {loading ? (
                      <Loading
                    height="25px"
                    width="25px"
                    primaryColor="#000"
                    secondaryColor="#000"
                  />
                    ) : (
                      <h4 className="mb-0 ">{count?.users}</h4>
                    )}
                    </div>
                  </div>
                </div>

                <div className="col columns">
                  <div className="cards">
                    <p>All Agents</p>
                    <div className="d-flex align-items-end justify-content-between">
                      {loading ? (
                         <Loading
                    height="25px"
                    width="25px"
                    primaryColor="#000"
                    secondaryColor="#000"
                  />
                      ) : (
                        <h4 className="mb-0 ">{count?.agents}</h4>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col columns">
                  <div className="cards">
                    <p>Budgets</p>
                    <div className="d-flex align-items-end justify-content-between">
                        {loading ? (
                         <Loading
                    height="25px"
                    width="25px"
                    primaryColor="#000"
                    secondaryColor="#000"
                  />
                      ) : (
                        <h4 className="mb-0 ">{count?.budget}</h4>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col columns">
                  <div className="cards">
                    <p>Networths</p>
                    <div className="d-flex align-items-end justify-content-between">
                       {loading ? (
                         <Loading
                    height="25px"
                    width="25px"
                    primaryColor="#000"
                    secondaryColor="#000"
                  />
                      ) : (
                        <h4 className="mb-0 ">{count?.networth}</h4>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col columns">
                  <div className="cards">
                    <p>Performance</p>
                    <div className="d-flex align-items-end justify-content-between">
                        {loading ? (
                         <Loading
                    height="25px"
                    width="25px"
                    primaryColor="#000"
                    secondaryColor="#000"
                  />
                      ) : (
                        <h4 className="mb-0 ">{count?.performance}</h4>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col columns">
                  <div className="cards">
                    <p>Blogs</p>
                    <div className="d-flex align-items-end justify-content-between">
                        {loading ? (
                         <Loading
                    height="25px"
                    width="25px"
                    primaryColor="#000"
                    secondaryColor="#000"
                  />
                      ) : (
                        <h4 className="mb-0 ">{count?.blogs}</h4>
                      )}
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
                  <h4>Networths</h4>

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
                  <h4>Performance</h4>

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
                <h3>Budgets</h3>

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
