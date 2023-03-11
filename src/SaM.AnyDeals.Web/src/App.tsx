import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./pages/home/Home";
import MyAdverts from "./pages/adverts/my/MyAdverts";
import Search from "./pages/adverts/search/Search";
import SignIn from "./pages/auth/SignIn";
import NewAdvert from "./pages/adverts/new/NewAdvert";
import EditAdvert from "./pages/adverts/edit/EditAdvert";
import { useSelector } from "react-redux";
import { RootState } from "./features/store/store";
import About from "./pages/about/About";
import AdvertDetails from "./pages/adverts/details/AdvertDetails";
import Moderation from "./pages/moderation/Moderation";
import ModerationAdverts from "./pages/moderation/adverts/ModerationAdverts";
import ModerationCategories from "./pages/moderation/categoreis/ModerationCategories";
import CreatedAdverts from "./pages/adverts/my/outlets/CreatedAdverts";
import Executions from "./pages/adverts/my/outlets/Executions";
import Orders from "./pages/adverts/my/outlets/Orders";
import OrderDetails from "./pages/orders/details/OrderDetails";
import AuthProvider from "./features/api/auth/authProvider";
import userManager from "./features/api/auth/userService";
import SignOut from "./pages/auth/SignOut";
import Error from "./pages/errors/Error";
import User from "./pages/user/User";
import SilentRenew from "./pages/auth/SilentRenew";
import AutoSilentRenew from "./pages/auth/AutoSilentRenew";

function App() {
  const authState = useSelector((state: RootState) => state.auth);
  const isAdmin = authState.isAdmin;

  return (
    <div className="app">
      <AutoSilentRenew />
      <AuthProvider userManager={userManager}>
        <Routes>
          <Route path="/signout-oidc" element={<SignOut />} />
          <Route path="/signin-oidc" element={<SignIn />} />
          <Route path="/silent" element={<SilentRenew />} />
          <Route path="/about" element={<About />} />
          <Route path="/users/:username" element={<User />} />
          <Route
            path="/error"
            element={<Error text="Something went wrong" />}
          />
          <Route path="/" element={<Home />}>
            <Route path="adverts" element={<Outlet />}>
              <Route path="search" element={<Search />} />
              <Route path="new" element={<NewAdvert />} />
              <Route path="edit" element={<EditAdvert />} />
              <Route path="details" element={<AdvertDetails />} />
              <Route path="my" element={<MyAdverts />}>
                <Route path="" element={<CreatedAdverts />} />
                <Route path="orders" element={<Orders />} />
                <Route path="execution" element={<Executions />} />
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
          <Route path="*" element={<Error text="Not Found" />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
