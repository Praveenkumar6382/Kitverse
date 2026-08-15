import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToKitBag } from "../features/cart/cartSlice";
import { addToWishlist } from "../features/wishlist/wishlistSlice";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  ShoppingBag,
  SearchX,
  Package,
  Loader2,
  ArrowRight,
} from "lucide-react";
import axios from "axios";

const Jerseypage = ({ searchTerm }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wishlist = useSelector(
    (state) => state.wishlist.items
  );

  const [jerseys, setJerseys] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH PRODUCTS
  // =========================

  useEffect(() => {
    const fetchJerseys = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          "http://localhost:5000/product/products"
        );

        setJerseys(response.data.products || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJerseys();
  }, []);

  // =========================
  // SEARCH FILTER
  // =========================

  const filteredProducts = jerseys.filter((item) =>
    (item.title || "")
      .toLowerCase()
      .includes((searchTerm || "").toLowerCase())
  );

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-10">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">

          <div>

            <div className="flex items-center gap-2 text-emerald-600 text-xs font-black uppercase tracking-[0.2em] mb-2">

              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />

              KitVerse Store

            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Our Products
            </h1>

            <p className="text-slate-500 mt-2 text-sm sm:text-base">
              Discover your favorite jerseys and sportswear.
            </p>

          </div>

          {/* PRODUCT COUNT */}

          <div className="self-start sm:self-auto flex items-center gap-2 bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm">

            <Package className="w-4 h-4 text-emerald-500" />

            <span className="font-bold text-slate-800">
              {filteredProducts.length}
            </span>

            <span className="text-sm text-slate-500">
              Products
            </span>

          </div>

        </div>

        {/* DIVIDER */}

        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-8" />

      </div>

      {/* =================================================
          LOADING
      ================================================= */}

      {loading && (
        <div className="min-h-[50vh] flex items-center justify-center">

          <div className="text-center">

            <div className="w-16 h-16 mx-auto bg-emerald-50 rounded-2xl flex items-center justify-center mb-4">

              <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />

            </div>

            <p className="text-slate-500 font-semibold">
              Loading products...
            </p>

          </div>

        </div>
      )}

      {/* =================================================
          EMPTY SEARCH
      ================================================= */}

      {!loading && filteredProducts.length === 0 && (

        <div className="min-h-[50vh] flex items-center justify-center px-4">

          <div className="text-center max-w-md">

            <div className="w-20 h-20 mx-auto bg-slate-100 rounded-3xl flex items-center justify-center mb-5">

              <SearchX className="w-9 h-9 text-slate-400" />

            </div>

            <h2 className="text-2xl font-black text-slate-900">
              No products found
            </h2>

            <p className="text-slate-500 mt-2">
              We couldn't find any products matching{" "}
              <span className="font-bold text-slate-700">
                "{searchTerm}"
              </span>
              .
            </p>

            <button
              onClick={() => navigate("/jerseypage")}
              className="mt-6 inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-3 rounded-xl font-bold transition-all"
            >
              View All Products
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>
      )}

      {/* =================================================
          PRODUCT GRID
      ================================================= */}

      {!loading && filteredProducts.length > 0 && (

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">

            {filteredProducts.map((jersey) => {

              const isWishlisted = wishlist.some(
                (item) => item._id === jersey._id
              );

              const isOutOfStock =
                Number(jersey.quantity) <= 0;

              return (

                <div
                  key={jersey._id}
                  onClick={() =>
                    navigate(`/jersey/${jersey._id}`, {
                      state: jersey,
                    })
                  }
                  className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >

                  {/* =================================================
                      IMAGE
                  ================================================= */}

                  <div className="relative h-52 sm:h-60 md:h-64 bg-slate-100 overflow-hidden">

                    <img
                      src={jersey.image}
                      alt={jersey.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* GRADIENT */}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* WISHLIST */}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        if (!isWishlisted) {
                          dispatch(addToWishlist(jersey));
                        }
                      }}
                      className="absolute top-3 right-3 w-9 h-9 bg-white/95 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center hover:scale-110 transition-transform duration-200"
                      aria-label="Wishlist"
                    >
                      {isWishlisted ? (
                        <FaHeart className="text-red-500 text-base" />
                      ) : (
                        <FaRegHeart className="text-slate-600 text-base hover:text-red-500" />
                      )}
                    </button>

                    {/* CATEGORY */}

                    {jersey.category && (
                      <span className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm text-slate-700 px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold shadow-sm">
                        {jersey.category}
                      </span>
                    )}

                    {/* STOCK */}

                    {isOutOfStock ? (
                      <span className="absolute top-3 left-3 bg-red-500 text-white px-2.5 py-1.5 rounded-full text-[10px] sm:text-xs font-bold shadow-md">
                        Out of Stock
                      </span>
                    ) : jersey.quantity <= 5 ? (
                      <span className="absolute top-3 left-3 bg-amber-500 text-white px-2.5 py-1.5 rounded-full text-[10px] sm:text-xs font-bold shadow-md">
                        Only {jersey.quantity} left
                      </span>
                    ) : null}

                  </div>

                  {/* =================================================
                      DETAILS
                  ================================================= */}

                  <div className="p-3.5 sm:p-4">

                    {/* TITLE */}

                    <h2
                      className="font-black text-sm sm:text-base lg:text-lg text-slate-900 line-clamp-2 min-h-[40px] sm:min-h-[48px] group-hover:text-emerald-600 transition-colors"
                      title={jersey.title}
                    >
                      {jersey.title}
                    </h2>

                    {/* DESCRIPTION */}

                    <p
                      className="text-slate-500 text-xs sm:text-sm mt-1.5 line-clamp-2 min-h-[32px] sm:min-h-[40px]"
                      title={jersey.description}
                    >
                      {jersey.description}
                    </p>

                    {/* PRICE + QUANTITY */}

                    <div className="flex items-end justify-between mt-4">

                      <div>

                        <p className="text-[10px] sm:text-[11px] text-slate-400 uppercase tracking-wider font-bold">
                          Price
                        </p>

                        <p className="text-lg sm:text-xl font-black text-emerald-600">
                          ₹
                          {Number(
                            jersey.price || 0
                          ).toLocaleString("en-IN")}
                        </p>

                      </div>

                      <div className="text-right">

                        <p className="text-[10px] sm:text-[11px] text-slate-400 uppercase tracking-wider font-bold">
                          Stock
                        </p>

                        <p
                          className={`text-xs sm:text-sm font-bold ${
                            isOutOfStock
                              ? "text-red-500"
                              : jersey.quantity <= 5
                              ? "text-amber-500"
                              : "text-emerald-600"
                          }`}
                        >
                          {isOutOfStock
                            ? "Unavailable"
                            : `${jersey.quantity} Available`}
                        </p>

                      </div>

                    </div>

                    {/* =================================================
                        ADD TO KIT BAG
                    ================================================= */}

                    <button
                      disabled={isOutOfStock}
                      onClick={(e) => {
                        e.stopPropagation();

                        if (!isOutOfStock) {
                          dispatch(
                            addToKitBag(jersey)
                          );
                        }
                      }}
                      className="w-full mt-4 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-emerald-100 hover:shadow-lg transition-all duration-200 active:scale-[0.98]"
                    >

                      <ShoppingBag className="w-4 h-4" />

                      {isOutOfStock
                        ? "Out of Stock"
                        : "Add to Kit Bag"}

                    </button>

                  </div>

                </div>
              );
            })}

          </div>

        </div>
      )}

    </section>
  );
};

export default Jerseypage;