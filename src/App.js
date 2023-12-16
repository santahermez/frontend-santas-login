import "./App.css";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register/Register.jsx";
import Login from "./pages/Login/Login.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Settings from "./pages/Settings/Settings.jsx";
import Homepage from "./pages/Homepage/Homepage.jsx";
import Header from "./components/Header/Header.jsx";
import Account from "./pages/Account/Account.jsx";


export default function App() {
  const [token, setToken] = useState(localStorage.getItem("accessToken"));

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("_id");
    localStorage.removeItem("fullname");
    setToken(null);
  };

  return (
    <div className="App">
      <Header
        className="App-header"
        token={token}
        handleLogout={handleLogout}
      />

      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="login" element={<Login setToken={setToken} />} />
        <Route path="register" element={<Register />} />

        {token ? (
          <Route path="account" element={<Account />}>
            <Route index element={<Profile />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        ) : (
          <Route path="account" element={<Navigate to="/login" />}>
            <Route path="profile" />
            <Route path="settings" />
          </Route>
        )}
      </Routes>
    </div>
  );
}
