import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/user/userSlice";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [role, setRole] = useState("user"); // Default role is "user"
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/user/register", {
        name: username,
        email,
        password,
        role, // Send the selected role to the backend
      });

      const userPayload = response.data.user || response.data.newuser; // Adjust based on your backend response structure

      if (response.data.token) {
        dispatch(
          loginSuccess({
            user: response.data.user,
            token: response.data.token,
          }),
        );
      }
      toast.success(
        `User Registered Successfully as ${role === "admin" ? "Admin" : "User"}`,
      );
      if (role === "admin") {
        navigate("/admin/jerseys");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setErrorMsg(error.response?.data?.message || "Signup Failed");
      toast.error(error.response?.data?.message || "Signup Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-slate-950
      px-4
    "
    >
      <form
        onSubmit={handleSubmit}
        className="
        w-full
        max-w-md
        bg-white/10
        backdrop-blur-xl
        border
        border-white/20
        p-8
        rounded-2xl
        shadow-2xl
      "
      >
        {/* Title */}
        <h1
          className="
          text-4xl
          font-bold
          text-center
          text-white
        "
        >
          Join
          <span className="text-emerald-400"> KitVerse</span>
        </h1>

        <p
          className="
          text-gray-400
          text-center
          mt-2
          mb-8
        "
        >
          Create your premium jersey shopping account
        </p>

        {/* Error Message */}
        {errorMsg && (
          <div
            className="
            bg-red-500/20
            border
            border-red-400
            text-red-300
            p-3
            rounded-lg
            mb-4
            text-sm
          "
          >
            {errorMsg}
          </div>
        )}

        {/* Username */}

        <label className="text-white text-sm">Username</label>

        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="
          w-full
          mt-2
          mb-5
          p-3
          rounded-xl
          bg-white/10
          text-white
          placeholder-gray-400
          border
          border-gray-600
          focus:border-emerald-400
          outline-none
        "
        />

        {/* Email */}

        <label className="text-white text-sm">Email Address</label>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="
          w-full
          mt-2
          mb-5
          p-3
          rounded-xl
          bg-white/10
          text-white
          placeholder-gray-400
          border
          border-gray-600
          focus:border-emerald-400
          outline-none
        "
        />

        {/* Password */}

        <label className="text-white text-sm">Password</label>

        <input
          type="password"
          placeholder="Create password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="
          w-full
          mt-2
          mb-6
          p-3
          rounded-xl
          bg-white/10
          text-white
          placeholder-gray-400
          border
          border-gray-600
          focus:border-emerald-400
          outline-none
        "
        />

        {/* Role Select (optional if you use admin registration) */}

        <label className="text-white text-sm">Account Type</label>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="
          w-full
          mt-2
          mb-6
          p-3
          rounded-xl
          bg-slate-900
          text-white
          border
          border-gray-600
          focus:border-emerald-400
          outline-none
        "
        >
          <option value="user">User</option>

          <option value="admin">Admin</option>
        </select>

        {/* Signup Button */}

        <button
          type="submit"
          disabled={loading}
          className="
          w-full
          py-3
          rounded-xl
          bg-emerald-500
          hover:bg-emerald-600
          text-black
          font-bold
          transition
          disabled:opacity-50
        "
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        {/* Divider */}

        <div
          className="
          flex
          items-center
          gap-3
          my-6
        "
        >
          <div
            className="
            h-px
            bg-gray-600
            flex-1
          "
          ></div>

          <span className="text-gray-400 text-sm">OR</span>

          <div
            className="
            h-px
            bg-gray-600
            flex-1
          "
          ></div>
        </div>

        {/* Google Button */}

        <button
          type="button"
          className="
          w-full
          py-3
          rounded-xl
          bg-white
          text-black
          font-semibold
          hover:bg-gray-200
          transition
        "
        >
          Continue with Google
        </button>

        {/* Login */}

        <p
          className="
          text-center
          text-gray-400
          mt-6
        "
        >
          Already have an account?
        </p>

        <button
          type="button"
          onClick={() => navigate("/signin")}
          className="
          w-full
          mt-3
          py-3
          rounded-xl
          border
          border-emerald-400
          text-emerald-400
          hover:bg-emerald-400
          hover:text-black
          transition
        "
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default SignUp;
