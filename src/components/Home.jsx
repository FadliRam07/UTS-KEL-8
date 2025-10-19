import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NewsList from "./NewsList";
import FeaturesSection from "./FeaturesSection";
import { motion } from "framer-motion";

const categories = [
  "general",
  "technology",
  "business",
  "sports",
  "entertainment",
  "health",
  "science",
];

const heroImages = [
  "https://cdn-icons-png.flaticon.com/512/2972/2972557.png",
  "https://cdn-icons-png.flaticon.com/512/21/21601.png",
  "https://cdn-icons-png.flaticon.com/512/3062/3062634.png",
];

function Home({ darkMode, setDarkMode, language }) {
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [time, setTime] = useState(new Date());
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const navigate = useNavigate();

   // ✅ Fetch berita langsung dari NewsAPI
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        const apiKey = process.env.REACT_APP_NEWS_API_KEY;
        const url = `/api/fetchNews?category=${selectedCategory}`;
        const res = await fetch(url);
        const data = await res.json();
        setArticles(data.articles || []);
        setVisibleCount(6);
      } catch (err) {
        console.error("Error fetching news:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [selectedCategory]);


  // Slideshow otomatis
  useEffect(() => {
    const interval = setInterval(
      () => setCurrentImage((prev) => (prev + 1) % heroImages.length),
      3000
    );
    return () => clearInterval(interval);
  }, []);

  // Scroll handler (infinite scroll + tombol Top)
  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 200);

      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200 &&
        !isLoading &&
        visibleCount < articles.length
      ) {
        handleLoadMore();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, visibleCount, articles.length]);

  // Jam real-time
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Filter berdasarkan pencarian
  const filteredArticles = articles.filter((article) =>
    article.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const currentArticles = filteredArticles.slice(0, visibleCount);

  // Simulasi loading bar
  const simulateLoading = (callback) => {
    setIsLoading(true);
    setProgress(0);
    let width = 0;
    const loadingInterval = setInterval(() => {
      width += 25;
      if (width >= 100) {
        clearInterval(loadingInterval);
        callback();
        setIsLoading(false);
        setProgress(0);
      } else {
        setProgress(width);
      }
    }, 200);
  };

  const handlePrev = () => {
    simulateLoading(() => {
      setVisibleCount((prev) => Math.max(prev - 6, 6));
    });
  };

  const handleLoadMore = () => {
    simulateLoading(() => {
      setVisibleCount((prev) =>
        Math.min(prev + 6, filteredArticles.length)
      );
    });
  };

  // ✅ Klik berita → kirim ke NewsDetail dengan daftar berita lainnya
  const handleReadMore = (article, index) => {
    // Pastikan tidak undefined
    if (!article || !articles.length) return;

    const otherArticles = articles.filter((_, i) => i !== index);
    navigate(`/news/${index}`, {
      state: { article, otherArticles },
    });
  };

  // Label kategori
  const categoryLabel = (cat) => {
    const map = {
      general: language === "id" ? "Umum" : "General",
      technology: language === "id" ? "Teknologi" : "Technology",
      business: language === "id" ? "Bisnis" : "Business",
      sports: language === "id" ? "Olahraga" : "Sports",
      entertainment: language === "id" ? "Hiburan" : "Entertainment",
      health: language === "id" ? "Kesehatan" : "Health",
      science: language === "id" ? "Sains" : "Science",
    };
    return map[cat] || cat;
  };

  // Label Dark/Light Mode
  const toggleButtonLabel = () =>
    darkMode
      ? language === "id"
        ? "☀️ Terang"
        : "☀️ Light"
      : language === "id"
      ? "🌙 Gelap"
      : "🌙 Dark";

  return (
    <>
      {/* 🔵 Progress Bar */}
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-300 z-50">
          <div
            className="h-1 bg-blue-600 transition-all duration-200"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      {/* 🌈 Hero Section */}
      <section
        className={`w-full px-6 md:px-12 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center overflow-hidden ${
          darkMode
            ? "bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 text-white"
            : "bg-gradient-to-r from-blue-500 via-cyan-400 to-green-400 text-white"
        }`}
      >
        {/* Text kiri */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-snug">
            {language === "id" ? "Selamat Datang di" : "Welcome to"} <br />
            <span className="text-yellow-300">
              {language === "id"
                ? "Portal Berita Internasional"
                : "International News Portal"}
            </span>
          </h1>
          <p className="mt-4 text-lg">
            {language === "id"
              ? "Dapatkan berita terbaru seputar dunia, teknologi, olahraga, bisnis, kesehatan, hiburan, dan banyak lagi."
              : "Get the latest updates on world, technology, sports, business, health, entertainment, and more."}
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <input
              type="text"
              placeholder={
                language === "id" ? "Cari berita..." : "Search news..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 rounded-md text-black w-full sm:w-60"
            />
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`px-5 py-2 rounded-md font-medium transition-all duration-300 shadow-md ${
                darkMode
                  ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
            >
              {toggleButtonLabel()}
            </button>
          </div>

          <div className="mt-4">
            <Link
              to="/about"
              className="inline-block px-6 py-3 rounded-md bg-white text-gray-900 font-semibold shadow hover:bg-gray-200 transition"
            >
              {language === "id" ? "Tentang Kami" : "About Us"}
            </Link>
          </div>
        </div>

        {/* Slideshow kanan */}
        <div className="relative flex justify-center md:justify-end">
          <div className="w-72 md:w-80 lg:w-96 h-72 md:h-80 lg:h-96 overflow-hidden rounded-xl shadow-lg">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              {heroImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`slide-${idx}`}
                  className="w-full h-full object-contain flex-shrink-0"
                />
              ))}
            </div>
          </div>
          <div className="absolute bottom-3 flex gap-2">
            {heroImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={`w-3 h-3 rounded-full transition ${
                  currentImage === idx
                    ? "bg-yellow-400"
                    : "bg-white opacity-50"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* 🏷️ Kategori */}
      <div className="px-4 md:px-8 py-6 flex flex-wrap gap-3 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 sm:px-5 py-2 rounded-full font-medium shadow-md transition-all duration-300 text-sm sm:text-base ${
              selectedCategory === cat
                ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white scale-105"
                : darkMode
                ? "bg-gray-800 text-white hover:bg-gray-700"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
            }`}
          >
            {categoryLabel(cat)}
          </button>
        ))}
      </div>

      {/* 📰 Daftar Berita */}
      <motion.div
        className="text-center my-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2
          className={`font-extrabold text-4xl bg-clip-text text-transparent ${
            darkMode
              ? "bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500"
              : "bg-gradient-to-r from-blue-600 via-green-500 to-cyan-400"
          }`}
        >
          📰 {language === "id" ? "Berita Hari Ini" : "News Today"}
        </h2>
        <div className="mt-2 w-24 mx-auto h-1 rounded-full bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 animate-pulse"></div>

        <div
          className={`mt-4 text-sm sm:text-base font-medium flex items-center justify-center gap-2 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          ⏰{" "}
          {time.toLocaleDateString(language === "id" ? "id-ID" : "en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          - {time.toLocaleTimeString(language === "id" ? "id-ID" : "en-US")}
        </div>
      </motion.div>

      {/* News List */}
      <div className="px-4 md:px-8">
        {isLoading && visibleCount === 6 ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <NewsList
            articles={currentArticles}
            darkMode={darkMode}
            language={language}
            onReadMore={handleReadMore} // ✅ kirim artikel ke NewsDetail
          />
        )}

        {/* Navigasi Berita */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handlePrev}
            disabled={visibleCount <= 6 || isLoading}
            className={`px-4 py-2 rounded-md shadow font-medium transition ${
              visibleCount <= 6 || isLoading
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-500"
            }`}
          >
            ⬅️ {language === "id" ? "Sebelumnya" : "Previous"}
          </button>

          <button
            onClick={handleLoadMore}
            disabled={visibleCount >= filteredArticles.length || isLoading}
            className={`px-4 py-2 rounded-md shadow font-medium transition ${
              visibleCount >= filteredArticles.length || isLoading
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-500"
            }`}
          >
            {isLoading
              ? language === "id"
                ? "Memuat..."
                : "Loading..."
              : language === "id"
              ? "Berita Lainnya ➕"
              : "More News ➕"}
          </button>
        </div>
      </div>

      <FeaturesSection darkMode={darkMode} language={language} />

      {/* Terima kasih */}
      <div
        className={`mt-12 py-10 px-6 text-center rounded-xl max-w-3xl mx-auto shadow-lg ${
          darkMode ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-800"
        }`}
      >
        <p className="text-lg italic">
          {language === "id"
            ? "Terima kasih sudah menggunakan Portal Berita Internasional. Stay informed, stay inspired!"
            : "Thank you for using the International News Portal. Stay informed, stay inspired!"}
        </p>
      </div>

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-500 transition"
        >
          🔝
        </button>
      )}
    </>
  );
}

export default Home;
