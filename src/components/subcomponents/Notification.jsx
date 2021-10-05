import React from "react";

export default function Notification({ className, message }) {
  return <div className={className}>{message}</div>;
}
