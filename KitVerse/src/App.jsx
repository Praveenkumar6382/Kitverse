import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess, logout } from "./features/user/userSlice";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Jerseypage from "./pages/Jerseypage";
import Detail from "./pages/Detail";
import Contact from "./pages/Contact";
import JerseyDetails from "./pages/JerseyDetails";
import Wishlist from "./pages/Wishlist";

import Kitbag from "./components/Kitbag";
import SearchBar from "./components/SearchBar";

import SignIn from "./components/login/SignIn";
import SignUp from "./components/login/SignUp";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import AdminProducts from "./components/AdminProducts";

import Checkout from "./components/Checkout";
import OrderPage from "./components/OrderPage";

import ProfilePage from "./components/ProfilePage";

function AppContent() {
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();

  // Hide Navbar & Footer on:
  // 1. Admin pages except /admin/orderpage
  // 2. SignIn
  // 3. SignUp
  const hideNavbarFooter =
    (location.pathname.startsWith("/admin") &&
      location.pathname !== "/admin/orderpage") ||
    location.pathname === "/signin" ||
    location.pathname === "/signup";

  useEffect(() => {
    // your existing code...
  }, [dispatch]);

  return (
    <>
      {!hideNavbarFooter && (
        <Navbar setSearchTerm={setSearchTerm} />
      )}

      <Routes>
        {/* Protected User Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/kitbag" element={<Kitbag />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/jersey/:id" element={<JerseyDetails />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route
            path="/admin/jerseys"
            element={<AdminProducts />}
          />

          <Route
            path="/admin/orderpage"
            element={<OrderPage />}
          />
        </Route>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />

        <Route
          path="/jerseypage"
          element={<Jerseypage searchTerm={searchTerm} />}
        />

        <Route path="/details" element={<Detail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/search" element={<SearchBar />} />

        {/* Login / Signup */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/orderpage" element={<OrderPage />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>

      {!hideNavbarFooter && <Footer />}
    </>
  );
}
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
