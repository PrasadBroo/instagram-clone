import { view } from "@risingstack/react-easy-state";
import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import HomePageCss from "../css/HomePage.module.css";
import appStorePng from "../media/app-store.png";
import googleStorePng from "../media/google-storepng.png";
import inMockOne from "../media/in-mock-1.jpg";
import inMockTwo from "../media/in-mock-2.jpg";
import inMockThree from "../media/in-mock-3.jpg";
import inMockFour from "../media/in-mock-4.jpg";
import inMockFive from "../media/in-mock-5.jpg";
import { loginWithEmailPass, loginWithFacebook } from "./../utils/authHandler";

function LoggedOut() {
  const [email, setEmail] = useState("");
  const [loginErrMsg, setLoginErrMsg] = useState(null);
  const [spin, setSpin] = useState(false);
  const [password, setPassword] = useState("");
  const [sbtnChange, setSbtnChange] = useState(false);
  const [dyanamicImg, setDynanmicImg] = useState(inMockOne);

  useEffect(() => {
    document.body.style.backgroundColor = "#FAFAFA";
    let interval = setInterval(() => {
      const caraual = [
        inMockOne,
        inMockTwo,
        inMockThree,
        inMockFour,
        inMockFive,
      ];
      let random = Math.floor(Math.random() * caraual.length);
      setDynanmicImg(caraual[random]);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className={HomePageCss.container}>
        <div className={HomePageCss.wrap}>
          <div className={HomePageCss.mockup}>
            <img
              src={dyanamicImg}
              alt="inmockone"
              className={HomePageCss.mockImg1}
            />
          </div>
          <div className={HomePageCss.auth}>
            <div className={HomePageCss.authmain}>
              <div className={HomePageCss.heading}>
                <h1>Instagram</h1>
              </div>
              <div className={HomePageCss.userForm}>
                <form action="/" method="post" onSubmit={handelFormSubmit}>
                  <div className={HomePageCss.inputWrap}>
                    <input
                      type="email"
                      className={HomePageCss.userInput}
                      name="username"
                      required
                      placeholder="Phone number, username, or email"
                      onChange={handelEmailChange}
                    />
                  </div>
                  <div className="password">
                    <input
                      type="password"
                      className={HomePageCss.userInput}
                      name="password"
                      required
                      placeholder="Password"
                      onChange={handelPasswordChange}
                    />
                  </div>
                  <div className={HomePageCss.inputWrap2}>
                    <button
                      type="submit"
                      disabled={spin}
                      className={
                        sbtnChange
                          ? HomePageCss.submitButton +
                            " " +
                            HomePageCss.changebtnColor
                          : HomePageCss.submitButton + " "
                      }
                    >
                      {spin ? <Spinner /> : "Log In"}
                    </button>
                  </div>
                  <div className={HomePageCss.signOption}>
                    <div className={HomePageCss.leftLine}></div>
                    <div className={HomePageCss.orText}>
                      <p>OR</p>
                    </div>
                    <div className={HomePageCss.rightLine}></div>
                  </div>
                </form>
                <div className={HomePageCss.otherOptions}>
                  <div className="withFb">
                    <p>
                      <i
                        className={
                          "fab fa-facebook-square " + HomePageCss.fbicon
                        }
                      ></i>
                      <button
                        onClick={loginWithFb}
                        className={HomePageCss.fblink}
                      >
                        Log In With Facebook
                      </button>
                    </p>
                  </div>
                  <div className={HomePageCss.loginError}>
                    {loginErrMsg ? <p>{loginErrMsg}</p> : null}
                  </div>
                  <div className={HomePageCss.forgetPass}>
                    <a
                      href="/comingsoon"
                      className={HomePageCss.forgetPassLink}
                    >
                      Forget Password?
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className={HomePageCss.noAccount}>
              <div className="noacctext">
                <p className={HomePageCss.noAccText}>
                  Don't have an account?{" "}
                  <a
                    href="/accounts/emailsignup"
                    className={HomePageCss.signupLink}
                  >
                    Sign up
                  </a>
                </p>
              </div>
            </div>
            <div className={HomePageCss.appDownload}>
              <p>Get the app.</p>
              <div className={HomePageCss.appLinks}>
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
      <div className={HomePageCss.footerLinks}>
        <ul className={HomePageCss.flinks}>
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
      <footer className={HomePageCss.footer}>
        ?? 2021 Made By{" "}
        <i
          className={HomePageCss.myHeart + " fas fa-heart"}
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
    const res = await loginWithEmailPass(email, password);
    if (res.err) {
      setLoginErrMsg(res.err.message);
    }
    setSpin(false);
  }

  function handelEmailChange(e) {
    setEmail(e.target.value);
    handelSubmitBtncolor();
  }
  function handelPasswordChange(e) {
    setPassword(e.target.value);
    handelSubmitBtncolor();
  }

  async function loginWithFb() {
    const { err } = await loginWithFacebook();
    if (err) {
      return alert(err.message);
    }
  }
}

export default view(LoggedOut);
