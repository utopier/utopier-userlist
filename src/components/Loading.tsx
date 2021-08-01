import React from "react";
import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Loading = () => {
  return (
    <div 
      className="sweet-loading" 
      style={{
        width:"100%",
        height:"300px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
      <PulseLoader color={"#00CCC6"} css={override} size={15} />
    </div>
  );
};

export default Loading;