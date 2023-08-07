import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layouts from "./Components/Layouts/Layouts";
import Login from "./Pages/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import Jobs from "./Pages/Jobs/Jobs";
import Category from "./Pages/Category/Category";
import Settings from "./Pages/Settings/Settings";
import AddJob from "./Components/addJobs/AddJob";
import AddCategory from "./Components/addCategory/AddCategory";
import { useEffect, useState } from "react";

function App() {
  // const authToken = localStorage.getItem("AuthToken");
  const [authToken, setAuthToken] = useState(localStorage.getItem("AuthToken"));

  useEffect(() => {
    // Event listener to detect changes in local storage
    const storageChangeListener = (event) => {
      if (event.key === "AuthToken" && !event.newValue) {
        // Token was removed from local storage, perform logout
        setAuthToken(null); // Update the state to trigger the logout logic
      }
    };

    window.addEventListener("storage", storageChangeListener);

    return () => {
      window.removeEventListener("storage", storageChangeListener);
    };
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {authToken ? (
            <Route path="/portal/*" element={<Layouts />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="jobs" element={<Jobs />} />
              <Route path="add-jobs" element={<AddJob />} />
              <Route path="category" element={<Category />} />
              <Route path="add-category" element={<AddCategory />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          ) : (
            <Route path="/" element={<Login />} />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
