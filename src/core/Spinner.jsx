import React from "react";
import spinner from "./spinner.gif";

const Spinner = props => (
  <React.Fragment>
    <img
      src={spinner}
      alt="Loading..."
      style={{ width: "200px", margin: "auto", display: "block" }}
    />
  </React.Fragment>
);

export default Spinner;
