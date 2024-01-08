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
import moment from "moment";
import BlogTableSkeletonLoader from "@/common/skeleton/blog-table-skeleton";

interface Props {}

const AllBudgets = (props: Props) => {
  const [budgets, setBudgets] = useState(null);
  const [budgetloading, setBudgetloading] = useState(true);
  const { state } = useContext(DataContext);
  const [categories, setCategories] = useState("");
  const [types, setTypes] = useState("");

  // get all budgets
  useEffect(() => {
    if (state?.token) {
      setBudgetloading(true);

      const getBudget = async () => {
        const res = await GetRequest(`/admin/all-budget`, state?.token);
        if (res?.status === 200 || res?.status === 201) {
          setBudgets(res.data);
          setBudgetloading(false);
          console.log(res.data);
        } else {
          setBudgetloading(false);
        }
      };
      getBudget();
    }
  }, [state?.token]);

  // sorted and filtered data
  const categorySort = sortCategory(budgets, categories);
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
            <h1>All Budgets</h1>

            <div className="dropdown">
              <select
                value={categories}
                onChange={(e) => setCategories(e.target.value)}
                className="form-select"
              >
                <option defaultValue="">Category</option>
                <option value="1">Money in</option>
                <option value="2">Money out</option>
              </select>

              <select
                value={types}
                onChange={(e) => setTypes(e.target.value)}
                className="form-select"
              >
                <option defaultValue="">Asset title</option>
                <option value="1">Salary</option>
                <option value="2">Business income</option>
                <option value="3">Rental income</option>
                <option value="4">Additional income</option>
                <option value="5">Housing(Rent)</option>
                <option value="6">Food</option>
                <option value="7">Groceries</option>
                <option value="8">Childcare/Nanny</option>
                <option value="9">Car fuel</option>
                <option value="10">Clothing</option>
                <option value="11">Electricity</option>
                <option value="12">Transport/Uber</option>
                <option value="13">Utilities</option>
                <option value="14">Netflix/Amazon prime/DSTV</option>
                <option value="15">Phone bill</option>
                <option value="16">Dining out</option>
                <option value="17">Family</option>
                <option value="18">School fees</option>
                <option value="19">Domestic staff</option>
                <option value="20">Health insurance</option>
                <option value="21">Life insurance</option>
                <option value="22">Gym membership</option>
                <option value="23">Personal care</option>
                <option value="24">Vacation</option>
                <option value="25">Parents care</option>
                <option value="26">Car insurance</option>
                <option value="27">Repairs/Maintenance</option>
                <option value="28">Driver</option>
              </select>
            </div>
          </div>

          {budgetloading ? (
            <BlogTableSkeletonLoader />
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
                        <th scope="col">Title</th>
                        <th scope="col">Annual</th>
                        <th scope="col">Monthly</th>
                        <th scope="col">Date</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                  </table>

                  <div className="text-center networth-empty">
                    <i className="bi bi-box"></i>
                    <p className="text-center mt-2 ">Networths not found</p>
                  </div>
                </div>
              ) : !budgets ? (
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
                        <th scope="col">Title</th>
                        <th scope="col">Annual</th>
                        <th scope="col">Monthly</th>
                        <th scope="col">Date</th>
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
                      <th scope="col">Title</th>
                      <th scope="col">Annual</th>
                      <th scope="col">Monthly</th>
                      <th scope="col">Date</th>
                      <th scope="col" className="actions">Actions</th>
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
                        <td scope="row">{item.title}</td>
                        <td scope="row">{formatMoney(item.annually)}</td>
                        <td scope="row">{formatMoney(item.monthly)}</td>
                        <td scope="row">
                          {moment(item.createdAt).format("ll")}
                        </td>
                        <td scope="row">
                          <small className="order-action">
                            <ViewIcon />
                          </small>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                  <tfoot>
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

export default AllBudgets;
