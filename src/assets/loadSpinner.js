import React from "react";
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const LoadSpinner = (props) => {
    let {visibility, loading}= props;
    return(
       
        <div className="loadingScreen" style={{visibility:visibility}}>
            <div className="spinner">
                <BeatLoader
                css={override}
                size={18}
                color={"#123abc"}
                loading={loading}
                />
            </div>
        </div> 
       
    )
}


export default LoadSpinner;