import React from "react";
import "./Navbar.css";
import userImage from "../../Assets/Images/userImage.png";
const Navbar = () => {
  return (
    <div className="topBar-bc">
      <div className="topbar-left">
        <h3 className="dashboardTop-bc">Dashboard</h3>
      </div>
      <div className="topbar-right">
        <h3 className="topbar-user">Admin</h3>
        <img src={userImage} alt="userImage" className="topbar-userImage" />
      </div>
    </div>
  );
};

export default Navbar;
