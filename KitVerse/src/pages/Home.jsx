import React from "react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { useDispatch } from "react-redux";
import { addToKitBag } from "../features/cart/cartSlice";
import { addToWishlist } from "../features/wishlist/wishlistSlice";

const Home = () => {
  const dispatch = useDispatch();

  const banners = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974",
      title: "Football Jerseys Collection",
      desc: "Wear your team's pride",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55",
      title: "Latest Club Kits",
      desc: "Premium quality jerseys",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20",
      title: "KITVERSE Store",
      desc: "Your football fashion destination",
    },
  ];

  const products = [
    {
      id: 1,
      name: "Argentina World Cup Jersey",
      price: "$9.8",
      image:
        "https://troyssquad.store/wp-content/uploads/2025/12/AnyConv.com__77126492-scaled-1-430x430.webp",
    },
    {
      id: 2,
      name: "Brazil Home Jersey",
      price: "$8.5",
      image:
        "https://troyssquad.store/wp-content/uploads/2026/01/43dfac66b817209f8973ff439c566b01-430x430.avif",
    },
    {
      id: 3,
      name: "Portugal Ronaldo Jersey",
      price: "$10.99",
      image:
        "https://kickova.com/cdn/shop/files/Portugal_Home_Jersey_World_Cup_2026_1200x.jpg?v=1763019980",
    },
    {
      id: 4,
      name: "Barcelona Jersey",
      price: "$7.99",
      image:
        "https://troyssquad.store/wp-content/uploads/2025/07/4949e8f4-d0c7-4e81-87f4-ff833b8d4f00-430x538.jpeg",
    },
  ];

  return (
    <div className="bg-slate-950 text-white">
      {/* HERO CAROUSEL */}

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 3000,
        }}
        pagination={{
          clickable: true,
        }}
        navigation
        loop
        className="h-[420px] sm:h-[500px] md:h-[550px]"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div
              className="h-[420px] sm:h-[500px] md:h-[550px] bg-cover bg-center flex items-center px-4 sm:px-8 md:px-20"
              style={{
                backgroundImage: `url(${banner.image})`,
              }}
            >
              <div className="bg-black/60 p-5 sm:p-7 md:p-8 rounded-xl max-w-xl">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                  {banner.title}
                </h1>

                <p className="mt-3 text-base sm:text-lg md:text-xl">
                  {banner.desc}
                </p>

                <Link to="/jerseypage">
                  <button className="mt-5 sm:mt-6 bg-emerald-400 text-black px-6 sm:px-8 py-3 rounded-full">
                    Shop Now
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* FEATURED PRODUCTS */}

      <section className="px-4 sm:px-6 md:px-10 lg:px-20 py-10 sm:py-12 md:py-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-7 sm:mb-10">
          Featured Jerseys
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 md:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-slate-900 rounded-xl p-3 sm:p-4 md:p-5 hover:scale-105 transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-40 sm:h-52 md:h-60 w-full object-cover rounded-lg"
              />

              <h3 className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg font-semibold line-clamp-2">
                {product.name}
              </h3>

              <p className="text-emerald-400 mt-2">{product.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
