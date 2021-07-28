import React from "react";
import "../../css/skeletons/Skeleton.css";

function SkeletonElement({ type }) {
  const classes = `skeleton ${type}`;

  return <div className={classes + ' applyAnimation'}></div>;
}

export default SkeletonElement;
