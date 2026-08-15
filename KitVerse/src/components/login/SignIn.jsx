import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/user/userSlice";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";


const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get("returnTo");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("customer");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrorMsg("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/login`,
        {
          email,
          password,
        }
      );

      const { user, token } = response.data;

      if (loginType === "admin" && user.role !== "admin") {
        toast.error("This account is not an Admin account.");
        setLoading(false);
        return;
      }

      if (loginType === "customer" && user.role === "admin") {
        toast.error("Please use the Admin Login tab.");
        setLoading(false);
        return;
      }

      dispatch(
        loginSuccess({
          user,
          token,
        })
      );

      toast.success(
        `Logged in successfully as ${
          user.role === "admin" ? "Admin" : "Customer"
        }`
      );

      if (returnTo) {
        navigate(returnTo, { replace: true });
      } else if (user.role === "admin") {
        navigate("/admin/jerseys", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error(error);

      setErrorMsg(
        error.response?.data?.message ||
          "Login Failed. Please check your credentials."
      );

      toast.error("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = (credentialResponse) => {
  try {
    const decoded = jwtDecode(credentialResponse.credential);

    const user = {
      name: decoded.name,
      email: decoded.email,
      image: decoded.picture,
      googleId: decoded.sub,
      role: "customer",
    };

    dispatch(
      loginSuccess({
        user,
        token: credentialResponse.credential,
      })
    );

    toast.success("Google Login Successful");

    navigate("/");
  } catch (error) {
    console.error("Google Login Error:", error);
    toast.error("Google Login Failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl"
      >
        <h1 className="text-4xl font-bold text-center text-white">
          Welcome to <span className="text-emerald-400">KitVerse</span>
        </h1>

        <p className="text-gray-400 text-center mt-2 mb-8">
          Premium Football Jersey Store
        </p>

        {/* Customer / Admin Tabs */}
        <div className="flex bg-slate-800 p-1 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => setLoginType("customer")}
            className={`flex-1 py-3 rounded-lg font-semibold transition ${
              loginType === "customer"
                ? "bg-emerald-500 text-black"
                : "text-gray-300"
            }`}
          >
            👤 Customer
          </button>

          <button
            type="button"
            onClick={() => setLoginType("admin")}
            className={`flex-1 py-3 rounded-lg font-semibold transition ${
              loginType === "admin"
                ? "bg-purple-600 text-white"
                : "text-gray-300"
            }`}
          >
            👑 Admin
          </button>
        </div>

        {errorMsg && (
          <div className="bg-red-500/20 border border-red-400 text-red-300 p-3 rounded-lg mb-5 text-sm">
            {errorMsg}
          </div>
        )}

        <label className="text-white text-sm">Email Address</label>

        <input
          type="email"
          placeholder={
            loginType === "admin"
              ? "admin@kitverse.com"
              : "customer@example.com"
          }
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mt-2 mb-5 p-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-gray-600 focus:border-emerald-400 outline-none"
        />

        <label className="text-white text-sm">Password</label>

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mt-2 mb-6 p-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-gray-600 focus:border-emerald-400 outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-xl font-bold transition disabled:opacity-50 ${
            loginType === "admin"
              ? "bg-purple-600 hover:bg-purple-700 text-white"
              : "bg-emerald-500 hover:bg-emerald-600 text-black"
          }`}
        >
          {loading
            ? "Signing In..."
            : loginType === "admin"
            ? "Sign In as Admin"
            : "Sign In as Customer"}
        </button>

        <div className="flex items-center gap-3 my-6">
          <div className="h-px bg-gray-600 flex-1"></div>
          <span className="text-gray-400 text-sm">OR</span>
          <div className="h-px bg-gray-600 flex-1"></div>
        </div>

        <button
          type="button"
          className="w-full py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition"
        >
          <GoogleLogin
  onSuccess={handleLoginSuccess}
  onError={() => {
    toast.error("Google Login Failed");
  }}
  width="100%"
/>
        </button>

        <p className="text-center text-gray-400 mt-6">
          New to KitVerse?
        </p>

        <button
          type="button"
          onClick={() => navigate("/signup")}
          className="w-full mt-3 py-3 rounded-xl border border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-black transition"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignIn;