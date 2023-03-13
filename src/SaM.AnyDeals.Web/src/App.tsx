import React, { lazy, Suspense } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./pages/home/Home";
import MyAdverts from "./pages/adverts/my/MyAdverts";
import Search from "./pages/adverts/search/Search";
import NewAdvert from "./pages/adverts/new/NewAdvert";
import EditAdvert from "./pages/adverts/edit/EditAdvert";
import { useSelector } from "react-redux";
import { RootState } from "./features/store/store";
import AdvertDetails from "./pages/adverts/details/AdvertDetails";
import CreatedAdverts from "./pages/adverts/my/outlets/CreatedAdverts";
import Executions from "./pages/adverts/my/outlets/Executions";
import Orders from "./pages/adverts/my/outlets/Orders";
import AuthProvider from "./features/api/auth/authProvider";
import userManager from "./features/api/auth/userService";
import SilentRenew from "./pages/auth/SilentRenew";
import AutoSilentRenew from "./pages/auth/AutoSilentRenew";
import SignOut from "./pages/auth/SignOut";
import SignIn from "./pages/auth/SignIn";

const ErrorPage = lazy(() => import("./pages/errors/Error"));
const AboutPage = lazy(() => import("./pages/about/About"));
const UserPage = lazy(() => import("./pages/user/User"));
const OrderDetailsPage = lazy(
  () => import("./pages/orders/details/OrderDetails")
);
const ModerationPage = lazy(() => import("./pages/moderation/Moderation"));
const ModerationAdvertsPage = lazy(
  () => import("./pages/moderation/adverts/ModerationAdverts")
);
const ModerationCategoriesPage = lazy(
  () => import("./pages/moderation/categories/ModerationCategories")
);

function App() {
  const authState = useSelector((state: RootState) => state.auth);
  const isAdmin = authState.isAdmin;

  return (
    <div className="app">
      <AutoSilentRenew />
      <AuthProvider userManager={userManager}>
        <Suspense>
          <Routes>
            <Route path="/signout-oidc" element={<SignOut />} />
            <Route path="/signin-oidc" element={<SignIn />} />
            <Route path="/silent" element={<SilentRenew />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/users/:username" element={<UserPage />} />
            <Route
              path="/error"
              element={<ErrorPage text="Something went wrong" />}
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
                <Route path="details" element={<OrderDetailsPage />} />
              </Route>
              <Route path="" element={<Navigate to="/adverts" />} />
            </Route>
            {isAdmin && (
              <Route path="/moderation" element={<ModerationPage />}>
                <Route path="adverts" element={<ModerationAdvertsPage />} />
                <Route
                  path="categories"
                  element={<ModerationCategoriesPage />}
                />
              </Route>
            )}
            <Route path="*" element={<ErrorPage text="Not Found" />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </div>
  );
}

export default App;
