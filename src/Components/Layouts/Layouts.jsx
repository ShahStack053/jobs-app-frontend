import React from "react";
import "./Layouts.css";
import confirm from "antd/es/modal/confirm";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Layout } from "antd";
import Navbar from "../Header/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Base_Route } from "../../helper/constant";

const { Header, Sider, Content } = Layout;

const Layouts = () => {
  const navigate = useNavigate();

  const navigateRouteHandler = (e) => {
    if (e === "1") {
      navigate("/portal/dashboard");
    } else if (e === "2") {
      navigate("/portal/jobs");
    } else if (e === "3") {
      navigate("/portal/category");
    } else if (e === "4") {
      navigate("/portal/settings");
    } else {
      mylogout();
    }
  };
  const mylogout = () => {
    confirm({
      title: "Do you want to Logout?",
      icon: <ExclamationCircleFilled style={{ color: " #faad14" }} />,
      content: "You will return to Login page",
      okText: "Yes",
      cancelText: "Cancel",
      okCancel: true,
      okButtonProps: {
        style: { float: "right", marginRight: 10, color: "white" },
      },
      cancelButtonProps: { style: { float: "right" } },
      onOk() {
        axios({
          method: "post",
          url: `${Base_Route}/api/auth/logout`,
          headers: {
            Authorization: `Bearer ${localStorage.AuthToken}`,
            "Content-Type": "application/json",
          },
        })
          .then(function (res) {
            if (res.status === 200) {
              toast.success(res.message);
              navigate("/");
              localStorage.clear();
            }
          })
          .catch((err) => {
            toast.warn(err.message);
          });
      },
      onCancel() {
        toast.info("You cancel the logout");
      },
    });
  };
  return (
    <>
      <ToastContainer />
      <Layout style={{ height: "100%" }}>
        <Sider
          style={{
            background: "white",
            height: "100vh",
            position: "fixed",
            left: 0,
            // borderRight: "2px solid white",
          }}
        >
          <div className="sideBar">
            <div className="sidebar-upper-div">Jobs Portal</div>
            <div className="sidebar-lower-div">
              <button
                className="sider-btn"
                onClick={() => navigateRouteHandler("1")}
              >
                Dashboard
              </button>
              <button
                className="sider-btn"
                onClick={() => navigateRouteHandler("2")}
              >
                {" "}
                Jobs
              </button>
              <button
                className="sider-btn"
                onClick={() => navigateRouteHandler("3")}
              >
                Category
              </button>
              <button
                className="sider-btn"
                onClick={() => navigateRouteHandler("4")}
              >
                Settings
              </button>
              <div className="logout-div">
                <button
                  className="sider-btn"
                  onClick={() => navigateRouteHandler("5")}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: "white",
              position: "fixed",
              zIndex: 1,
              right: 0,
              left: 200,
              // borderBottom: "2px solid #6f2727",
            }}
          >
            <Navbar />
          </Header>
          <Content
            style={{
              margin: " 85px 24px 24px 225px",
              padding: "30px 24px",
              minHeight: 491,
              height: "100%",
              background: "white",
              borderRadius: "50px",
            }}
          >
            <Outlet />{" "}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Layouts;
