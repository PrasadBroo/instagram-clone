import React from "react";
import NotFoundCss from '../../css/auth/NotFound.module.css'
export default function NotFound() {
  return (
    <div className={NotFoundCss.notFoundWrap}>
      <p className={NotFoundCss.boldPara}>Sorry, this page isn't available.</p>
      <p className={NotFoundCss.lightPara}>
        The link you followed may be broken, or the page may have been removed.
        Go back to <a href="/">Instagram</a>.
      </p>
    </div>
  );
}
