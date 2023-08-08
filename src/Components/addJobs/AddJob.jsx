import React, { useEffect, useState } from "react";
import "./AddJob.css";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { DatePicker, Modal } from "antd";
import { Base_Route } from "../../helper/constant";
import moment from "moment";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const generateRandomId = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

const AddJob = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [jobData, setJobData] = useState({
    job_id: generateRandomId(),
    current_date: moment(new Date()).format("YYYY-MM-DD"),
    last_date: "",
    job_title: "",
    job_content: "",
    job_expertise: "",
    job_category: "Engineer",
    job_blog_link: "",
  });
  const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };
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
  const arrowNavigate = () => {
    navigate("/portal/jobs");
  };
  const createJob = () => {
    const data = JSON.stringify(jobData);
    axios({
      method: "Post",
      url: `${Base_Route}/api/jobs`,
      headers: {
        Authorization: `Bearer ${localStorage.AuthToken}`,
        "Content-Type": "application/Json",
      },
      data,
    }).then(
      (res) => {
        Modal.success({
          title: "Success",
          content: "Job Created Successfully",
        });
        navigate("/portal/jobs");
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
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date, dateString) => {
    setJobData((prevData) => ({
      ...prevData,
      last_date: dateString,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    createJob();
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
            <h3 className="add-job-title">Create Job</h3>
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="my-label my-1" htmlFor="jobTitle">
                Job Title
              </label>
              <input
                type="text"
                name="job_title"
                id="jobTitle"
                className="form-control"
                placeholder="Associate Software Engineer"
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="my-label my-2" htmlFor="jobCategory">
                Job Category
              </label>
              <select
                className="form-control"
                id="jobCategory"
                name="job_category"
                onChange={handleInputChange}
                defaultValue={jobData.job_category}
              >
                {Array.from(
                  new Set(category.map((item) => toTitleCase(item.cat_name)))
                ).map((cat_name) => (
                  <option key={cat_name}>{cat_name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="my-label my-2" htmlFor="jobDescription">
                Job Descriptions
              </label>
              <textarea
                className="form-control"
                id="jobDescription"
                rows="3"
                placeholder="This job is about etc....."
                name="job_content"
                onChange={handleInputChange}
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label className="my-label my-2" htmlFor="jobExpertise">
                Job Person Expertise
              </label>
              <textarea
                className="form-control"
                id="jobExpertise"
                rows="3"
                placeholder="Person applying must be etc....."
                name="job_expertise"
                onChange={handleInputChange}
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label className="my-label my-2" htmlFor="jobLink">
                Job Link
              </label>
              <input
                type="text"
                name="job_blog_link"
                id="jobLink"
                className="form-control"
                placeholder="Job Link Here"
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group my-4">
              <label className="my-label my-2" htmlFor="jobDate">
                Select Date
              </label>
              <DatePicker
                className="mx-4"
                style={{ height: 40 }}
                onChange={handleDateChange}
              />
            </div>
            <div className="d-flex justify-content-end">
              <button className="add-job-btn" type="submit">
                Save Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddJob;
