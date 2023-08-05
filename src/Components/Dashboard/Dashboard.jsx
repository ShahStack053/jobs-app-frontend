import React from "react";
import "./Dashboard.css";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const myJob = (name) => {
    navigate(`/portal/${name}`);
  };
  return (
    <div className="dashboard">
      <Card className="dashboard-card" onClick={() => myJob("jobs")}>
        Jobs
      </Card>
      <Card className="dashboard-card" onClick={() => myJob("category")}>
        Category
      </Card>
      <Card className="dashboard-card" onClick={() => myJob("settings")}>
        Settings
      </Card>
    </div>
  );
};

export default Dashboard;
