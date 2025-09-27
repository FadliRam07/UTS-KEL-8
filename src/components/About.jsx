import React from "react";
import { Link } from "react-router-dom";

function About({ darkMode, language }) {
  console.log("Render About Page ✅"); 

  // Helper teks berdasarkan bahasa
  const text = {
    title: language === "id" ? "Tentang Kami" : "About Us",
    welcome: language === "id"
      ? "Selamat datang di Portal Berita Internasional – Website berita terkini yang menyajikan informasi dari seluruh dunia secara cepat, akurat, dan mudah diakses."
      : "Welcome to the International News Portal – A news website providing the latest information from around the world quickly, accurately, and easily accessible.",
    missionTitle: language === "id" ? "Misi Kami" : "Our Mission",
    mission: language === "id"
      ? "Memberikan berita internasional yang relevan, kredibel, dan ramah pembaca agar semua orang dapat mengikuti perkembangan dunia."
      : "Providing relevant, credible, and reader-friendly international news so everyone can follow global developments.",
    featuresTitle: language === "id" ? "Fitur Utama" : "Main Features",
    features: language === "id"
      ? ["Pencarian berita cepat",
         "Kategori lengkap: teknologi, bisnis, olahraga, hiburan, dll",
         "Adanya Fitur Search yang memudahkan untuk mencari berita",
         "Mode gelap & terang untuk kenyamanan membaca"]
      : ["Fast news search",
         "Complete categories: technology, business, sports, entertainment, etc.",
         "Search feature to easily find news",
         "Dark & light mode for reading comfort"],
    techTitle: language === "id" ? "Teknologi" : "Technology",
    tech: language === "id"
      ? "Aplikasi ini dikembangkan menggunakan React.js dan TailwindCSS dengan integrasi API berita internasional (NewsApi)."
      : "This application is developed using React.js and TailwindCSS with integration of international news API (NewsApi).",
    aboutCreatorTitle: language === "id" ? "Tentang Pembuatan" : "About Development",
    aboutCreator: language === "id"
      ? "Aplikasi ini dikembangkan Oleh Fadli Ramadhan dan Anggota Kelompok 8 dengan penggunaan API(NewsApi) yang dikerjakan pada awal tanggal 22 September 2025."
      : "This application was developed by Fadli Ramadhan and Group 8 members using NewsApi starting on September 22, 2025.",
    footer: language === "id" ? "Dibuat Oleh Kelompok 8" : "Created by Group 8",
    backButton: language === "id" ? "⬅ Kembali ke Beranda" : "⬅ Back to Home"
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-6 py-12 pb-20 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`max-w-3xl w-full rounded-2xl shadow-lg p-8 transition ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h1 className="text-4xl font-extrabold text-center mb-6">
          {text.title.split(" ")[0]} <span className="text-blue-500">{text.title.split(" ")[1]}</span>
        </h1>

        <p className="text-lg leading-relaxed mb-4 text-center">
          {text.welcome}
        </p>

        <div className="mt-6 space-y-4">
          {/* Misi */}
          <div
            className={`p-5 rounded-xl border ${
              darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"
            }`}
          >
            <h2 className="text-xl font-semibold mb-2">{text.missionTitle}</h2>
            <p>{text.mission}</p>
          </div>

          {/* Fitur */}
          <div
            className={`p-5 rounded-xl border ${
              darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"
            }`}
          >
            <h2 className="text-xl font-semibold mb-2">{text.featuresTitle}</h2>
            <ul className="list-disc pl-5 space-y-1">
              {text.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>

          {/* Teknologi */}
          <div
            className={`p-5 rounded-xl border ${
              darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"
            }`}
          >
            <h2 className="text-xl font-semibold mb-2">{text.techTitle}</h2>
            <p>{text.tech}</p>
          </div>

          {/* Pembuat */}
          <div
            className={`p-5 rounded-xl border ${
              darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"
            }`}
          >
            <h2 className="text-xl font-semibold mb-2">{text.aboutCreatorTitle}</h2>
            <p>{text.aboutCreator}</p>
          </div>
        </div>

        <p className="text-center mt-8 font-medium">{text.footer}</p>

        <div className="mt-8 flex justify-center">
          <Link
            to="/"
            className={`px-5 py-2 rounded-full font-medium transition-all duration-300 shadow-md ${
              darkMode
                ? "bg-blue-600 text-white hover:bg-blue-500"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {text.backButton}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
