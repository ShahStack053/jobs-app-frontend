import React, { useEffect, useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "./AddCategory.css";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import axios from "axios";
import { Base_Route } from "../../helper/constant";
import { ToastContainer, toast } from "react-toastify";

const generateRandomId = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

const AddCategory = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [categoryExist, setCategoryExist] = useState(false);
  const [categoryData, setCategoryData] = useState({
    cat_id: generateRandomId(),
    cat_name: "",
    cat_icon_link: "",
  });
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
        // toast.success("Category data get successfully");
      },
      (err) => {
        if (err.response.status === 401) {
          toast.warn("UnAuthorize User ");
        } else if (err.response.status === 500) {
          toast.warn("Internal Server Error");
        } else {
          toast.warn(err.message);
        }
      }
    );
  }, []);
  const addCategory = () => {
    const data = JSON.stringify(categoryData);
    axios({
      method: "Post",
      url: `${Base_Route}/api/category`,
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
        navigate("/portal/category");
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
  };
  const arrowNavigate = () => {
    navigate("/portal/category");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const lowercaseValue = value.toLowerCase();

    const isCategoryExists = category.some(
      (cat) => cat.cat_name.toLowerCase() === lowercaseValue
    );
    if (isCategoryExists) {
      toast.warn("Category already exists");
      setCategoryExist(true);
    } else {
      setCategoryData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      setCategoryExist(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addCategory();
  };

  return (
    <>
      <ToastContainer />
      <div className="add-job-container">
        <div className="add-job-title-div">
          <div className="div">
            <ArrowLeftOutlined
              className="add-job-arrow"
              onClick={arrowNavigate}
            />
          </div>
          <div className="div">
            <h3 className="add-job-title">Create Category</h3>
          </div>
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
              />
            </div>
            <div className="d-flex justify-content-end">
              <button
                disabled={categoryExist}
                className={`add-job-btn mt-5 ${
                  categoryExist ? "disable-button" : ""
                }`}
                type="submit"
              >
                Save Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCategory;
