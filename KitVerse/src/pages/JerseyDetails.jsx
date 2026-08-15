import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { addToKitBag } from "../features/cart/cartSlice";
import { addToWishlist } from "../features/wishlist/wishlistSlice";

const JerseyDetails = () => {
  const { state: jersey } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!jersey) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-bold">Jersey Not Found</h2>

        <button
          onClick={() => navigate("/jerseypage")}
          className="mt-5 bg-blue-600 text-white px-5 py-2 rounded"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-5 sm:py-8 md:py-10 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-5 sm:gap-8 md:gap-10 p-4 sm:p-6 md:p-8">
          {/* Product Image */}
          <div className="flex justify-center items-center bg-gray-50 rounded-xl p-4 sm:p-6">
            <img
              src={jersey.image}
              alt={jersey.title}
              className="w-full max-w-md rounded-xl transition duration-300 hover:scale-105"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center">
            <span className="text-sm text-emerald-600 font-semibold uppercase">
              Premium Football Jersey
            </span>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 break-words">
              {jersey.title}
            </h1>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-4">
              <span className="text-yellow-500 text-xl">⭐⭐⭐⭐⭐</span>

              <span className="text-gray-500">4.8 (245 Reviews)</span>
            </div>

            <p className="text-3xl sm:text-4xl font-bold text-blue-600 mt-5 sm:mt-6">
              ${jersey.price}
            </p>

            <p className="text-gray-600 leading-7 mt-6">{jersey.description}</p>

            {/* Sizes */}
            <div className="mt-8">
              <h3 className="font-semibold mb-3">Select Size</h3>

              <div className="flex flex-wrap gap-2 sm:gap-3">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    className="border px-4 sm:px-5 py-2 rounded-lg hover:bg-black hover:text-white transition"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-8">
              <h3 className="font-semibold mb-3">Quantity</h3>

              <input
                type="number"
                defaultValue={1}
                min={1}
                className="w-24 border rounded-lg px-3 py-2"
              />
            </div>

            {/* Stock */}
            <div className="mt-6">
              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                ✔ In Stock
              </span>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 sm:mt-10">
              <button
                onClick={() => dispatch(addToKitBag(jersey))}
                className="w-full flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3.5 sm:py-4 rounded-xl font-semibold transition"
              >
                Add to Kit Bag
              </button>

              <button
                onClick={() => dispatch(addToWishlist(jersey))}
                className="w-full flex-1 bg-red-500 hover:bg-red-600 text-white py-3.5 sm:py-4 rounded-xl font-semibold transition"
              >
                ❤️ Wishlist
              </button>
            </div>

            {/* Features */}
            <div className="mt-10 border-t pt-6 text-gray-600 space-y-2">
              <p>✔ Premium Quality Fabric</p>
              <p>✔ Breathable Material</p>
              <p>✔ Fast Delivery</p>
              <p>✔ Easy Returns</p>
            </div>

            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="mt-8 border border-gray-300 px-6 py-3 rounded-xl hover:bg-gray-100 transition"
            >
              ← Back to Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JerseyDetails;
