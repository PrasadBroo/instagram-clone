import { view } from "@risingstack/react-easy-state";
import React from "react";

function LoggedIn() {
  return (
    <div>
      <p>You Are Logged In</p>
    </div>
  );
}

export default view(LoggedIn);
