import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./pages/home/Home";
import MyAdverts from "./pages/my/MyAdverts";
import Search from "./pages/search/Search";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/adverts" element={<Home />}>
          <Route path="my" element={<MyAdverts />} />
          <Route path="search" element={<Search />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
