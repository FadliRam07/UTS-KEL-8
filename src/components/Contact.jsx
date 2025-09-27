import React from "react";
import { useNavigate } from "react-router-dom";

function Contact({ darkMode, language }) {
  const navigate = useNavigate();

  // Helper untuk teks sesuai bahasa
  const t = {
    title: language === "id" ? "📞 Hubungi Kami" : "📞 Contact Us",
    description: language === "id"
      ? "Hubungi kami melalui WhatsApp atau Instagram untuk informasi lebih lanjut."
      : "Reach out to us via WhatsApp or Instagram for more information.",
    whatsapp: language === "id" ? "📱 Hubungi via WhatsApp" : "📱 Contact via WhatsApp",
    instagram: language === "id" ? "📸 Instagram" : "📸 Instagram",
    back: language === "id" ? "← Kembali ke Beranda" : "← Back to Home",
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-6 py-12 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`max-w-lg w-full rounded-2xl shadow-lg p-8 transition ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h1 className="text-3xl font-bold text-center mb-6">{t.title}</h1>
        <p className="text-center mb-6">{t.description}</p>

        {/* Contact Buttons */}
        <div className="flex flex-col gap-4">
          {/* WhatsApp */}
          <a
            href="https://wa.me/6282295035203"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-6 py-3 rounded-lg font-medium shadow-md text-center transition ${
              darkMode
                ? "bg-emerald-500 text-white hover:bg-emerald-400"
                : "bg-emerald-600 text-white hover:bg-emerald-700"
            }`}
          >
            {t.whatsapp}
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/fadrmdhn07"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-6 py-3 rounded-lg font-medium shadow-md text-center transition ${
              darkMode
                ? "bg-pink-500 text-white hover:bg-pink-400"
                : "bg-pink-600 text-white hover:bg-pink-700"
            }`}
          >
            {t.instagram}
          </a>
        </div>

        {/* 🔹 Tombol Kembali ke Beranda */}
        <button
          onClick={() => navigate("/")}
          className={`mt-8 w-full px-6 py-3 rounded-lg font-medium shadow-md transition ${
            darkMode
              ? "bg-blue-600 text-white hover:bg-blue-500"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {t.back}
        </button>
      </div>
    </div>
  );
}

export default Contact;
