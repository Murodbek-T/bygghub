import React from "react";
import "./AdminHeader.css";
import logo from "../../assets/admin-logo.png";

import { Link } from "react-router-dom";
import magnifierIcon from "../../assets/magnifier.svg";
import userIcon from "../../assets/user.svg";
import settingIcon from "../../assets/settings.png";

const icons = [
  {
    id: 1,
    link: "#",
    title: "magnifier",
    src: magnifierIcon,
  },
  {
    id: 2,
    link: "#",
    title: "user",
    src: userIcon,
  },
  {
    id: 3,
    link: "#",
    title: "settings",
    src: settingIcon,
  },
];

const AdminHeader = () => {
  return (
    <div className="admin-wrapper">
      {/* --- LOGO --- */}
      <Link to="/" className="navbar-brand d-flex align-items-center">
        <img
          src={logo}
          className="d-inline-block align-top logo-img"
          alt="ByggHub Logo"
        />
      </Link>

      <div className="admin-icons">
        {/* renders the icons using map function */}
        {icons.map((icon) => (
          <div className="icon-wrapper" key={icon.id}>
            <Link to={icon.link}>
              <img src={icon.src} alt={icon.title} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHeader;
