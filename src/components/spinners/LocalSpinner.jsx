import { view } from "@risingstack/react-easy-state";
import React from "react";
import SpinnerCss from "../../css/spinners/Spinner.module.css";

function Spinner() {
  return (
    <div className={SpinnerCss.loaderWrapLocal}>
      <div className={SpinnerCss.loaderLocal}></div>
    </div>
  );
}
export default view(Spinner);
