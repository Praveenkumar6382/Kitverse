import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToKitBag } from "../features/cart/cartSlice";
import { removeFromWishlist } from "../features/wishlist/wishlistSlice";

import {
  Heart,
  ShoppingBag,
  Trash2,
  PackageOpen,
  ArrowRight,
} from "lucide-react";

const Wishlist = () => {
  const dispatch = useDispatch();

  const wishlist = useSelector((state) => state.wishlist.items);

  // =========================
  // EMPTY WISHLIST
  // =========================

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[75vh] bg-gradient-to-br from-slate-50 via-white to-emerald-50/40 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          {/* ICON */}

          <div className="relative mx-auto w-28 h-28 mb-7">
            <div className="absolute inset-0 bg-emerald-100 rounded-full animate-pulse" />

            <div className="absolute inset-3 bg-white rounded-full shadow-md flex items-center justify-center">
              <Heart className="w-12 h-12 text-emerald-500" strokeWidth={1.5} />
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
            Your Wishlist is Empty
          </h1>

          <p className="text-slate-500 mt-3 leading-relaxed">
            You haven't added any products to your wishlist yet. Explore
            KitVerse and save your favorite products here.
          </p>

          <button
            onClick={() => (window.location.href = "/jerseypage")}
            className="mt-7 inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-emerald-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            Explore Products
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* =========================
          HEADER
      ========================= */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 text-xs font-black uppercase tracking-[0.2em] mb-2">
              <Heart className="w-4 h-4 fill-emerald-500" />
              My Collection
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              My Wishlist
            </h1>

            <p className="text-slate-500 mt-2 text-sm sm:text-base">
              Your favorite products, all in one place.
            </p>
          </div>

          {/* COUNT */}

          <div className="self-start sm:self-auto flex items-center gap-2 bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm">
            <Heart className="w-4 h-4 text-emerald-500 fill-emerald-500" />

            <span className="text-sm font-bold text-slate-700">
              {wishlist.length}
            </span>

            <span className="text-sm text-slate-500">
              {wishlist.length === 1 ? "Product" : "Products"}
            </span>
          </div>
        </div>

        {/* DIVIDER */}

        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-8" />
      </div>

      {/* =========================
          PRODUCTS
      ========================= */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* =========================
                  IMAGE
              ========================= */}

              <div className="relative h-56 sm:h-64 bg-slate-100 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* IMAGE OVERLAY */}

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* WISHLIST BADGE */}

                <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 backdrop-blur-sm shadow-md flex items-center justify-center">
                  <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                </div>

                {/* CATEGORY */}

                {item.category && (
                  <span className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm text-slate-700 text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm">
                    {item.category}
                  </span>
                )}
              </div>

              {/* =========================
                  DETAILS
              ========================= */}

              <div className="p-4 sm:p-5">
                {/* TITLE */}

                <h2
                  className="font-black text-base sm:text-lg text-slate-900 line-clamp-2 min-h-[48px] group-hover:text-emerald-600 transition-colors"
                  title={item.title}
                >
                  {item.title}
                </h2>

                {/* DESCRIPTION */}

                <p
                  className="text-slate-500 text-xs sm:text-sm mt-2 line-clamp-2 min-h-[40px]"
                  title={item.description}
                >
                  {item.description}
                </p>

                {/* PRICE + STOCK */}

                <div className="flex items-center justify-between mt-4">
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider block">
                      Price
                    </span>

                    <p className="text-xl font-black text-emerald-600">
                      ₹{Number(item.price).toLocaleString("en-IN")}
                    </p>
                  </div>

                  {item.quantity !== undefined && (
                    <div className="text-right">
                      <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider block">
                        Stock
                      </span>

                      <p
                        className={`text-xs font-bold ${
                          item.quantity > 0
                            ? "text-emerald-600"
                            : "text-red-500"
                        }`}
                      >
                        {item.quantity > 0
                          ? `${item.quantity} Available`
                          : "Out of Stock"}
                      </p>
                    </div>
                  )}
                </div>

                {/* =========================
                    ACTIONS
                ========================= */}

                <div className="mt-5 space-y-2.5">
                  {/* ADD TO BAG */}

                  <button
                    onClick={() => dispatch(addToKitBag(item))}
                    disabled={item.quantity !== undefined && item.quantity <= 0}
                    className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-2.5 rounded-xl font-bold text-sm shadow-md shadow-emerald-100 hover:shadow-lg transition-all duration-200 active:scale-[0.98]"
                  >
                    <ShoppingBag className="w-4 h-4" />

                    {item.quantity !== undefined && item.quantity <= 0
                      ? "Out of Stock"
                      : "Add to Kit Bag"}
                  </button>

                  {/* REMOVE */}

                  <button
                    onClick={() => dispatch(removeFromWishlist(item._id))}
                    className="w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-red-50 text-slate-500 hover:text-red-600 border border-slate-200 hover:border-red-200 py-2.5 rounded-xl font-bold text-sm transition-all duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove from Wishlist
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
