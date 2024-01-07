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
import DashboardVehicleSkeletonLoader from "@/common/skeleton/dashboard-vehicle-skeleton";
import { trackDate, trackDates } from "@/utils/utils";
import { currentYear, getYearDates } from "@/utils/yeardate";
import Layout from "@/components/Layout";

interface Payload {
  email: string;
  password: string;
}

export default function Overview() {
  // router
  const router = useRouter();

  // PageLoader
  const [loading, setLoading] = useState(true);
  const { state } = useContext(DataContext);
  const [networthData, setNetworthData] = useState(null);
  const [count, setCount] = useState(null);
  const [users, setUsers] = useState(null);
  const [networthloading, setNetworthloading] = useState(true);
  const [startYear, setStartYear] = useState(null);
  const [endYear, setEndYear] = useState(null);
  const [currency, setCurrency] = useState("naira");
  const [callback, setCallback] = useState(false);

  // get the year date
  useEffect(() => {
    // Get the current year
  }, []);

  // get dashboard count
  useEffect(() => {
    if (state?.token) {
      const getCount = async () => {
        const res = await GetRequest("/admin/dashboard-count", state.token);

        if (res?.status === 200 || res?.status === 201) {
          setCount(res.data.count);
          setUsers(res.data.users);
          setLoading(false);
        } else {
          setLoading(false);
        }
      };
      getCount();
    }
  }, [state?.token]);

  // get networth chart
  useEffect(() => {
    setNetworthloading(true);
    if (state?.token) {
      const getNetworthChart = async () => {
        const years = currentYear();

        const res = await GetRequest(
          `/admin/networth-chart?currency=${currency}&start_date=${years.startYear}&end_date=${years.endYear}`,
          state?.token
        );

        if (res?.status === 200 || res?.status === 201) {
          setNetworthData(res.data.filteredData);
          setNetworthloading(false);
        } else {
          setNetworthloading(false);
        }
      };
      getNetworthChart();
    }
  }, [state?.token, callback]);

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

  return (
    <Layout>
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
                    <span>{trackDate(startYear)}</span>
                    <span> - </span>
                    <span>{trackDate(endYear)}</span>
                  </div> */}

                  <select
                    value={currency}
                    onChange={(e) => {
                      setCurrency(e.target.value), setCallback(!callback);
                    }}
                    className="form-select"
                  >
                    <option value="naira">Naira</option>
                    <option value="dollar">Dollar</option>
                  </select>
                </div>

                {networthloading ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "50px",
                    }}
                  >
                    <Loading
                      height="40px"
                      width="40px"
                      primaryColor="#000"
                      secondaryColor="#000"
                    />
                  </div>
                ) : (
                  <BarChart2 transactionCount={networthData} />
                )}
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

                {loading ? (
                  <DashboardVehicleSkeletonLoader />
                ) : (
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        {/* <th scope="col">Email</th> */}
                        <th scope="col">Activated</th>
                        <th scope="col">Onboarded</th>
                        <th scope="col">Profiled</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {users?.map((item, index) => (
                        <tr className="shaded" key={index}>
                          <td scope="row">{index + 1}</td>
                          <td scope="row">
                            {item.firstname} {item.lastname}
                          </td>
                          {/* <td scope="row">{item.email}</td> */}
                          <td scope="row">{item.isActivated ? "Yes" : "No"}</td>
                          <td scope="row">{item.isOnboarded ? "Yes" : "No"}</td>
                          <td scope="row">{item.isProfiled ? "Yes" : "No"}</td>
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
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
