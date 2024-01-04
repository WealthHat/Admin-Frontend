import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import cogoToast from "cogo-toast";
import Logo from "@/svg/Logo";
import Logo2 from "@/svg/Logo2";

export default function Home() {
  // router
  const router = useRouter();

  // PageLoader
  const [pageLoading, setPageLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);

  if (pageLoading) return;

  return (
    <div className="container-fluid">
      <div className="login">
        <form className="d-flex mt-5 justify-content-center">
          <div className="content">
            <Logo2 />
            <h1>Login to your account</h1>
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
              {/* <FontAwesomeIcon
                icon={faEye}
                size="lg"
                onClick={() => setShowPassword(!showPassword)}
              /> */}
            </div>
            <label htmlFor="2fa">
              Two factor token (Google Authentication)
            </label>
            <input
              type="number"
              id="2fa"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button disabled={loading}>
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
