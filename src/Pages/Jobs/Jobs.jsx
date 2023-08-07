import React, { useEffect, useState } from "react";
import "./Jobs.css";
// import Dashes from "../../Assets/Images/Dashes.png";
import { Modal, Table } from "antd";
// import Delete from "../../Assets/Images/Action/Delete.png";
import confirm from "antd/es/modal/confirm";
import { useNavigate } from "react-router-dom";
import { DeleteFilled, ExclamationCircleFilled } from "@ant-design/icons";
import axios from "axios";
import { Base_Route } from "../../helper/constant";
import { ToastContainer, toast } from "react-toastify";

const Jobs = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [jobDetail, setJobDetail] = useState([]);
  console.log("job detail data", jobDetail);

  useEffect(() => {
    axios({
      method: "Get",
      url: `${Base_Route}/api/jobs`,
      headers: {
        Authorization: `Bearer ${localStorage.AuthToken}`,
      },
    }).then(
      (res) => {
        setJobDetail(res.data);
        toast.success("Jobs data get successfully");
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
  const deleteClickHandler = (jobId) => {
    confirm({
      title: "Delete Jobs",
      icon: <ExclamationCircleFilled style={{ color: " #faad14" }} />,
      content: "Do you want to delete this Job?",
      okText: "Yes",
      cancelText: "Cancel",
      okCancel: true,
      okButtonProps: { style: { float: "right", marginRight: 10 } },
      cancelButtonProps: { style: { float: "right" } },
      onOk() {
        axios({
          method: "Delete",
          url: `${Base_Route}/api/jobs/${jobId}`,
          headers: {
            Authorization: `Bearer ${localStorage.AuthToken}`,
          },
        }).then(
          (res) => {
            setJobDetail((prevJobDetail) =>
              prevJobDetail.filter((item) => item._id !== jobId)
            );
            Modal.success({
              title: "Success",
              content: "Job Deleted Successfully",
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
        console.log("Cancel");
      },
    });
  };
  const myNav = () => {
    navigate("/portal/add-jobs");
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
            textAlign: "center",
          }}
        >
          Sr.no
        </div>
      ),
      dataIndex: "no",
      key: "no",
      ellipsis: true,
      render: (text, record, index) => (currentPage - 1) * 4 + index + 1,
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
          Job Id
        </div>
      ),
      dataIndex: "job_id",
      key: "job_id",
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
      dataIndex: "job_category",
      key: "job_category",
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
      dataIndex: "job_title",
      key: "job_title",
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
            style={{
              color: "#6f2727",
              fontSize: "20px",
              cursor: "pointer",
            }}
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
        <h3 className="setting-title">Jobs</h3>
        <button className="add-btn" onClick={myNav}>
          Add Jobs
        </button>{" "}
      </div>
      <Table
        columns={columns}
        dataSource={jobDetail}
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

export default Jobs;
