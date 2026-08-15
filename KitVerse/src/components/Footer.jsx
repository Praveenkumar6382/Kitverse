import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-gray-400 mt-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-white text-2xl font-bold uppercase tracking-wider">
            KIT<span className="text-emerald-400">VERSE</span>
          </h2>
          <p className="mt-3 text-sm leading-6">
            Premium football jerseys from the world's biggest clubs and national teams.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <NavLink to='/'><li className="hover:text-emerald-400 transition cursor-pointer">Home</li></NavLink>
            <NavLink to='/jerseypage'><li className="hover:text-emerald-400 transition cursor-pointer">Jerseys</li></NavLink>
            <NavLink to='/kitbag'><li className="hover:text-emerald-400 transition cursor-pointer">Kit Bag</li></NavLink>
            <NavLink to='/contact'><li className="hover:text-emerald-400 transition cursor-pointer">Contact</li></NavLink>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-emerald-400 transition cursor-pointer">FAQs</li>
            <li className="hover:text-emerald-400 transition cursor-pointer">Shipping</li>
            <li className="hover:text-emerald-400 transition cursor-pointer">Returns</li>
            <li className="hover:text-emerald-400 transition cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

      </div>

      <div className="border-t border-slate-800 text-center py-4 text-sm text-gray-500">
        © 2026 <span className="text-white font-semibold">KITVERSE</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;