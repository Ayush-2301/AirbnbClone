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
          <Route path="/account/:subpage?" element={<AccountPage />} />
          <Route path="/account/:subpage/new" element={<AccountPage />} />
          <Route path="/account/:subpage/:id" element={<AccountPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
