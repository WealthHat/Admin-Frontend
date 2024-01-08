import React, { useContext, useEffect, useState } from "react";
import Nav from "../../components/nav";
import Layout from "@/components/Layout";
import { formatMoney, removeNum } from "@/utils/utils";
import CustomSelect from "@/components/custom-select";
import { GetRequest, PostRequest } from "@/utils/request";
import { DataContext } from "@/store/GlobalState";
import cogoToast from "cogo-toast";
import Button from "@/common/button";
import DashboardVehicleSkeletonLoader from "@/common/skeleton/dashboard-vehicle-skeleton";
import NetworthTableSkeletonLoader from "@/common/skeleton/networth-table-skeleton";
import { sortBudgetCategory, sortBudgetTitle } from "@/utils/filter";
import Donutchart from "@/common/charts/donutchart";
import CategoryDonutchart from "@/common/charts/categoryDonutChart";
import TypesDonutchart from "@/common/charts/typesDonutChart";
import Loading from "@/common/loading";
import BlogTableSkeletonLoader from "@/common/skeleton/blog-table-skeleton";
import moment from "moment";

interface Props {}

const initialValues = {
  user: "",
  category: "",
  type: "",
  assets: "",
  montlyValue: "",
  annualValue: "",
};

const CreateBudget = (props: Props) => {
  const [values, setValues] = useState(initialValues);
  const [users, setUsers] = useState(null);
  const { state } = useContext(DataContext);
  const [userloading, setUserloading] = useState(true);
  const [user, setUser] = useState(null);
  const [buttonloading, setButtonloading] = useState(false);
  const [callback, setCallback] = useState(false);
  const [budgetloading, setBudgetloading] = useState(false);
  const [budgets, setBudgets] = useState(null);
  const [categories, setCategories] = useState("");
  const [types, setTypes] = useState("");

  // get all users
  useEffect(() => {
    if (state?.token) {
      const getUsers = async () => {
        const res = await GetRequest("/admin/all-users", state?.token);

        if (res?.status === 200 || res?.status === 201) {
          const response = res?.data?.map((item) => ({
            id: `${item._id}`,
            label: `${item.firstname} ${item.lastname}`,
            value: `${item.firstname} ${item.lastname}`,
          }));

          setUsers(response);
          setUserloading(false);
        } else {
          setUserloading(false);
        }
      };
      getUsers();
    }
  }, [state?.token]);

  // get created networth for a user
  useEffect(() => {
    if (state?.token && user?.id) {
      setBudgetloading(true);

      const getBudget = async () => {
        const res = await GetRequest(
          `/admin/user-budget/${user?.id}`,
          state?.token
        );
        if (res?.status === 200 || res?.status === 201) {
          setBudgets(res.data);
          setBudgetloading(false);
        } else {
          setBudgetloading(false);
        }
      };
      getBudget();
    }
  }, [state?.token, callback, user?.id]);

  // handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(values);

    // validate input
    if (
      !user ||
      !values.type ||
      values.type === "----" ||
      !values.category ||
      values.category === "----" ||
      !values.annualValue ||
      !values.montlyValue
    ) {
      return cogoToast.error("Inputs cannot be empty");
    }

    setButtonloading(true);

    if (state?.token) {
      // Create the networth
      const payload = {
        userId: user?.id,
        category: values.category,
        title: values.type,
        monthly: removeNum(values.montlyValue),
        annually: removeNum(values.annualValue),
      };

      const res = await PostRequest("/admin/budget", payload, state?.token);

      if (res?.status == 200 || res?.status === 201) {
        setCallback(!callback);
        cogoToast.success(res.data.msg);
        setButtonloading(false);
        // setValues(initialValues);
      } else {
        setButtonloading(false);
      }
    }
  };

  // sorted and filtered data
  const categorySort = sortBudgetCategory(budgets, categories);
  const sortedData = sortBudgetTitle(categorySort, types);

  // get the total value
  const monthlytotal = sortedData?.reduce(
    (acc, item) => acc + Number(removeNum(item.monthly)),
    0
  );
  const annuallytotal = sortedData?.reduce(
    (acc, item) => acc + Number(removeNum(item.annually)),
    0
  );

  //
  return (
    <Layout>
      <div className="networth">
        <div className="container">
          <div className="row">
            <div className="col-4">
              <div className="networth-left">
                <h1>Create Budget</h1>

                <form onSubmit={handleSubmit}>
                  <div className="form-box">
                    <label htmlFor="Password">Select User</label>

                    <CustomSelect
                      options={users}
                      placeholder="Select an option..."
                      onChange={setUser}
                      defaultValue={user}
                      isDisabled={userloading ? true : false}
                    />
                  </div>

                  <div className="form-box">
                    <label htmlFor="Password">Select Category</label>
                    <select
                      value={values.category}
                      name="category"
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option defaultValue="">----</option>
                      <option value="money in">Money in</option>
                      <option value="money out">Money out</option>
                    </select>
                  </div>

                  <div className="form-box">
                    <label htmlFor="Password">Select Asset Type</label>
                    <select
                      value={values.type}
                      name="type"
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option defaultValue="">----</option>
                      <option value="salary">Salary</option>
                      <option value="business income">Business income</option>
                      <option value="rental income">Rental income</option>
                      <option value="additional income">
                        Additional income
                      </option>
                      <option value="housing">Housing(Rent)</option>
                      <option value="food">Food</option>
                      <option value="groceries">Groceries</option>
                      <option value="childcare">Childcare/Nanny</option>
                      <option value="car fuel">Car fuel</option>
                      <option value="clothing">Clothing</option>
                      <option value="electricity">Electricity</option>
                      <option value="transport">Transport/Uber</option>
                      <option value="utilities">Utilities</option>
                      <option value="netflix">Netflix/Amazon prime/DSTV</option>
                      <option value="phone bill">Phone bill</option>
                      <option value="dinning out">Dining out</option>
                      <option value="family">Family</option>
                      <option value="school fees">School fees</option>
                      <option value="domestic staff">Domestic staff</option>
                      <option value="health insurance">Health insurance</option>
                      <option value="life insurance">Life insurance</option>
                      <option value="gym membership">Gym membership</option>
                      <option value="personal care">Personal care</option>
                      <option value="vacation">Vacation</option>
                      <option value="parents care">Parents care</option>
                      <option value="car insurance">Car insurance</option>
                      <option value="repairs">Repairs/Maintenance</option>
                      <option value="driver">Driver</option>
                    </select>
                  </div>

                  <div className="form-box">
                    <label htmlFor="naira">Monthly value</label>
                    <input
                      type="text"
                      id="naira"
                      value={values.montlyValue}
                      name="montlyValue"
                      onChange={(e) => {
                        setValues((prevState) => ({
                          ...prevState,
                          montlyValue: formatMoney(e.target.value),
                        }));
                      }}
                    />
                  </div>

                  <div className="form-box">
                    <label htmlFor="naira">Annual Value</label>
                    <input
                      type="text"
                      id="dollar"
                      value={values.annualValue}
                      name="annualValue"
                      onChange={(e) => {
                        setValues((prevState) => ({
                          ...prevState,
                          annualValue: formatMoney(e.target.value),
                        }));
                      }}
                    />
                  </div>

                  <Button
                    title="Submit"
                    handlesubmit={handleSubmit}
                    loading={buttonloading}
                    width="150px"
                  />
                </form>
              </div>
            </div>

            <div className="col-8">
              <div className="networth-right">
                <div className="right-heading">
                  <h1>{user?.label} Budget</h1>

                  <div className="right-dropdown">
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
                    {sortedData?.length === 0 ? (
                      <div
                        className="d-flex justify-content-center text-secondary"
                        style={{ paddingTop: "100px", paddingBottom: "100px" }}
                      >
                        No Budgets found
                      </div>
                    ) : !budgets ? (
                      <div
                        className="d-flex justify-content-center text-secondary"
                        style={{ paddingTop: "100px", paddingBottom: "100px" }}
                      >
                        Select a user
                      </div>
                    ) : (
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Category</th>
                            <th scope="col">Title</th>
                            <th scope="col">Annual</th>
                            <th scope="col">Monthly</th>
                            <th scope="col">Date</th>
                          </tr>
                        </thead>

                        <tbody>
                          {sortedData?.map((item, index) => (
                            <tr className="shaded" key={index}>
                              <td scope="row">{index + 1}</td>
                              <td scope="row">{item.category}</td>
                              <td scope="row">{item.title}</td>
                              <td scope="row">{formatMoney(item.annually)}</td>
                              <td scope="row">{formatMoney(item.monthly)}</td>
                              <td scope="row">
                                {moment(item.createdAt).format("ll")}
                              </td>
                            </tr>
                          ))}
                        </tbody>

                        <tfoot>
                          <tr>
                            <td scope="row"></td>
                            <td scope="row"></td>
                            <td scope="row">
                              <b>Total</b>
                            </td>

                            <td>
                              <b>N{formatMoney(annuallytotal)}</b>
                            </td>
                            <td>
                              <b>N{formatMoney(monthlytotal)}</b>
                            </td>
                            <td scope="row"></td>
                          </tr>
                        </tfoot>
                      </table>
                    )}
                  </>
                )}

                {/* chart section */}
                {/* {budgets && budgets?.length !== 0 && (
                  <div className="row my-5">
                    <div className="col border p-2">
                      <h2 className="mb-4">Asset Categories</h2>

                      {budgetloading ? (
                        <div className="d-flex justify-content-center mt-5">
                          <Loading
                            height="40px"
                            width="40px"
                            primaryColor="#000"
                            secondaryColor="#000"
                          />
                        </div>
                      ) : (
                        <CategoryDonutchart data={budgets} />
                      )}
                    </div>
                    <div className="col border p-2">
                      <h2 className="mb-4">Asset Types</h2>

                      {budgetloading ? (
                        <div className="d-flex justify-content-center my-5">
                          <Loading
                            height="40px"
                            width="40px"
                            primaryColor="#000"
                            secondaryColor="#000"
                          />
                        </div>
                      ) : (
                        <TypesDonutchart data={budgets} />
                      )}
                    </div>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateBudget;
