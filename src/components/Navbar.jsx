import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar({ darkMode, setDarkMode, language, setLanguage, user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const toggleButtonLabel = () => {
    if (darkMode) return language === "id" ? "☀️ Terang" : "☀️ Light";
    return language === "id" ? "🌙 Gelap" : "🌙 Dark";
  };

  return (
    <header
      className={`px-6 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sticky top-0 z-50 backdrop-blur-md shadow-md transition-all ${
        darkMode ? "bg-gray-950/90 text-white" : "bg-blue-900/90 text-white"
      }`}
    >
      {/* Logo + Hamburger */}
      <div className="flex justify-between items-center w-full sm:w-auto">
        <h1 className="text-xl font-bold">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            {language === "id" ? "Berita Internasional" : "International News"}
          </Link>
        </h1>
        <button
          className="sm:hidden text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Menu Desktop */}
      <div className="hidden sm:flex flex-row items-center gap-3">
        {/* Toggle Mode */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`flex items-center justify-center px-4 py-2 rounded-full font-medium transition-all duration-300 shadow-md ${
            darkMode
              ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
              : "bg-gray-800 text-white hover:bg-gray-700"
          }`}
        >
          {toggleButtonLabel()}
        </button>

        <Link
          to="/about"
          className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 transition font-medium"
        >
          {language === "id" ? "Tentang" : "About"}
        </Link>

        <Link
          to="/contact"
          className="px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 transition font-medium"
        >
          {language === "id" ? "Kontak" : "Contact"}
        </Link>

        {/* Language Selector */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="px-3 py-2 rounded-lg text-gray-900"
        >
          <option value="id">🇮🇩 Indonesia</option>
          <option value="en">🇬🇧 English</option>
        </select>

        {/* Profile Dropdown */}
        {user && (
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 focus:outline-none"
            >
              <img
                src="https://i.pravatar.cc/100?img=12"
                alt="profile"
                className="w-9 h-9 rounded-full border-2 border-gray-300"
              />
            </button>

            {profileOpen && (
              <div
                className={`absolute right-0 mt-3 w-56 rounded-lg shadow-lg border transition-all duration-200 ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-white border-gray-200 text-gray-800"
                }`}
              >
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>

                <ul className="py-2">
                  <li>
                    <Link
                      to="/profile"
                      className={`block px-4 py-2 ${
                        darkMode
                          ? "hover:bg-gray-700"
                          : "hover:bg-blue-100"
                      } transition`}
                      onClick={() => setProfileOpen(false)}
                    >
                      👤 {language === "id" ? "Profil" : "Profile"}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/settings"
                      className={`block px-4 py-2 ${
                        darkMode
                          ? "hover:bg-gray-700"
                          : "hover:bg-blue-100"
                      } transition`}
                      onClick={() => setProfileOpen(false)}
                    >
                      ⚙️ {language === "id" ? "Pengaturan" : "Settings"}
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        onLogout();
                        setProfileOpen(false);
                        setMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-red-600 ${
                        darkMode
                          ? "hover:bg-red-700 hover:text-white"
                          : "hover:bg-red-100"
                      } transition`}
                    >
                      🚪 {language === "id" ? "Keluar" : "Logout"}
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Menu Mobile */}
      {menuOpen && (
        <div className="flex flex-col gap-3 mt-4 sm:hidden">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-4 py-2 rounded-full font-medium shadow-md ${
              darkMode
                ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
                : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
          >
            {toggleButtonLabel()}
          </button>

          <Link to="/about" onClick={() => setMenuOpen(false)}>
            {language === "id" ? "Tentang" : "About"}
          </Link>

          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            {language === "id" ? "Kontak" : "Contact"}
          </Link>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-3 py-2 rounded-lg text-gray-900"
          >
            <option value="id">🇮🇩 Indonesia</option>
            <option value="en">🇬🇧 English</option>
          </select>

          {user && (
            <>
              <Link to="/profile" onClick={() => setMenuOpen(false)}>
                👤 {language === "id" ? "Profil" : "Profile"}
              </Link>
              <button
                onClick={() => {
                  onLogout();
                  setMenuOpen(false);
                }}
                className="text-red-600 hover:underline"
              >
                🚪 {language === "id" ? "Keluar" : "Logout"}
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
