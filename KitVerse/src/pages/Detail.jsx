import React from "react";

const Detail = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">
        About KitVerse
      </h1>
      <div className="flex justify-center"><img className=' md:w-96  rounded-lg shadow-lg'  src='https://www.rollingstone.com/wp-content/uploads/2025/11/adidas-jerseys.png?w=1581&h=1054&crop=1.jpg' alt=""/>

      </div>
      <br/>

      <p className="text-gray-600 text-lg leading-8 text-center mb-10">
        Welcome to <span className="font-semibold">KitVerse</span>, your
        one-stop destination for premium football jerseys. Whether you're
        cheering for your favorite club or supporting your national team, we
        offer stylish, comfortable, and high-quality jerseys for every football
        fan.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3">
            Premium Quality
          </h2>
          <p className="text-gray-600">
            Our jerseys are made from breathable, lightweight, and durable
            fabrics to provide maximum comfort.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3">
            Latest Collections
          </h2>
          <p className="text-gray-600">
            Explore jerseys from top football clubs and national teams from
            around the world.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3">
            Fast Delivery
          </h2>
          <p className="text-gray-600">
            We ensure secure packaging and quick delivery so your favorite
            jersey reaches you on time.
          </p>
        </div>
      </div>

      <div className="mt-12 bg-gray-100 rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4">
          Our Mission
        </h2>
        <p className="text-gray-700 leading-7">
          At KitVerse, our mission is to make premium football jerseys
          accessible to every fan. We are committed to providing excellent
          quality, affordable prices, and outstanding customer service.
        </p>
      </div>
    </div>
  );
};

export default Detail;