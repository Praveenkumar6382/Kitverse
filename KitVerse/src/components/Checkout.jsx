import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { clearCart } from "../features/cart/cartSlice";

import {
  User,
  Phone,
  MapPin,
  CreditCard,
  Banknote,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowLeft,
  ShoppingBag,
  Clock,
  Loader2,
} from "lucide-react";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux data
const cart = useSelector(
  (state) => state.kitBag?.items || []
);

const { user } = useSelector((state) => state.user);

  // JWT token
  const token = localStorage.getItem("token");

  // Form states
  const [userName, setUserName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");

  const [paymentMethod, setPaymentMethod] = useState("COD");

  // UI states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  // --------------------------------------------------
  // Update user details when Redux user loads
  // --------------------------------------------------

  useEffect(() => {
    if (user) {
      setUserName((prev) => prev || user.name || "");
      setPhone((prev) => prev || user.phone || "");
      setAddress((prev) => prev || user.address || "");
    }
  }, [user]);

  // --------------------------------------------------
  // Convert price safely
  // --------------------------------------------------

  const parsePrice = (price) => {
    if (typeof price === "number") {
      return price;
    }

    if (typeof price === "string") {
      const cleanedPrice = price.replace(/[^0-9.]/g, "");
      return parseFloat(cleanedPrice) || 0;
    }

    return 0;
  };

  // --------------------------------------------------
  // Calculate total
  // --------------------------------------------------

  const totalPrice = cart.reduce((total, item) => {
    const price = parsePrice(item.price);
    const quantity = Number(item.quantity) || 0;

    return total + price * quantity;
  }, 0);

  // --------------------------------------------------
  // Place Order
  // --------------------------------------------------

  const handleAddOrder = async (e) => {
    e.preventDefault();

    setErrorMsg("");

    // Check login
    if (!token) {
      setErrorMsg("Please login before placing an order.");
      return;
    }

    // Validate customer details
    if (!userName.trim() || !phone.trim() || !address.trim()) {
      setErrorMsg(
        "Please fill in your name, phone number and delivery address.",
      );
      return;
    }

    // Validate cart
    if (cart.length === 0) {
      setErrorMsg("Your cart is empty. Add products before checkout.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create order payload
      const addOrderPayload = {
        user: user?._id || user?.id,

        products: cart.map((item) => ({
          product: item._id || item.id,
          productName: item.title || item.name || "Product",
          quantity: Number(item.quantity) || 1,
          price: parsePrice(item.price),
        })),

        totalPrice: totalPrice.toFixed(2),

        userName: userName.trim(),
        phone: phone.trim(),
        address: address.trim(),

        paymentMethod,
      };

      console.log("KitVerse Order:", addOrderPayload);

      // Send order to backend
      const response = await axios.post(
        "http://localhost:5000/order/createOrder",
        addOrderPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      console.log("Order response:", response.data);

      // Success
      if (response.data.success || response.status === 201) {
        const createdOrder = response.data.order || addOrderPayload;

        setOrderSuccess(createdOrder);

        // Clear Redux cart
        dispatch(clearCart());
      } else {
        setErrorMsg(response.data.message || "Failed to place your order.");
      }
    } catch (error) {
      console.error("Order Error:", error);

      setErrorMsg(
        error.response?.data?.message ||
          "Failed to place order. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // --------------------------------------------------
  // Empty cart
  // --------------------------------------------------

  if (cart.length === 0 && !orderSuccess) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">

        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-10 text-center max-w-md w-full">
            <ShoppingBag className="w-16 h-16 text-slate-300 mx-auto mb-4" />

            <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
              Your Cart is Empty
            </h2>

            <p className="text-slate-500 text-sm mb-6">
              Add some products to your cart before proceeding to checkout.
            </p>

            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </button>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // --------------------------------------------------
  // Main Checkout
  // --------------------------------------------------

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        {/* --------------------------------------------- */}
        {/* Checkout Progress */}
        {/* --------------------------------------------- */}

        <div className="mb-10">
          <div className="flex items-center justify-center gap-3 sm:gap-5 text-sm font-semibold max-w-xl mx-auto mb-6">
            {/* Cart */}
            <div
              onClick={() => navigate("/kitbag")}
              className="flex items-center gap-2 text-slate-500 hover:text-blue-600 cursor-pointer"
            >
              <span className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold">
                ✓
              </span>

              <span className="hidden sm:block">Cart</span>
            </div>

            <div className="w-8 sm:w-14 h-0.5 bg-blue-600" />

            {/* Checkout */}
            <div className="flex items-center gap-2 text-blue-600">
              <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                2
              </span>

              <span>Checkout</span>
            </div>

            <div className="w-8 sm:w-14 h-0.5 bg-slate-200" />

            {/* Confirmation */}
            <div className="flex items-center gap-2 text-slate-400">
              <span className="w-7 h-7 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold">
                3
              </span>

              <span className="hidden sm:block">Confirmation</span>
            </div>
          </div>

          <h1 className="text-3xl font-extrabold text-slate-900 text-center">
            KitVerse Checkout
          </h1>

          <p className="text-center text-slate-500 text-sm mt-2">
            Complete your delivery and payment details.
          </p>
        </div>

        {/* --------------------------------------------- */}
        {/* Error Message */}
        {/* --------------------------------------------- */}

        {errorMsg && (
          <div className="max-w-7xl mx-auto mb-6">
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm">
              <span className="font-bold">Error:</span> {errorMsg}
            </div>
          </div>
        )}

        {/* --------------------------------------------- */}
        {/* Main Grid */}
        {/* --------------------------------------------- */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ============================================= */}
          {/* LEFT SIDE */}
          {/* ============================================= */}

          <div className="lg:col-span-7">
            <form onSubmit={handleAddOrder} className="space-y-6">
              {/* ----------------------------------------- */}
              {/* Customer Information */}
              {/* ----------------------------------------- */}

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h2 className="text-lg font-bold text-slate-900 pb-4 border-b border-slate-100 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Customer & Delivery Information
                </h2>

                {/* Name */}
                <div className="mt-5">
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Full Name *
                  </label>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>

                    <input
                      id="name"
                      type="text"
                      required
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="mt-5">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Phone Number *
                  </label>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Phone className="w-4 h-4" />
                    </div>

                    <input
                      id="phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter your phone number"
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="mt-5">
                  <label
                    htmlFor="address"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Delivery Address *
                  </label>

                  <div className="relative">
                    <div className="absolute top-3.5 left-3 pointer-events-none text-slate-400">
                      <MapPin className="w-4 h-4" />
                    </div>

                    <textarea
                      id="address"
                      required
                      rows="4"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter your complete delivery address"
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* ----------------------------------------- */}
              {/* Payment Method */}
              {/* ----------------------------------------- */}

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h2 className="text-lg font-bold text-slate-900 pb-4 border-b border-slate-100 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  Select Payment Method
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                  {/* COD */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("COD")}
                    className={`text-left rounded-xl p-5 border-2 transition ${
                      paymentMethod === "COD"
                        ? "border-blue-600 bg-blue-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          paymentMethod === "COD"
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <Banknote className="w-5 h-5" />
                      </div>

                      <div>
                        <div className="font-bold text-sm flex items-center gap-2">
                          Cash on Delivery
                          {paymentMethod === "COD" && (
                            <CheckCircle2 className="w-4 h-4 text-blue-600" />
                          )}
                        </div>

                        <p className="text-xs text-slate-500 mt-1">
                          Pay when your KitVerse order arrives.
                        </p>
                      </div>
                    </div>
                  </button>

                  {/* Online */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("Online")}
                    className={`text-left rounded-xl p-5 border-2 transition ${
                      paymentMethod === "Online"
                        ? "border-blue-600 bg-blue-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          paymentMethod === "Online"
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <CreditCard className="w-5 h-5" />
                      </div>

                      <div>
                        <div className="font-bold text-sm flex items-center gap-2">
                          Online Payment
                          {paymentMethod === "Online" && (
                            <CheckCircle2 className="w-4 h-4 text-blue-600" />
                          )}
                        </div>

                        <p className="text-xs text-slate-500 mt-1">
                          Cards, UPI and Net Banking.
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* ----------------------------------------- */}
              {/* Place Order */}
              {/* ----------------------------------------- */}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-bold py-4 px-6 rounded-xl transition flex items-center justify-center gap-2 text-base"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    Place Order (${totalPrice.toFixed(2)})
                  </>
                )}
              </button>
            </form>
          </div>

          {/* ============================================= */}
          {/* RIGHT SIDE - ORDER SUMMARY */}
          {/* ============================================= */}

          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-bold text-slate-900 pb-4 border-b border-slate-100 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-blue-600" />
                Order Summary ({cart.length})
              </h2>

              {/* Products */}
              <div className="mt-5 max-h-80 overflow-y-auto space-y-4">
                {cart.map((item, index) => {
                  const unitPrice = parsePrice(item.price);

                  const quantity = Number(item.quantity) || 1;

                  return (
                    <div
                      key={item._id || item.id || index}
                      className="flex items-center gap-3"
                    >
                      {/* Product Image */}
                      <div className="w-16 h-16 bg-slate-100 rounded-xl border border-slate-200 p-1 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.title || item.name || "Product"}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-slate-800 truncate">
                          {item.title || item.name || "Product"}
                        </h4>

                        <p className="text-xs text-slate-500 mt-1">
                          Qty: {quantity} × ${unitPrice.toFixed(2)}
                        </p>
                      </div>

                      {/* Item Total */}
                      <span className="text-sm font-bold text-slate-900">
                        ${(unitPrice * quantity).toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Total */}
              <div className="mt-6 pt-5 border-t border-slate-200 flex justify-between items-center">
                <span className="text-lg font-bold text-slate-900">Total</span>

                <span className="text-2xl font-black text-blue-600">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              {/* Security */}
              <div className="mt-5 bg-slate-50 rounded-xl p-4 border border-slate-200 flex items-center gap-3">
                <ShieldCheck className="w-7 h-7 text-emerald-600 flex-shrink-0" />

                <div>
                  <p className="font-semibold text-slate-800 text-sm">
                    Secure Checkout
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    Your personal information is protected.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ============================================= */}
      {/* SUCCESS MODAL */}
      {/* ============================================= */}

      {orderSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-11 h-11" />
            </div>

            <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-bold px-4 py-2 rounded-full uppercase">
              Order Placed Successfully
            </span>

            <h2 className="text-2xl font-extrabold text-slate-900 mt-4">
              Thank You for Your Order!
            </h2>

            <p className="text-sm text-slate-500 mt-2">
              Your KitVerse order has been successfully placed.
            </p>

            {/* Order Details */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-left mt-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Customer</span>

                <span className="text-sm font-bold text-slate-900">
                  {orderSuccess.userName}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Phone</span>

                <span className="text-sm font-semibold text-slate-900">
                  {orderSuccess.phone}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Payment</span>

                <span className="text-sm font-bold text-blue-600">
                  {orderSuccess.paymentMethod}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Total</span>

                <span className="text-lg font-black text-slate-900">
                  ${orderSuccess.totalPrice}
                </span>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-slate-200 text-sm font-medium text-emerald-700">
                <Clock className="w-4 h-4" />
                Estimated Delivery: 3–5 Business Days
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={() =>
                  navigate(user?.role === "admin" ? "/admin/orderpage" : "/orderpage")
                }
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                View My Orders
              </button>

              <button
                onClick={() => navigate("/")}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 rounded-xl transition"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Checkout;
