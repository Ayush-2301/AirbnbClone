import React, { useEffect } from "react";
import {
  LandingPage,
  LoginPage,
  RegisterPage,
  IndexPage,
  AccountPage,
} from "./pages/index";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/actions/auth";
import { Places, Profile, PlacesForm } from "./components";
// import PlacesForm from "./components/PlacesForm";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUser());
  }, []);
  return (
    <div className="relative">
      <Routes>
        <Route path="/" element={<LandingPage />}>
          <Route index element={<IndexPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountPage />}>
            <Route path="/account" element={<Profile />} />
            <Route path="/account/places" element={<Places />} />
            <Route path="/account/places/new" element={<Places />} />
            <Route path="/account/places/:id" element={<Places />} />
          </Route>
          {/* <Route path="/account/places" element={<Places />} />
          <Route path="/account/:subpage/:id" element={<AccountPage />} /> */}
        </Route>
      </Routes>
    </div>
  );
};

export default App;
