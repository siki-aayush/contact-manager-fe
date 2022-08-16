import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { jwtInterceptorProvider } from "./axios/jwt.interceptor";
import ContactCreate from "./pages/contacts/ContactCreate";
import ContactList from "./pages/contacts/ContactList";
import { Login } from "./pages/login/Login";
import { getUserLoginFromLocalStorage } from "./utils/localstorage.util";

import "./App.css";
import ContactUpdate from "./pages/contacts/ContactUpdate";
import Register from "./pages/register/Register";
import AuthRoute from "./hoc/AuthRoute";

function App() {
  jwtInterceptorProvider();
  const isLoggedIn = getUserLoginFromLocalStorage();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/contacts" element={<AuthRoute />}>
          <Route path="/contacts" element={<ContactList />} />
          <Route path="/contacts/add" element={<ContactCreate />} />
          <Route path="/contacts/update/:id" element={<ContactUpdate />} />
        </Route>
        <Route
          path="/"
          element={<Navigate to={isLoggedIn ? "/contacts" : "/login"} />}
        />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/contacts" /> : <Login />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<h1> Page not found </h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
