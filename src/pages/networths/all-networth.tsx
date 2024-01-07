import React, { useContext, useEffect, useState } from "react";
import Nav from "../../components/nav";
import Layout from "@/components/Layout";
import { GetRequest } from "@/utils/request";
import { DataContext } from "@/store/GlobalState";
import NetworthTableSkeletonLoader from "@/common/skeleton/networth-table-skeleton";
import { formatMoney, removeNum } from "@/utils/utils";
import { sortCategory, sortTypes } from "@/utils/filter";
import Tooltip from "rc-tooltip";
import ViewIcon from "@/svg/ViewIcon";

interface Props {}

const AllNetworth = (props: Props) => {
  const [networths, setNetworths] = useState(null);
  const [networthloading, setNetworthloading] = useState(true);
  const { state } = useContext(DataContext);
  const [categories, setCategories] = useState("");
  const [types, setTypes] = useState("");

  // get all networths
  useEffect(() => {
    if (state?.token) {
      setNetworthloading(true);

      const getNetworth = async () => {
        const res = await GetRequest(`/admin/all-networth`, state?.token);
        if (res?.status === 200 || res?.status === 201) {
          setNetworths(res.data);
          setNetworthloading(false);
        } else {
          setNetworthloading(false);
        }
      };
      getNetworth();
    }
  }, [state?.token]);

  // sorted and filtered data
  const categorySort = sortCategory(networths, categories);
  const sortedData = sortTypes(categorySort, types);

  // get the total value
  const nairatotal = sortedData?.reduce(
    (acc, item) => acc + Number(removeNum(item.current_value_naira)),
    0
  );
  const dollartotal = sortedData?.reduce(
    (acc, item) => acc + Number(removeNum(item.current_value_dollar)),
    0
  );

  //
  return (
    <Layout>
      <div className="networth">
        <div className="all-networths">
          <div className="heading">
            <h1>All Networths</h1>

            <div className="dropdown">
              <select
                value={categories}
                onChange={(e) => setCategories(e.target.value)}
                className="form-select"
              >
                <option defaultValue="">Category</option>
                <option value="1">Real Assets</option>
                <option value="2">Liquid Assets</option>
                <option value="3">Alternative Assets</option>
              </select>

              <select
                value={types}
                onChange={(e) => setTypes(e.target.value)}
                className="form-select"
              >
                <option defaultValue="">Asset type</option>
                <option value="1">Fixed Income</option>
                <option value="2">Real Estate</option>
                <option value="3">Equities</option>
                <option value="4">Cash</option>
                <option value="5">Business Interest</option>
                <option value="6">Crypto</option>
              </select>
            </div>
          </div>

          {networthloading ? (
            <NetworthTableSkeletonLoader />
          ) : (
            <>
              {!sortedData || sortedData?.length === 0 ? (
                <div
                  className="order"
                  style={{
                    height: "70vh",
                  }}
                >
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
                  </table>

                  <div className="text-center networth-empty">
                    <i className="bi bi-box"></i>
                    <p className="text-center mt-2 ">Networths not found</p>
                  </div>
                </div>
              ) : !networths ? (
                <div
                  className="order"
                  style={{
                    height: "70vh",
                  }}
                >
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
                  </table>

                  <div className="text-center order-empty">
                    <i className="bi bi-box"></i>
                    <p className="text-center mt-2 ">
                      All Networths will show here
                    </p>
                  </div>
                </div>
              ) : (
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
                    {sortedData?.map((item, index) => (
                      <tr className="shaded" key={index}>
                        <td scope="row">{index + 1}</td>
                        <td scope="row">
                          {item.user.firstname} {item.user.lastname}
                        </td>
                        <td scope="row">{item.category}</td>
                        <td scope="row">{item.type}</td>
                        <td scope="row">{item.assets}</td>
                        <td scope="row">
                          {formatMoney(item.current_value_naira)}
                        </td>
                        <td scope="row">
                          {formatMoney(item.current_value_dollar)}
                        </td>
                        <td scope="row">
                         
                            <small className="order-action">
                              <ViewIcon />
                            </small>
                       
                        </td>
                      </tr>
                    ))}
                  </tbody>

                  <tfoot >
                    <tr>
                      <td scope="row"></td>
                      <td scope="row"></td>
                      <td scope="row"></td>
                      <td scope="row"></td>
                      <td scope="row">
                        <b>Total</b>
                      </td>

                      <td>
                        <b>N{formatMoney(nairatotal)}</b>
                      </td>
                      <td>
                        <b>${formatMoney(dollartotal)}</b>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AllNetworth;
