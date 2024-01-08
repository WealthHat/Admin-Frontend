import React, { useContext, useEffect } from "react";
import Nav from "./nav";
import { useRouter } from "next/router";
import { DataContext } from "@/store/GlobalState";
import { ACTIONS } from "@/store/Actions";

interface Props {
  children: any;
}

const Layout = (props: Props) => {
  const router = useRouter();
  const { state, dispatch } = useContext(DataContext);
//   const [pageloading, setPageloading] = useState(true);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) {
      router.push("/");
      return;
    }

    dispatch({ type: ACTIONS.PAGELOADING, payload: false });
    dispatch({ type: ACTIONS.TOKEN, payload: userData?.token });
    dispatch({ type: ACTIONS.USER, payload: userData?.user });
  }, []);

  if (state.pageloading) return;

  //
  return (
    <>
      <Nav />
      {props.children}
    </>
  );
};

export default Layout;
