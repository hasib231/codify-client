import React from 'react';
import logo from '../../../../src/assets/logo.jpg'

const Footer = () => {
    return (
      <footer className="footer p-10 bg-black text-neutral-content">
        <div>
          <img src={logo} width="50" height="50" alt="" />
          <p>
            Codify Ltd.
            <br />
            Learn programming with your creativity.
          </p>
        </div>
        <div>
          <span className="footer-title">Services</span>
          <a className="link link-hover">Virtual training</a>
          <a className="link link-hover"> Live streaming classes</a>
          <a className="link link-hover">Weight loss programs</a>
          <a className="link link-hover">Meditation programs</a>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Courses</a>
          <a className="link link-hover">Press kit</a>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </div>
      </footer>
    );
};

export default Footer;