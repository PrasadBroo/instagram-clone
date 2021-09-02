import { view } from "@risingstack/react-easy-state";
import React, { useState } from "react";
import SignupPageCss from "../../css/SignupPage.module.css";
import appStorePng from "../../media/app-store.png";
import googleStorePng from "../../media/google-storepng.png";
import Spinner from "../Spinner";
import { isValidEmail,isvalidFullName,isvalidUsername,isValidPassword } from './../../utils/validations';
import {
  signupWithEmailPass,
  loginWithFacebook,
} from "../../utils/authHandler";

function Signup() {
  const [sbtnChange, setSbtnChange] = useState(false);
  const [email, setEmail] = useState("");
  const [loginErrMsg, setLoginErrMsg] = useState(null);
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUSername] = useState("");
  const [validemail, setvalidEmail] = useState(false);
  const [validFullName,setValidFullName] = useState(false)
  const [validUsername,setValidUsername] = useState(false);
  const [validPass,setValidPass] = useState(false)
  const [spin, setSpin] = useState(false);
  return (
    <div className="signup-page">
      <div className={SignupPageCss.container}>
        <div className={SignupPageCss.signup}>
          <div className={SignupPageCss.heading}>
            <h1>Instagram</h1>
          </div>
          <div className={SignupPageCss.boringText}>
            <p>Sign up to see photos and videos from your friends.</p>
          </div>
          <div className={SignupPageCss.loginWithFb}>
            <button
              className={SignupPageCss.fblink}
              onClick={handeloginWithFacebook}
            >
              <i
                className={"fab fa-facebook-square " + SignupPageCss.fbicon}
              ></i>
              Log In With Facebook
            </button>
          </div>
          <div className={SignupPageCss.signOption}>
            <div className={SignupPageCss.leftLine}></div>
            <div className={SignupPageCss.orText}>
              <p>OR</p>
            </div>
            <div className={SignupPageCss.rightLine}></div>
          </div>
          <div className={SignupPageCss.userForm}>
            <form action="/" method="post" onSubmit={handelFormSubmit}>
              <div className={SignupPageCss.inputWrap}>
                <input
                  type="email"
                  className={SignupPageCss.userInput}
                  name="email"
                  required
                  value={email}
                  placeholder="Mobile Number or Email"
                  onChange={handelEmailChange}
                />
                <span className={validemail ? SignupPageCss.rightCheckIcon :SignupPageCss.closeCheckIcon}>
                {validemail && <ion-icon name="checkmark-circle-outline"></ion-icon>}
                {!validemail && <ion-icon name="close-circle-outline"></ion-icon>}
                </span>
              </div>
              <div className={SignupPageCss.inputWrap}>
                <input
                  type="text"
                  value={fullName}
                  className={SignupPageCss.userInput}
                  name="fullName"
                  required
                  placeholder="Full Name"
                  onChange={handelFullNameChange}
                />
                <span className={validFullName? SignupPageCss.rightCheckIcon :SignupPageCss.closeCheckIcon}>
                {validFullName && <ion-icon name="checkmark-circle-outline"></ion-icon>}
                {!validFullName && <ion-icon name="close-circle-outline"></ion-icon>}
                </span>
              </div>
              <div className={SignupPageCss.inputWrap}>
                <input
                  type="text"
                  value={username}
                  className={SignupPageCss.userInput}
                  name="username"
                  required
                  placeholder="Username"
                  onChange={handelUsernameChange}
                />
                <span className={validUsername? SignupPageCss.rightCheckIcon :SignupPageCss.closeCheckIcon}>
                {validUsername && <ion-icon name="checkmark-circle-outline"></ion-icon>}
                {!validUsername && <ion-icon name="close-circle-outline"></ion-icon>}
                </span>
              </div>
              <div className={SignupPageCss.inputWrap}>
                <input
                  type="password"
                  value={password}
                  className={SignupPageCss.userInput}
                  name="password"
                  required
                  placeholder="Password"
                  onChange={handelPasswordChange}
                />
                <span className={validPass? SignupPageCss.rightCheckIcon :SignupPageCss.closeCheckIcon}>
                {validPass && <ion-icon name="checkmark-circle-outline"></ion-icon>}
                {!validPass && <ion-icon name="close-circle-outline"></ion-icon>}
                </span>
              </div>
              <div className={SignupPageCss.inputWrap2}>
                <button
                  type="submit"
                  disabled={!sbtnChange}
                  className={
                    sbtnChange
                      ? SignupPageCss.submitButton +
                        " " +
                        SignupPageCss.changebtnColor
                      : SignupPageCss.submitButton + " "
                  }
                >
                  {spin ? <Spinner /> : "Sign up"}
                </button>
              </div>
              <div className={SignupPageCss.signupPolicy}>
                <p>
                  By signing up, you agree to our{" "}
                  <a href="https://help.instagram.com/581066165581870">Terms</a>{" "}
                  ,{" "}
                  <a href="https://help.instagram.com/519522125107875">Data</a>{" "}
                  <a href="https://www.instagram.com/legal/cookies/">Policy</a>{" "}
                  and{" "}
                  <a href="https://www.instagram.com/legal/cookies/">
                    Cookies Policy .
                  </a>
                </p>
              </div>
              <div className={SignupPageCss.loginError}>
                {loginErrMsg ? <p>{loginErrMsg}</p> : null}
              </div>
            </form>
          </div>
        </div>
        <div className={SignupPageCss.haveAccount}>
          <p>
            Have an account?{" "}
            <a href="/accounts/login" className={SignupPageCss.signupLink}>
              Log in
            </a>{" "}
          </p>
        </div>
        <div className={SignupPageCss.getTheApp}>
          <p>Get the app</p>
        </div>
        <div className={SignupPageCss.appDownload}>
          <a href="https://itunes.apple.com/app/instagram/id389801252?pt=428156&ct=igweb.loginPage.badge&mt=8&vt=lo">
            <img src={appStorePng} alt="App Store Png" />
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DloginPage%26ig_mid%3DD42B2F41-1D42-4397-9D68-3EFA2D3A3D9F%26utm_content%3Dlo%26utm_medium%3Dbadge">
            <img src={googleStorePng} alt="Google Play Store Png" />
          </a>
        </div>
        <div className={SignupPageCss.footerLinks}>
          <ul>
            <li>
              <a href="https://about.instagram.com/">About</a>
            </li>
            <li>
              <a href="https://about.instagram.com/blog/">Blog</a>
            </li>
            <li>
              <a href="https://www.instagram.com/about/jobs/">Jobs</a>
            </li>
            <li>
              <a href="https://help.instagram.com/">Help</a>
            </li>
            <li>
              <a href="https://www.instagram.com/developer/">API</a>
            </li>
            <li>
              <a href="https://www.instagram.com/legal/privacy/">Privacy</a>
            </li>
            <li>
              <a href="https://www.instagram.com/legal/terms/">Terms</a>
            </li>
            <li>
              <a href="https://www.instagram.com/directory/profiles/">
                Top Accounts
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/directory/hashtags/">
                Hashtags
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/explore/locations/">
                Locations
              </a>
            </li>
          </ul>
        </div>
        <footer className={SignupPageCss.footer}>
          © 2021 Made By{" "}
          <i
            className={SignupPageCss.myHeart + " fas fa-heart"}
            aria-hidden="true"
          ></i>{" "}
          Prasad Shinde
        </footer>
      </div>
    </div>
  );

  function handelSubmitBtncolor() {
    if (
      email.length > 3 &&
      password.length > 4 &&
      username.length > 4 &&
      fullName.length > 5
    ) {
      return setSbtnChange(true);
    } else {
      return setSbtnChange(false);
    }
  }
  function handelEmailChange(e) {
    setEmail(e.target.value);
    setvalidEmail(isValidEmail(e.target.value))
    handelSubmitBtncolor();
  }
  function handelPasswordChange(e) {
    setPassword(e.target.value);
    setValidPass(isValidPassword(e.target.value))
    handelSubmitBtncolor();
  }
  function handelFullNameChange(e) {
    setFullName(e.target.value);
    setValidFullName(isvalidFullName(e.target.value))
    handelSubmitBtncolor();
  }
  function handelUsernameChange(e) {
    setUSername(e.target.value);
    setValidUsername(isvalidUsername(e.target.value))
    handelSubmitBtncolor();
  }
  function isValidDetails() {
    if (!validemail||!validFullName||!validUsername||!validPass) {
      return false;
    } else {
      return true;
    }
  }
  async function handelFormSubmit(e) {
    e.preventDefault();
    if (!isValidDetails()) {
      return alert("Plz correct the details.");
    }
    setSpin(true);
    const { err } = await signupWithEmailPass(
      email,
      password,
      fullName,
      username
    );
    if (err) {
      setLoginErrMsg(err.message);
      setSpin(false);
    }
  }
  async function handeloginWithFacebook() {
    const { err } = await loginWithFacebook();
    if (err) {
      return alert(err.message);
    }
  }
}

export default view(Signup);
