import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { jwtInterceptorProvider } from "./axios/jwt.interceptor";
import { Login } from "./pages/login/Login";

function App() {
  jwtInterceptorProvider();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
