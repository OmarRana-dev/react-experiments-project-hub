import React, { useEffect, useState } from "react";
import authService from "./appwrite/authService";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components";

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if user is already logged in by calling getCurrentUser
    authService
      .getCurrentUser()
      .then((data) => {
        if (data) {
          console.log("User logged in:", data);
          dispatch(login(data)); // If user is logged in, dispatch login action
        } else {
          console.log("No session found, please log in.");
          dispatch(logout()); // If no session, user needs to log in
        }
      })
      .finally(() => setLoading(false)); // Set loading state after checking session
  }, []);

  return !loading ? (
    <div>
      <Header />
      <main className="h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : null;
};

export default App;
