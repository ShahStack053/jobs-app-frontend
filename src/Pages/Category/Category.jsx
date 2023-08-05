import React, { useEffect, useState } from "react";
// import Dashes from "../../Assets/Images/Dashes.png";
import { Modal, Table } from "antd";
import confirm from "antd/es/modal/confirm";
// import Delete from "../../Assets/Images/Action/Delete.png";
import { useNavigate } from "react-router-dom";
import { DeleteFilled, ExclamationCircleFilled } from "@ant-design/icons";
import axios from "axios";

const Category = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState([]);
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
        setCategory(res.data.data);
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
              content: "Category Deleted Successfully",
            });
            console.log("Category Deleted successful");
          },
          (err) => {
            console.log(err);
            Modal.error({
              title: "Failed",
              content: "Category Deletion Failed",
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
    navigate("/portal/add-category");
  };
  const generateDummyData = (count) => {
    const data = [];
    for (let i = 1; i <= count; i++) {
      data.push({
        key: i.toString(),
        no: i,
        id: `ID-${i}`,
        category: `Cat ${i}`,
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
        <h3 className="setting-title">Category</h3>
        <button className="add-btn" onClick={myNav}>
          Add Category
        </button>
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

export default Category;
