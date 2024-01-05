import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import cogoToast from "cogo-toast";
import Logo from "@/svg/Logo";
import Logo2 from "@/svg/Logo2";
import { useSelector } from "react-redux";
import { PostRequest } from "@/utils/request";

interface Payload {
  email: string;
  password: string;
}

export default function Authenticate() {
  // router
  const router = useRouter();

  // PageLoader
  const [pageLoading, setPageLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  // const { user, token } = useSelector((state: any) => state.auth);

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate inputs
    if (email === "" || password === "") {
      return cogoToast.error("Input cannot be empty");
    }

    const payload: Payload = {
      email,
      password,
    };

    const res = await PostRequest("/admin/signin", payload);
    if (res.status === 200 || res.status === 201) {
      localStorage.setItem("activation_token", res.data.activation_token);
      cogoToast.success(res.data.msg);
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
              <h1>Provide OTP to continue</h1>
              <label htmlFor="email">OTP Code</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button disabled={loading}>
                {loading ? "Loading..." : "Login"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
