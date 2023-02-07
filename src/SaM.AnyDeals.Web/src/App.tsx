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
import AdvertsDetails from "./pages/adverts/details/AdvertsDetails";
import Moderation from "./pages/moderation/Moderation";
import ModerationAdverts from "./pages/moderation/adverts/ModerationAdverts";
import ModerationCategories from "./pages/moderation/categoreis/ModerationCategories";
import CreatedAdverts from "./pages/adverts/my/outlets/CreatedAdverts";
import Execution from "./pages/adverts/my/outlets/Execution";
import Orders from "./pages/adverts/my/outlets/Orders";
import OrderDetails from "./pages/orders/details/OrderDetails";
import AuthProvider from "./features/api/auth/authProvider";
import userManager from "./features/api/auth/userService";
import SignOut from "./pages/auth/SignOut";
import Error from "./pages/errors/Error";

function App() {
  const authState = useSelector((state: RootState) => state.auth);
  const hasToken = !!authState.user?.access_token;
  const isAdmin = authState.isAdmin;

  return (
    <div className="app">
      <AuthProvider userManager={userManager}>
        <Routes>
          <Route path="/signout-oidc" element={<SignOut />} />
          <Route path="/signin-oidc" element={<SignIn />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/error"
            element={<Error text="Something went wrong" />}
          />
          <Route path="/" element={<Home />}>
            <Route path="adverts" element={<Outlet />}>
              <Route path="search" element={<Search />} />
              <Route path="new" element={<NewAdvert />} />
              <Route path="edit" element={<EditAdvert />} />
              <Route path="details" element={<AdvertsDetails />} />
              <Route path="my" element={<MyAdverts />}>
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
          <Route path="*" element={<Error text="Not Found" />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
