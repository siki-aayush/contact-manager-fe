import { BrowserRouter, Route, Routes } from "react-router-dom";
import { jwtInterceptorProvider } from "./axios/jwt.interceptor";
import ContactCreate from "./pages/contacts/ContactCreate";
import ContactList from "./pages/contacts/ContactList";
import { Login } from "./pages/login/Login";

import "./App.css";

function App() {
  jwtInterceptorProvider();
  return (
    // eslint-disable-next-line
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/contacts" element={<ContactList />} />
        <Route path="/contacts/add" element={<ContactCreate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
