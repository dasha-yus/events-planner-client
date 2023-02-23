import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Avatar } from "primereact/avatar";
import { Badge } from "primereact/badge";
import Logo from "../../assets/images/logo-light.png";

const Header = () => {
  return (
    <div className="navbar">
      <div className="navbar_left">
        <Link to={"/home"} className="mr-3">
          <img alt="logo" src={Logo} width={50} height={50} />
        </Link>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link nav-link_active" : "link nav-link"
          }
          to="/home"
        >
          Календарь
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link nav-link_active" : "link nav-link"
          }
          to="/stats"
        >
          Статистика
        </NavLink>
      </div>
      <div className="navbar_right">
        <i
          className="pi pi-bell mr-4 p-text-secondary p-overlay-badge"
          style={{ fontSize: "1.5rem", color: "#ffffff" }}
        >
          <Badge value="2"></Badge>
        </i>
        <Avatar
          label="TY"
          style={{ backgroundColor: "#6366f1", color: "#ffffff" }}
          shape="circle"
        />
      </div>
    </div>
  );
};

export default Header;
