import { view } from "@risingstack/react-easy-state";
import React from "react";
import SpinnerCss from "../../css/spinners/Spinner.module.css";

function Spinner({noBc}) {
  return (
    <div className={noBc ? SpinnerCss.loaderWrapLocal + ' ' +SpinnerCss.noBc :SpinnerCss.loaderWrapLocal} >
      <div className={SpinnerCss.loaderLocal} ></div>
    </div>
  );
}
export default view(Spinner);
