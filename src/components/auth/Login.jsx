import React, { useState } from "react";
import appStorePng from "../../media/app-store.png";
import googleStorePng from "../../media/google-storepng.png";
import LoginCss from "../../css/auth/Login.module.css";
import Spinner from "../Spinner";
import { view } from "@risingstack/react-easy-state";
import { loginWithFacebook, loginWithEmailPass } from "../../utils/authHandler";

function Login() {
  const [email, setEmail] = useState("");
  const [loginErrMsg, setLoginErrMsg] = useState(null);
  const [spin, setSpin] = useState(false);
  const [password, setPassword] = useState("");
  const [sbtnChange, setSbtnChange] = useState(false);
  return (
    <>
      <div className={LoginCss.container}>
        <div className={LoginCss.wrap}>
          <div className={LoginCss.auth}>
            <div className={LoginCss.authmain}>
              <div className={LoginCss.heading}>
                <h1>Instagram</h1>
              </div>
              <div className={LoginCss.userForm}>
                <form action="/" method="post" onSubmit={handelFormSubmit}>
                  <div className={LoginCss.inputWrap}>
                    <input
                      type="email"
                      className={LoginCss.userInput}
                      name="username"
                      required
                      placeholder="Phone number, username, or email"
                      onChange={handelEmailChange}
                    />
                  </div>
                  <div className="password">
                    <input
                      type="password"
                      className={LoginCss.userInput}
                      name="password"
                      required
                      placeholder="Password"
                      onChange={handelPasswordChange}
                    />
                  </div>
                  <div className={LoginCss.inputWrap2}>
                    <button
                      type="submit"
                      disabled={!sbtnChange}
                      className={
                        sbtnChange
                          ? LoginCss.submitButton +
                            " " +
                            LoginCss.changebtnColor
                          : LoginCss.submitButton + " "
                      }
                    >
                      {spin ? <Spinner /> : "Log In"}
                    </button>
                  </div>
                  <div className={LoginCss.signOption}>
                    <div className={LoginCss.leftLine}></div>
                    <div className={LoginCss.orText}>
                      <p>OR</p>
                    </div>
                    <div className={LoginCss.rightLine}></div>
                  </div>
                </form>
                <div className={LoginCss.otherOptions}>
                  <div className="withFb">
                    <p>
                      <i
                        className={"fab fa-facebook-square " + LoginCss.fbicon}
                      ></i>
                      <button
                        onClick={handeloginWithFacebook}
                        className={LoginCss.fblink}
                      >
                        Log In With Facebook
                      </button>
                    </p>
                  </div>
                  <div className={LoginCss.loginError}>
                    {loginErrMsg ? <p>{loginErrMsg}</p> : null}
                  </div>
                  <div className={LoginCss.forgetPass}>
                    <a href="/comingsoon" className={LoginCss.forgetPassLink}>
                      Forget Password?
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className={LoginCss.noAccount}>
              <div className="noacctext">
                <p className={LoginCss.noAccText}>
                  Don't have an account?{" "}
                  <a
                    href="/accounts/emailsignup"
                    className={LoginCss.signupLink}
                  >
                    Sign up
                  </a>
                </p>
              </div>
            </div>
            <div className={LoginCss.appDownload}>
              <p>Get the app.</p>
              <div className={LoginCss.appLinks}>
                <a href="https://itunes.apple.com/app/instagram/id389801252?pt=428156&ct=igweb.loginPage.badge&mt=8&vt=lo">
                  <img src={appStorePng} alt="App Store Png" />
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DloginPage%26ig_mid%3DD42B2F41-1D42-4397-9D68-3EFA2D3A3D9F%26utm_content%3Dlo%26utm_medium%3Dbadge">
                  <img src={googleStorePng} alt="Google Play Store Png" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={LoginCss.footerLinks}>
        <ul className={LoginCss.flinks}>
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
            <a href="https://www.instagram.com/directory/hashtags/">Hashtags</a>
          </li>
          <li>
            <a href="https://www.instagram.com/explore/locations/">Locations</a>
          </li>
          <li>
            <a href="https://www.instagram.com/topics/beauty/">Beauty</a>
          </li>
          <li>
            <a href="https://www.instagram.com/topics/dance-and-performance/">
              Dance And Performance
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/topics/fitness/">Fitness</a>
          </li>
          <li>
            <a href="https://www.instagram.com/topics/food-and-drink/">
              Food & Drinks
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/topics/home-and-garden/">
              Home & Garden
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/topics/music/">Music</a>
          </li>
          <li>
            <a href="https://www.instagram.com/topics/visual-arts/">
              Visual Arts
            </a>
          </li>
        </ul>
      </div>
      <footer className={LoginCss.footer}>
        © 2021 Made By{" "}
        <i
          className={LoginCss.myHeart + " fas fa-heart"}
          aria-hidden="true"
        ></i>{" "}
        Prasad Shinde
      </footer>
    </>
  );

  function isValidDetails() {
    if (
      email.length < 1 ||
      email === null ||
      password.length < 1 ||
      password === null
    ) {
      return false;
    } else {
      return true;
    }
  }

  function handelSubmitBtncolor() {
    if (email.length > 3 && password.length > 4) {
      return setSbtnChange(true);
    } else {
      return setSbtnChange(false);
    }
  }
  async function handelFormSubmit(e) {
    e.preventDefault();
    if (!isValidDetails()) {
      return alert("Plz fill the details.");
    }
    setSpin(true);
    const { err } = await loginWithEmailPass(email, password);
    if (err) {
      setLoginErrMsg(err.message);
      setSpin(false);
      return;
    }
  }

  function handelEmailChange(e) {
    setEmail(e.target.value);
    handelSubmitBtncolor();
  }
  function handelPasswordChange(e) {
    setPassword(e.target.value);
    handelSubmitBtncolor();
  }

  async function handeloginWithFacebook() {
    const { err } = await loginWithFacebook();
    if (err) {
      return alert(err.message + ' yup youare right');
    }
  }
}

export default view(Login);
