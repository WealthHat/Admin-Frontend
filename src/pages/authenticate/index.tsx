import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import cogoToast from "cogo-toast";
import Logo from "@/svg/Logo";
import Logo2 from "@/svg/Logo2";
import { useSelector } from "react-redux";
import { PostRequest } from "@/utils/request";
import Loading from "@/common/loading";

interface Payload {
  activation_token: string;
  auth_code: string;
}

export default function Authenticate() {
  // router
  const router = useRouter();

  // PageLoader
  const [pageLoading, setPageLoading] = useState(true);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  // const { user, token } = useSelector((state: any) => state.auth);

  // check if activation token is available
  useEffect(() => {
    const act_token = localStorage.getItem("activation_token");
    if (act_token) {
      setPageLoading(false);
    } else {
      router.push("/");
    }
  }, []);

  // check if token is available
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      router.push("/overview");
      return;
    }
    setPageLoading(false);
  }, []);

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate inputs
    if (otp === "") {
      return cogoToast.error("code cannot be empty");
    }

    setLoading(true);

    // get activation token from local storage
    const act_token = localStorage.getItem("activation_token");

    const payload: Payload = {
      activation_token: act_token,
      auth_code: otp,
    };

    const res = await PostRequest("/admin/auth-signin", payload);
    if (res.status === 200 || res.status === 201) {
      localStorage.setItem("user", JSON.stringify(res.data.data));
      router.push("/overview");
      cogoToast.success(res.data.msg);
    } else {
      setLoading(false);
    }
  };

  if (pageLoading) return;

  return (
    <div className="container-fluid">
      <div className="login">
        <form
          className="d-flex mt-5 justify-content-center"
          onSubmit={handleSubmit}
        >
          <div className="content">
            <Logo2 />

            <div className="content-body">
              <div className="d-flex gap-4 align-items-center mb-5 justify-content-center">
                <i
                  className="bi bi-arrow-left"
                  onClick={() => router.back()}
                ></i>
                <h1>Provide OTP to continue</h1>
              </div>

              <label htmlFor="otp">OTP Code</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              <button disabled={loading}>
                {loading ? (
                  <Loading
                    height="25px"
                    width="25px"
                    primaryColor="#fff"
                    secondaryColor="#fff"
                  />
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
