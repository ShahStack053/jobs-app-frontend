import React, { useEffect, useState } from "react";
// import Dashes from "../../Assets/Images/Dashes.png";
import { Modal, Table } from "antd";
import confirm from "antd/es/modal/confirm";
// import Delete from "../../Assets/Images/Action/Delete.png";
import { useNavigate } from "react-router-dom";
import { DeleteFilled, ExclamationCircleFilled } from "@ant-design/icons";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Base_Route } from "../../helper/constant";

const Category = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios({
      method: "Get",
      url: `${Base_Route}/api/category`,
      headers: {
        Authorization: `Bearer ${localStorage.AuthToken}`,
      },
    }).then(
      (res) => {
        setCategory(res.data);
        toast.success("Category data get successfully");
      },
      (err) => {
        if (err.response.status === 401) {
          toast.warn("UnAuthorize user request");
        } else if (err.response.status === 500) {
          toast.warn("Internal Server Error");
        } else {
          toast.warn(err.message);
        }
      }
    );
  }, []);

  const deleteClickHandler = (catId) => {
    confirm({
      title: "Delete Category",
      icon: <ExclamationCircleFilled style={{ color: " #faad14" }} />,
      content: "Do you want to delete this category?",
      okText: "Yes",
      cancelText: "Cancel",
      okCancel: true,
      okButtonProps: { style: { float: "right", marginRight: 10 } },
      cancelButtonProps: { style: { float: "right" } },
      onOk() {
        axios({
          method: "Delete",
          url: `${Base_Route}/api/category/${catId}`, // Assuming your delete route is like this
          headers: {
            Authorization: `Bearer ${localStorage.AuthToken}`,
          },
        }).then(
          (res) => {
            // Remove the deleted item from the state
            setCategory((prevCategory) =>
              prevCategory.filter((item) => item._id !== catId)
            );
            Modal.success({
              title: "Success",
              content: "Category Deleted Successfully",
            });
          },
          (err) => {
            if (err.response.status === 401) {
              toast.warn("UnAuthorize user request");
            } else if (err.response.status === 500) {
              toast.warn("Internal Server Error");
            } else {
              toast.warn(err.message);
            }
          }
        );
      },
      onCancel() {
        toast.info("You Cancel The Delete Action ");
      },
    });
  };

  const myNav = () => {
    navigate("/portal/add-category");
  };

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
          }}
        >
          Sr. No
        </div>
      ),
      key: "srNo",
      render: (text, record, index) => (currentPage - 1) * 4 + index + 1,
      width: "15%",
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
            // textAlign: "center",
          }}
        >
          Category Id
        </div>
      ),
      dataIndex: "cat_id",
      key: "cat_id",
      ellipsis: true,
      render: (text) => (
        <div
          style={{
            color: "#000000",
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "12px",
            // textAlign: "center",
          }}
        >
          {text}
        </div>
      ),
      // width: "13%",
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
            // textAlign: "center",
          }}
        >
          Category
        </div>
      ),
      dataIndex: "cat_name",
      key: "cat_name",
      ellipsis: true,
      render: (text) => (
        <div
          style={{
            color: "#000000",
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "12px",
            // textAlign: "center",
          }}
        >
          {text}
        </div>
      ),
      // width: "20%",
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
      render: (_, record) => (
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
            className="delete-icon"
            onClick={() => deleteClickHandler(record._id)}
          />
        </div>
      ),
    },
  ];
  return (
    <>
      <ToastContainer />
      <div className="heading-div">
        <h3 className="setting-title">Category</h3>
        <button className="add-btn" onClick={myNav}>
          Add Category
        </button>
      </div>
      <Table
        columns={columns}
        dataSource={category}
        rowClassName={() => "table-row"}
        pagination={{
          pageSize: 4,
          hideOnSinglePage: true,
          showSizeChanger: false,
          onChange: (page) => setCurrentPage(page),
        }}
      />
    </>
  );
};

export default Category;
