import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Headers from "./components/Headers/Headers";
import Edit from "./pages/Edit/Edit";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Headers />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/delete/:id"  />
        <Route path="/userprofile/:id" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
