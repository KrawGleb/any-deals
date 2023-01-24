import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
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
import AdvertsDetails from "./pages/adverts/details/AdvertsDetails";
import Moderation from "./pages/moderation/Moderation";
import ModerationAdverts from "./pages/moderation/adverts/ModerationAdverts";
import ModerationCategories from "./pages/moderation/categoreis/ModerationCategories";
import CreatedAdverts from "./pages/adverts/my/outlets/CreatedAdverts";
import Execution from "./pages/adverts/my/outlets/Execution";
import Orders from "./pages/adverts/my/outlets/Orders";
import OrderDetails from "./pages/orders/details/OrderDetails";

function App() {
  const authState = useSelector((state: RootState) => state.auth);
  const hasToken = !!authState.userToken;
  const isAdmin = authState.userInfo.isAdmin;

  return (
    <div className="app">
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />}>
          <Route path="adverts" element={<Outlet />}>
            <Route path="search" element={<Search />} />
            <Route path="new" element={<NewAdvert />} />
            <Route path="edit" element={<EditAdvert />} />
            <Route path="details" element={<AdvertsDetails />} />
            <Route
              path="my"
              element={hasToken ? <MyAdverts /> : <Navigate to="/signin" />}
            >
              <Route path="" element={<CreatedAdverts />} />
              <Route path="orders" element={<Orders />} />
              <Route path="execution" element={<Execution />} />
            </Route>
            <Route path="" element={<Navigate to="search" />} />
          </Route>
          <Route path="orders" element={<Outlet />}>
            <Route path="details" element={<OrderDetails />} />
          </Route>
          <Route path="" element={<Navigate to="/adverts" />} />
        </Route>
        {isAdmin && (
          <Route path="/moderation" element={<Moderation />}>
            <Route path="adverts" element={<ModerationAdverts />} />
            <Route path="categories" element={<ModerationCategories />} />
          </Route>
        )}
      </Routes>
    </div>
  );
}

export default App;
