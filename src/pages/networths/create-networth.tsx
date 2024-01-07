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
import { sortCategory, sortTypes } from "@/utils/filter";
import Donutchart from "@/common/charts/donutchart";
import CategoryDonutchart from "@/common/charts/categoryDonutChart";
import TypesDonutchart from "@/common/charts/typesDonutChart";
import Loading from "@/common/loading";

interface Props {}

const initialValues = {
  user: "",
  category: "",
  type: "",
  assets: "",
  nairaValue: "",
  dollarValue: "",
};

const CreateNetworth = (props: Props) => {
  const [values, setValues] = useState(initialValues);
  const [users, setUsers] = useState(null);
  const { state } = useContext(DataContext);
  const [userloading, setUserloading] = useState(true);
  const [user, setUser] = useState(null);
  const [buttonloading, setButtonloading] = useState(false);
  const [callback, setCallback] = useState(false);
  const [networthloading, setNetworthloading] = useState(false);
  const [networths, setNetworths] = useState(null);
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
      setNetworthloading(true);

      const getNetworth = async () => {
        const res = await GetRequest(
          `/admin/user-networth/${user?.id}`,
          state?.token
        );
        if (res?.status === 200 || res?.status === 201) {
          setNetworths(res.data);
          setNetworthloading(false);
          console.log(res.data);
        } else {
          setNetworthloading(false);
        }
      };
      getNetworth();
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

    // validate input
    if (
      !user ||
      !values.type ||
      values.type === "----" ||
      !values.category ||
      values.category === "----" ||
      !values.dollarValue ||
      !values.nairaValue
    ) {
      return cogoToast.error("Inputs cannot be empty");
    }

    setButtonloading(true);

    if (state?.token) {
      // Create the networth
      const payload = {
        userId: user?.id,
        category: values.category,
        type: values.type,
        assets: values.assets,
        current_value_naira: removeNum(values.nairaValue),
        current_value_dollar: removeNum(values.dollarValue),
      };

      const res = await PostRequest("/admin/networth", payload, state?.token);

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
        <div className="container">
          <div className="row">
            <div className="col-4">
              <div className="networth-left">
                <h1>Create Networth</h1>

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
                      <option value="real assets">Real Assets</option>
                      <option value="liquid assets">Liquid Assets</option>
                      <option value="alternative assets">
                        Alternative Assets
                      </option>
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
                      <option value="fixed income">Fixed Income</option>
                      <option value="real estate">Real Estate</option>
                      <option value="equities">Equities</option>
                      <option value="cash">Cash</option>
                      <option value="business interest">
                        Business Interest
                      </option>
                      <option value="crypto">Crypto</option>
                    </select>
                  </div>

                  <div className="form-box">
                    <label htmlFor="asset">Assets</label>
                    <input
                      type="text"
                      id="asset"
                      value={values.assets}
                      name="assets"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-box">
                    <label htmlFor="naira">Current Value (Naira)</label>
                    <input
                      type="text"
                      id="naira"
                      value={values.nairaValue}
                      name="nairaValue"
                      onChange={(e) => {
                        setValues((prevState) => ({
                          ...prevState,
                          nairaValue: formatMoney(e.target.value),
                        }));
                      }}
                    />
                  </div>

                  <div className="form-box">
                    <label htmlFor="naira">Current Value (Dollar)</label>
                    <input
                      type="text"
                      id="dollar"
                      value={values.dollarValue}
                      name="dollarValue"
                      onChange={(e) => {
                        setValues((prevState) => ({
                          ...prevState,
                          dollarValue: formatMoney(e.target.value),
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
                  <h1>{user?.label} Networth</h1>

                  <div className="right-dropdown">
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
                    {sortedData?.length === 0 ? (
                      <div
                        className="d-flex justify-content-center text-secondary"
                        style={{ paddingTop: "100px", paddingBottom: "100px" }}
                      >
                        No Networths found
                      </div>
                    ) : !networths ? (
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
                            <th scope="col">Type</th>
                            <th scope="col">Assets</th>
                            <th scope="col">Value (N)</th>
                            <th scope="col">Value ($)</th>
                          </tr>
                        </thead>

                        <tbody>
                          {sortedData?.map((item, index) => (
                            <tr className="shaded" key={index}>
                              <td scope="row">{index + 1}</td>
                              <td scope="row">{item.category}</td>
                              <td scope="row">{item.type}</td>
                              <td scope="row">{item.assets}</td>
                              <td scope="row">
                                {formatMoney(item.current_value_naira)}
                              </td>
                              <td scope="row">
                                {formatMoney(item.current_value_dollar)}
                              </td>
                            </tr>
                          ))}
                        </tbody>

                        <tfoot>
                          <tr>
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

                {/* chart section */}
                {networths && networths?.length !== 0 && (
                  <div className="row my-5">
                    <div className="col border p-2">
                      <h2 className="mb-4">Asset Categories</h2>

                      {networthloading ? (
                        <div className="d-flex justify-content-center mt-5">
                          <Loading
                            height="40px"
                            width="40px"
                            primaryColor="#000"
                            secondaryColor="#000"
                          />
                        </div>
                      ) : (
                        <CategoryDonutchart data={networths} />
                      )}
                    </div>
                    <div className="col border p-2">
                      <h2 className="mb-4">Asset Types</h2>

                      {networthloading ? (
                        <div className="d-flex justify-content-center my-5">
                          <Loading
                            height="40px"
                            width="40px"
                            primaryColor="#000"
                            secondaryColor="#000"
                          />
                        </div>
                      ) : (
                        <TypesDonutchart data={networths} />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateNetworth;
