import React, { useEffect, useState } from "react";
import "./Jobs.css";
// import Dashes from "../../Assets/Images/Dashes.png";
import { Modal, Table } from "antd";
// import Delete from "../../Assets/Images/Action/Delete.png";
import confirm from "antd/es/modal/confirm";
import { useNavigate } from "react-router-dom";
import { DeleteFilled, ExclamationCircleFilled } from "@ant-design/icons";
import axios from "axios";

const Jobs = () => {
  const navigate = useNavigate();
  const [jobDetail, setJobDetail] = useState([]);
  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("userId"));
    const formData = new FormData();
    formData.append("login_user_id", userId);

    axios({
      method: "Post",
      url: ``,
      headers: {
        Token: localStorage.AuthToken,
      },
      data: formData,
    }).then(
      (res) => {
        setJobDetail(res.data.data);
      },
      (err) => {
        console.log("err===>", err);
      }
    );
  }, []);
  const deleteClickHandler = () => {
    confirm({
      title: "Delete User",
      icon: <ExclamationCircleFilled style={{ color: " #faad14" }} />,
      content: "Do you want to delete User?",
      okText: "Yes",
      cancelText: "Cancel",
      okCancel: true,
      okButtonProps: { style: { float: "right", marginRight: 10 } },
      cancelButtonProps: { style: { float: "right" } },
      onOk() {
        axios({
          method: "Delete",
          url: ``,
          headers: {
            Authorization: `Bearer ${localStorage.AuthToken}`,
            "Content-Type": "application/json",
          },
        }).then(
          (res) => {
            Modal.success({
              title: "Success",
              content: "Job Deleted Successfully",
            });
            console.log("Job Deleted successful");
          },
          (err) => {
            console.log(err);
            Modal.error({
              title: "Failed",
              content: "Job Deletion Failed",
            });
          }
        );
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const myNav = () => {
    navigate("/portal/add-jobs");
  };
  const generateDummyData = (count) => {
    const data = [];
    for (let i = 1; i <= count; i++) {
      data.push({
        key: i.toString(),
        no: i,
        id: `ID-${i}`,
        category: `waiter ${i}`,
        title: "Raza",
        action: "Action",
      });
    }
    return data;
  };
  const dummydata = generateDummyData(5);
  const columns = [
    {
      title: (
        <div
          style={{
            color: "#606060",
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontSize: "12.2195px",
            fontWeight: 400,
            textAlign: "center",
          }}
        >
          No
        </div>
      ),
      dataIndex: "no",
      key: "no",
      ellipsis: true,
      render: (text) => (
        <div
          style={{
            color: "#000000",
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "12px",
            textAlign: "center",
          }}
        >
          {text}
        </div>
      ),
      width: "8%",
    },
    {
      title: (
        <div
          style={{
            color: "#606060",
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "12.2195px",
            textAlign: "center",
          }}
        >
          Id
        </div>
      ),
      dataIndex: "id",
      key: "id",
      ellipsis: true,
      render: (text) => (
        <div
          style={{
            color: "#000000",
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "12px",
            textAlign: "center",
          }}
        >
          {text}
        </div>
      ),
      width: "13%",
    },
    {
      title: (
        <div
          style={{
            color: "#606060",
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontSize: "12.2195px",
            fontWeight: 400,
            textAlign: "center",
          }}
        >
          Category
        </div>
      ),
      dataIndex: "category",
      key: "category",
      ellipsis: true,
      render: (text) => (
        <div
          style={{
            color: "#000000",
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "12px",
            textAlign: "center",
          }}
        >
          {text}
        </div>
      ),
      width: "20%",
    },
    {
      title: (
        <div
          style={{
            color: "#606060",
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontSize: "12.2195px",
            fontWeight: 400,
            textAlign: "center",
          }}
        >
          Title
        </div>
      ),
      dataIndex: "title",
      key: "title",
      ellipsis: true,
      render: (text) => (
        <div
          style={{
            color: "#000000",
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "12px",
            textAlign: "center",
          }}
        >
          {text}
        </div>
      ),
      width: "20%",
    },

    {
      title: (
        <div
          style={{
            color: "#606060",
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "12.2195px",
            textAlign: "center",
          }}
        >
          Action
        </div>
      ),
      dataIndex: "action",
      key: "action",
      ellipsis: true,
      render: (props, row) => (
        <div
          style={{
            color: "#000000",
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "13px",
            textAlign: "center",
          }}
        >
          <DeleteFilled
            style={{
              color: "#6f2727",
              fontSize: "20px",
              cursor: "pointer",
            }}
          />
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="heading-div">
        <h3 className="setting-title">Jobs</h3>
        <button className="add-btn" onClick={myNav}>
          Add Jobs
        </button>{" "}
      </div>
      <Table
        columns={columns}
        dataSource={dummydata}
        rowClassName={() => "table-row"}
        pagination={false}
      />
    </>
  );
};

export default Jobs;
