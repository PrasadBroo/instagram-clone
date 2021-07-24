import React from 'react'
import FooterCss from "../css/auth/Footer.module.css";

export default function Footer() {
    return (
        <div className="Myooter">
             <div className={FooterCss.footerLinks}>
        <ul className={FooterCss.flinks}>
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
      <footer className={FooterCss.footer}>
        © 2021 Made By{" "}
        <i
          className={FooterCss.myHeart + " fas fa-heart"}
          aria-hidden="true"
        ></i>{" "}
        Prasad Shinde
      </footer>
   
        </div>
    )
}
