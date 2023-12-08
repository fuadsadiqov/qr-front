import Admin from "./Admin";
import Home from "./Home";
import Login from "./Login";
import { Route, Routes } from "react-router-dom";

function Pages() {
  
  return (
    <Routes>
      <Route path="/*" element={<Home />} />
        <Route
          path="/admin/*"
          element={<Admin />}
        />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default Pages;
