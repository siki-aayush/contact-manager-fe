import { BrowserRouter, Route, Routes } from "react-router-dom";
import { jwtInterceptorProvider } from "./axios/jwt.interceptor";
import ContactCreate from "./pages/contacts/ContactCreate";
import ContactList from "./pages/contacts/ContactList";
import { Login } from "./pages/login/Login";

import "./App.css";
import ContactUpdate from "./pages/contacts/ContactUpdate";
import Register from "./pages/register/Register";

function App() {
  jwtInterceptorProvider();
  return (
    // eslint-disable-next-line
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contacts" element={<ContactList />} />
        <Route path="/contacts/add" element={<ContactCreate />} />
        <Route path="/contacts/update/:id" element={<ContactUpdate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
