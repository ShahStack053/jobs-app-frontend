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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/portal/*" element={<Layouts />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="add-jobs" element={<AddJob />} />
            <Route path="category" element={<Category />} />
            <Route path="add-category" element={<AddCategory />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
