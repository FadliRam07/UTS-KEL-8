import React from "react";
import { Link } from "react-router-dom";

function Footer({ darkMode, language }) {
  return (
    <footer
      className={`mt-12 py-10 px-6 transition-colors duration-300 ${
        darkMode ? "bg-blue-900 text-gray-200" : "bg-blue-600 text-white"
      }`}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* 🔹 Brand */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">
            🌍 {language === "id" ? "Portal Berita Internasional" : "International News Portal"}
          </h2>
          <p className="mt-2 text-sm leading-relaxed">
            {language === "id"
              ? "Portal berita dunia terpercaya, menyajikan informasi terkini dari berbagai belahan penjuru dunia."
              : "Trusted global news portal, delivering the latest information from around the world."}
          </p>
        </div>

        {/* 🔹 Quick Links */}
        <div className="text-center sm:text-left">
          <h3 className="text-lg font-semibold mb-3">
            {language === "id" ? "Tautan Cepat" : "Quick Links"}
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:underline">
                {language === "id" ? "Beranda" : "Home"}
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">
                {language === "id" ? "Tentang Kami" : "About Us"}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                {language === "id" ? "Kontak" : "Contact"}
              </Link>
            </li>
          </ul>
        </div>

        {/* 🔹 Contact Info */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-3">
            {language === "id" ? "Hubungi Kami" : "Contact Us"}
          </h3>
          <p className="mb-1">📍 Jl. Gedebage Selatan, Bandung</p>
          <p className="mb-1">📞 +62 822-9503-5203</p>
          <p>✉️ info@portalberitainternasional.com</p>
        </div>
      </div>

      {/* 🔹 Copyright */}
      <div
        className={`mt-10 text-center text-sm border-t pt-4 ${
          darkMode ? "border-gray-700" : "border-blue-400"
        }`}
      >
        {language === "id"
          ? `© ${new Date().getFullYear()} Berita Internasional. Semua hak cipta dilindungi.`
          : `© ${new Date().getFullYear()} International News Portal. All rights reserved.`}
      </div>
    </footer>
  );
}

export default Footer;
