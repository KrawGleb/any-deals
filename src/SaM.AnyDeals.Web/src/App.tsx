import { Box } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./pages/home/Home";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";

function App() {
  return (
    <div className="app">
      <Box>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Box>
    </div>
  );
}

export default App;
