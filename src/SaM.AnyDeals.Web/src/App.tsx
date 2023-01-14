import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./pages/home/Home";
import MyAdverts from "./pages/adverts/my/MyAdverts";
import Search from "./pages/adverts/search/Search";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import NewAdvert from "./pages/adverts/new/NewAdvert";
import EditAdvert from "./pages/adverts/edit/EditAdvert";
import { useSelector } from "react-redux";
import { RootState } from "./features/store/store";
import About from "./pages/about/About";

function App() {
  const hasToken = !!useSelector((state: RootState) => state.auth.userToken);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Navigate to="/adverts/search" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/adverts" element={<Home />}>
          {hasToken ? <Route path="my" element={<MyAdverts />} /> : <></>}
          <Route path="search" element={<Search />} />
          <Route path="new" element={<NewAdvert />} />
          <Route path="edit" element={<EditAdvert />} />
        </Route>
        <Route path="/about" element={<About />}/>
      </Routes>
    </div>
  );
}

export default App;
