import React from "react";
import "./Footer.css";
import bgB from "../../assets/bgB.png";

const Footer = () => {
    return (
        <footer
            className="footer"
            style={{ backgroundImage: `url(${bgB})` }}
        >
            <div className="footer-container">
                <div className="footer-top">
                    <div className="footer-left">
                        <h2 className="logo">BYGGHUB</h2>
                        <span className="divider">|</span>
                        <p className="description">Construction management software</p>
                    </div>
                    <div className="footer-menu">
                        <a href="#integration">Integration</a>
                        <a href="#pricing">Pricing</a>
                        <a href="#reviews">Reviews</a>
                    </div>
                </div>

                <hr className="footer-line" />

                <div className="footer-bottom">
                    <p>Copyright © 2024 FramerBite.</p>
                    <p>All Rights Reserved</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
