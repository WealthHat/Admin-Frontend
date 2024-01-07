import React, { useContext, useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import cogoToast from "cogo-toast";
import Logo from "@/svg/Logo";
import Logo2 from "@/svg/Logo2";
import { useSelector } from "react-redux";
import { PostRequest } from "@/utils/request";
import Loading from "@/common/loading";
import { DataContext } from "@/store/GlobalState";

interface Payload {
  email: string;
  password: string;
}

export default function Home() {
  // router
  const router = useRouter();

  // PageLoader
  const [pageLoading, setPageLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { state } = useContext(DataContext);

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
    if (email === "" || password === "") {
      return cogoToast.error("Input cannot be empty");
    }

    setLoading(true);

    // payload
    const payload: Payload = {
      email,
      password,
    };

    // requests
    const res = await PostRequest("/admin/signin", payload);
    if (res.status === 200 || res.status === 201) {
      localStorage.setItem("activation_token", res.data.activation_token);
      cogoToast.success(res.data.msg);
      router.push("/authenticate");
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
              <h1 className="mb-5">Login to your account</h1>
              <label htmlFor="email">Email address</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="Password">Password</label>
              <div className="input d-flex justify-content-between align-items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  id="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button disabled={loading}>
                {loading ? (
                  <Loading
                    height="25px"
                    width="25px"
                    primaryColor="#fff"
                    secondaryColor="#fff"
                  />
                ) : (
                  "Continue"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
