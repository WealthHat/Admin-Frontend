import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import cogoToast from "cogo-toast";
import Logo from "@/svg/Logo";
import Logo2 from "@/svg/Logo2";
import { useSelector } from "react-redux";
import { PostRequest } from "@/utils/request";
import Loading from "@/common/loading";
import Nav from "@/components/nav";

interface Payload {
  email: string;
  password: string;
}

export default function Overview() {
  // router
  const router = useRouter();

  // PageLoader
  const [pageLoading, setPageLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  // const { user, token } = useSelector((state: any) => state.auth);

  if (pageLoading) return;

  return (
    <>
      <Nav />
      <div className="overview">overview</div>
    </>
  );
}
