import React, { useState } from "react";
import { Link } from "react-router-dom";

function Settings({ darkMode, setDarkMode, language, setLanguage }) {
  const [notifications, setNotifications] = useState(true);

  return (
    <div
      className={`max-w-3xl mx-auto p-6 mt-8 rounded-2xl shadow-lg ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h1 className="text-2xl font-bold mb-6">
        {language === "id" ? "⚙️ Pengaturan" : "⚙️ Settings"}
      </h1>

      {/* 🔹 Tema */}
      <div className="flex justify-between items-center mb-6">
        <span>{language === "id" ? "Tema Aplikasi" : "App Theme"}</span>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`px-4 py-2 rounded-lg font-medium shadow-md transition ${
            darkMode
              ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
              : "bg-gray-900 text-white hover:bg-gray-800"
          }`}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>

      {/* 🔹 Notifikasi */}
      <div className="flex justify-between items-center mb-6">
        <span>{language === "id" ? "Notifikasi" : "Notifications"}</span>
        <button
          onClick={() => setNotifications(!notifications)}
          className={`px-4 py-2 rounded-lg font-medium shadow-md transition ${
            notifications
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-gray-500 text-white hover:bg-gray-600"
          }`}
        >
          {notifications
            ? language === "id"
              ? "Aktif"
              : "Enabled"
            : language === "id"
            ? "Nonaktif"
            : "Disabled"}
        </button>
      </div>

      {/* 🔹 Bahasa */}
      <div className="flex justify-between items-center mb-6">
        <span>{language === "id" ? "Bahasa" : "Language"}</span>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="px-3 py-2 rounded-lg border text-gray-900"
        >
          <option value="id">🇮🇩 Indonesia</option>
          <option value="en">🇬🇧 English</option>
        </select>
      </div>

      {/* 🔹 Tombol kembali */}
      <div className="flex justify-end">
        <Link
          to="/"
          className="px-5 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg font-medium text-white shadow-md"
        >
          ⬅️ {language === "id" ? "Kembali ke Beranda" : "Back to Home"}
        </Link>
      </div>
    </div>
  );
}

export default Settings;
