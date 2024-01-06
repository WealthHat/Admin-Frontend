import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import Logo2 from "@/svg/Logo2";

export default function Nav() {
  const router = useRouter();

  const [user, setUser] = useState("");

  useEffect(() => {
    const userData = JSON.parse(
      localStorage.getItem("kawa-admin-data") || "{}"
    ).admin;
    if (userData) {
      setUser(`${userData.firstName} ${userData.lastName}`);
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg align-items-center">
      <div className="container-fluid">
        <Link className="navbar-brand" href={"/"}>
          <Logo2 />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse justify-content-between align-items-center"
          id="navbarScroll"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  router.asPath.includes("overview") ? "active" : ""
                }`}
                aria-current="page"
                href="/overview"
              >
                Overview
              </Link>
            </li>

            <li className="nav-item dropdown">
              <Link
                className={`nav-link dropdown-toggle ${
                  router.asPath.includes("order-transactions") ||
                  router.asPath.includes("payout-transactions")
                    ? "active"
                    : ""
                }`}
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Finances
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link href="/">Order Transactions</Link>
                </li>
                <li>
                  <Link href="/">Payout Transaction</Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  router.asPath.indexOf("/orders") === 0 ? "active" : ""
                }`}
                href="/"
              >
                Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  router.asPath.includes("/individual") ? "active" : ""
                }`}
                href="/"
              >
                Individuals
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/"
                className={`nav-link ${
                  router.asPath.includes("/carriers") ? "active" : ""
                }`}
              >
                Carriers
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className={`nav-link dropdown-toggle ${
                  router.asPath.includes("settings") &&
                  !router.asPath.includes("individual")
                    ? "active"
                    : ""
                }`}
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Settings
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" href="/">
                    General Settings
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="/">
                    Reporting
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="/">
                    Email Template
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="/">
                    Subscriptions
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="/">
                    States & Cities
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="/">
                    Item Category
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <li className="nav-item dropdown ms-4">
              <Link
                className={`nav-link dropdown-toggle d-flex gap-1 align-items-center`}
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <p>Ayodeji Oladimeji</p>
              </Link>
              <ul className="dropdown-menu right">
                <li
                  onClick={() => {
                    localStorage.removeItem("kawa-admin-data");
                    router.push("/");
                  }}
                >
                  <p>Log out</p>
                </li>
              </ul>
            </li>
          </div>
        </div>
      </div>
    </nav>
  );
}
