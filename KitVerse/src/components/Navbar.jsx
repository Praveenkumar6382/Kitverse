import React, { useState } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../features/user/userSlice";
import { clearCart } from "../features/cart/cartSlice";
import { clearWishlist } from "../features/wishlist/wishlistSlice";

import { toast } from "react-toastify";
import {
  FaShoppingBag,
  FaHeart,
  FaSearch,
  FaUserCircle,
  FaSignOutAlt,
  FaSignInAlt,
} from "react-icons/fa";
import SearchBar from "../components/SearchBar";

const Navbar = ({ setSearchTerm = () => {} }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [showSearch, setShowSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Redux State
  const user = useSelector((state) => state.user.user);
  const kitBag = useSelector((state) => state.kitBag.items || []);
  const wishlist = useSelector((state) => state.wishlist.items || []);

  // User Role
  const isAdmin = user?.role === "admin";

  // Counts
  const kitCount = kitBag.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const wishlistCount = wishlist.length;

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleLogout = () => {
    // Clear cart
    dispatch(clearCart());

    // Clear wishlist
    dispatch(clearWishlist());

    // Clear user and token
    dispatch(logout());

    toast.success("User Logged Out Successfully");

    navigate("/signin", {
      replace: true,
    });
  };

  return (
    <nav className="bg-slate-950 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex justify-between items-center gap-3">
          {/* LOGO */}
          <NavLink
            to="/"
            onClick={() => setShowMobileMenu(false)}
            className="shrink-0"
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              KIT<span className="text-emerald-400">VERSE</span>
              {isAdmin && (
                <span className="hidden sm:inline ml-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full align-middle">
                  ADMIN
                </span>
              )}
            </h1>
          </NavLink>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex items-center gap-4 lg:gap-6 text-gray-300 font-medium">
            {!isAdmin ? (
              <>
                <NavLink to="/">
                  <li className="cursor-pointer hover:text-emerald-400 transition">
                    HOME
                  </li>
                </NavLink>
                <NavLink to="/jerseypage">
                  <li className="cursor-pointer hover:text-emerald-400 transition">
                    JERSEYS
                  </li>
                </NavLink>
                <NavLink to="/details">
                  <li className="cursor-pointer hover:text-emerald-400 transition">
                    DETAILS
                  </li>
                </NavLink>
                <NavLink to="/contact">
                  <li className="cursor-pointer hover:text-emerald-400 transition">
                    CONTACT
                  </li>
                </NavLink>
                {user && (
                  <NavLink to="/orderpage">
                    <li className="cursor-pointer hover:text-emerald-400 transition">
                      📦 MY ORDERS
                    </li>
                  </NavLink>
                )}
              </>
            ) : (
              <>
                <NavLink to="/admin/jerseys">
                  <li
                    className={`cursor-pointer px-3 lg:px-4 py-2 rounded-lg text-white font-semibold transition ${location.pathname === "/admin/jerseys" ? "bg-purple-700" : "bg-purple-600 hover:bg-purple-700"}`}
                  >
                    👑 Admin Dashboard
                  </li>
                </NavLink>
                <NavLink to="/admin/orderpage">
                  <li
                    className={`cursor-pointer px-3 lg:px-4 py-2 rounded-lg text-white font-semibold transition ${location.pathname === "/admin/orderpage" ? "bg-blue-700" : "bg-blue-600 hover:bg-blue-700"}`}
                  >
                    📦 Order Management
                  </li>
                </NavLink>
              </>
            )}
          </ul>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {!isAdmin && (
              <>
                <div className="hidden lg:block">
                  {showSearch && <SearchBar onSearch={handleSearch} />}
                </div>
                <button
                  className="p-2 text-white hover:text-emerald-400 transition"
                  onClick={() => setShowSearch(!showSearch)}
                  aria-label="Search"
                >
                  <FaSearch size={20} />
                </button>

                <Link to="/wishlist" className="relative p-1">
                  <FaHeart
                    size={21}
                    className="text-red-500 hover:text-red-400 transition"
                  />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-white text-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                <button
                  onClick={() => navigate("/kitbag")}
                  className="relative flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white w-10 h-10 rounded-full transition"
                  aria-label="Kit Bag"
                >
                  <FaShoppingBag />
                  {kitCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-white text-emerald-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      {kitCount}
                    </span>
                  )}
                </button>
              </>
            )}

            {user ? (
              <>
                <button
                  onClick={() => navigate("/profile")}
                  title="Profile"
                  className="p-2 rounded-full text-white hover:text-emerald-400 hover:bg-slate-800 transition"
                >
                  <FaUserCircle size={24} />
                </button>
                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="hidden sm:block p-2 rounded-full text-red-500 hover:text-red-400 hover:bg-red-500/10 transition"
                >
                  <FaSignOutAlt size={21} />
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/signin")}
                title="Sign In"
                className="p-2 rounded-full text-white hover:text-emerald-400 hover:bg-slate-800 transition"
              >
                <FaSignInAlt size={22} />
              </button>
            )}

            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-white hover:text-emerald-400 transition"
              aria-label="Toggle menu"
              aria-expanded={showMobileMenu}
            >
              <span className="text-2xl leading-none">
                {showMobileMenu ? "✕" : "☰"}
              </span>
            </button>
          </div>
        </div>

        {/* MOBILE SEARCH */}
        {!isAdmin && showSearch && (
          <div className="lg:hidden mt-3">
            <SearchBar onSearch={handleSearch} />
          </div>
        )}

        {/* MOBILE MENU */}
        {showMobileMenu && (
          <div className="md:hidden mt-3 border-t border-slate-800 pt-3 pb-2">
            {!isAdmin ? (
              <div className="flex flex-col gap-1">
                {[
                  ["HOME", "/"],
                  ["JERSEYS", "/jerseypage"],
                  ["DETAILS", "/details"],
                  ["CONTACT", "/contact"],
                  ...(user ? [[" MY ORDERS", "/orderpage"]] : []),
                ].map(([label, path]) => (
                  <NavLink
                    key={path}
                    to={path}
                    onClick={() => setShowMobileMenu(false)}
                    className="px-3 py-3 rounded-lg text-gray-200 hover:bg-slate-800 hover:text-emerald-400"
                  >
                    {label}
                  </NavLink>
                ))}
                {user && (
                  <button
                    onClick={handleLogout}
                    className="text-left px-3 py-3 rounded-lg text-red-400 hover:bg-red-500/10"
                  >
                    Logout
                  </button>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <NavLink
                  to="/admin/jerseys"
                  onClick={() => setShowMobileMenu(false)}
                  className="px-3 py-3 rounded-lg bg-purple-600 text-white font-semibold"
                >
                  Admin Dashboard
                </NavLink>
                <NavLink
                  to="/admin/orderpage"
                  onClick={() => setShowMobileMenu(false)}
                  className="px-3 py-3 rounded-lg bg-blue-600 text-white font-semibold"
                >
                  {" "}
                  Order Management
                </NavLink>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
