import Admin from "./Admin";
import Home from "./Home";
import { Route, Routes } from "react-router-dom";

function Pages() {
  return (
    <Routes>
      <Route path="/*" element={<Home />} />
      <Route path="/admin/*" element={<Admin />} />
    </Routes>
  );
}

export default Pages;
