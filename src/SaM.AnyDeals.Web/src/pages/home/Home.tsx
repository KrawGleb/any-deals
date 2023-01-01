import "./Home.scss";
import React from "react";
import Header from "../../components/home/header/Header";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <div className="root">
      <div className="filler">
        <Header></Header>
      </div>
      <Outlet />
    </div>
  );
}

export default Home;
