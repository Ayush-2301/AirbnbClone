import React from "react";
import { LandingPage, LoginPage, RegisterPage, IndexPage } from "./pages/index";
import { Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />}>
        <Route index element={<IndexPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
};

export default App;
