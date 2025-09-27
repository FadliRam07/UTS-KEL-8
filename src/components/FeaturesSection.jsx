import React from "react";
import FeatureCard from "./FeatureCard";
import { motion } from "framer-motion";

function FeaturesSection({ darkMode, language }) {
  // 🔹 Fitur dengan terjemahan
  const features = [
    {
      icon: " 🔍",
      title: language === "id" ? "Fitur Pencarian" : "Search Feature",
      description:
        language === "id"
          ? "Mengutamakan kenyamanan dalam mencari berita"
          : "Prioritizes ease in searching for news",
    },
    {
      icon: "🔽",
      title: language === "id" ? "Filter Kategori" : "Category Filter",
      description:
        language === "id"
          ? "Agar bisa memisahkan berita sesuai dengan kategorinya dan memudahkan pembaca"
          : "Allows filtering news by categories for easier reading",
    },
    {
      icon: " 🌓",
      title: language === "id" ? "Mode Gelap/Terang" : "Dark/Light Mode",
      description:
        language === "id"
          ? "Mengutamakan kenyamanan pembaca dalam menggunakan Website kami."
          : "Ensures reader comfort while using our website.",
    },
    {
      icon: "📰",
      title: language === "id" ? "Berita Selalu Terbaru" : "Always Latest News",
      description:
        language === "id"
          ? "Memudahkan pembaca mencari berita-berita yang sedang ramai di tingkat Internasional."
          : "Helps readers find trending news internationally.",
    },
  ];

  return (
    <section className="mt-12 px-6 md:px-12">
      {/* 🔹 Card Terima Kasih */}
      <motion.div
        className={`max-w-3xl mx-auto mb-12 p-6 rounded-2xl shadow-lg text-center ${
          darkMode
            ? "bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-200"
            : "bg-gradient-to-r from-blue-100 via-white to-blue-50 text-gray-800"
        }`}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
          {language === "id" ? "🙏 Terima Kasih!" : "🙏 Thank You!"}
        </h2>
        <p className="text-base sm:text-lg">
          {language === "id"
            ? "Kami sangat berterima kasih karena Anda telah menggunakan "
            : "We greatly appreciate that you are using "}
          <span className="font-semibold text-blue-500">
            {language === "id"
              ? "Portal Berita Internasional"
              : "International News Portal"}
          </span>{" "}
          {language === "id"
            ? "sebagai sumber informasi terpercaya Anda. 💙"
            : "as your trusted source of information. 💙"}
        </p>
      </motion.div>

      {/* 🔹 Judul Keunggulan */}
      <h2
        className={`text-2xl font-bold text-center mb-8 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        {language === "id"
          ? "Keunggulan Website Kami?"
          : "Our Website Advantages?"}
      </h2>

      {/* 🔹 Grid Fitur */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            darkMode={darkMode}
          />
        ))}
      </div>
    </section>
  );
}

export default FeaturesSection;
