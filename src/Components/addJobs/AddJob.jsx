import React, { useState } from "react";
import "./AddJob.css";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { DatePicker, Modal } from "antd";
import moment from "moment";
import axios from "axios";

const generateRandomId = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

const AddJob = () => {
  const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    id: generateRandomId(),
    current_date: moment(new Date()).format("DD-MM-YYYY"),
    last_date: "",
    job_title: "",
    job_content: "",
    job_expertise: "",
    job_category: "Engineer",
    job_blog_link: "",
  });

  const arrowNavigate = () => {
    navigate("/portal/jobs");
  };
  const createJob = () => {
    const data = JSON.stringify(jobData);
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
          content: "Job Created Successfully",
        });
        console.log("Job created successful");
        navigate("/portal/jobs");
      },
      (err) => {
        console.log(err);
        Modal.error({
          title: "Failed",
          content: "Job Not Created",
        });
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
      last_date: moment(dateString).format("DD-MM-YYYY"),
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("jobdata====>", JSON.stringify(jobData));
  };

  return (
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
              <option>Waiter</option>
              <option>Engineer</option>
              <option>Cook</option>
              <option>Manager</option>
              <option>Guard</option>
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
  );
};

export default AddJob;
