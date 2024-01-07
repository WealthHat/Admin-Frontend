import React from "react";
import Loading from "./loading";

interface Props {
  title: string;
  handlesubmit: any;
  width: string;
  loading: boolean;
}

const Button = (props: Props) => {
  return (
    <button
      type="submit"
      onClick={props.handlesubmit}
      style={{ width: props.width }}
      className="button"
    >
      {props.loading ? (
        <Loading
          height="25px"
          width="25px"
          primaryColor="#fff"
          secondaryColor="#fff"
        />
      ) : (
        props.title
      )}
    </button>
  );
};

export default Button;
