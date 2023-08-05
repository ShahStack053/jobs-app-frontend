import React, { useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "./AddCategory.css";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import axios from "axios";

const generateRandomId = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

const AddCategory = () => {
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState({
    cat_id: generateRandomId(),
    cat_name: "",
    cat_icon_link: "",
  });
  const addCategory = () => {
    const data = JSON.stringify(categoryData);
    axios({
      method: "Post",
      url: "",
      headers: {
        Authorization: `Bearer ${localStorage.AuthToken}`,
        "Content-Type": "application/Json",
      },
      data,
    }).then(
      (res) => {
        Modal.success({
          title: "Success",
          content: "Category Created Successfully",
        });
        console.log("Category created successful");
        navigate("/portal/category");
      },
      (err) => {
        console.log(err);
        Modal.error({
          title: "Failed",
          content: "Category Not Created",
        });
      }
    );
  };
  const arrowNavigate = () => {
    navigate("/portal/category");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCategoryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("CategoryData===>", categoryData);
  };

  return (
    <div className="add-job-container">
      <div className="add-job-title-div">
        <ArrowLeftOutlined className="add-job-arrow" onClick={arrowNavigate} />
        <h3 className="add-job-title">Create Category</h3>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="my-label" htmlFor="catName">
              Job Category
            </label>
            <input
              type="text"
              className="form-control"
              id="catName"
              name="cat_name"
              placeholder="Associate Software Engineer"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="my-label" htmlFor="catIconLink">
              Category Icon Link
            </label>
            <input
              type="text"
              className="form-control"
              id="catIconLink"
              name="cat_icon_link"
              placeholder="Add icon link"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="d-flex justify-content-end">
            <button className="add-job-btn mt-5" type="submit">
              Save Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
