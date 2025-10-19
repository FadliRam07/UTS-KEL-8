import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function NewsDetail({ darkMode, language, user }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Ambil artikel utama & berita lainnya dari state
  const [article, setArticle] = useState(location.state?.article || null);
  const [otherArticles, setOtherArticles] = useState(
    location.state?.otherArticles || []
  );

  // Jika state kosong (misalnya refresh halaman)
  useEffect(() => {
    if (!article) {
      const savedArticle = localStorage.getItem("currentArticle");
      const savedOthers = localStorage.getItem("otherArticles");

      if (savedArticle) setArticle(JSON.parse(savedArticle));
      if (savedOthers) setOtherArticles(JSON.parse(savedOthers || "[]"));
    }
  }, [article]);

  // Simpan ke localStorage tiap kali berubah
  useEffect(() => {
    if (article) {
      localStorage.setItem("currentArticle", JSON.stringify(article));
      localStorage.setItem("otherArticles", JSON.stringify(otherArticles));
    }
  }, [article, otherArticles]);

  // Fungsi klik "Berita Lainnya"
  const handleOtherClick = (item) => {
    // Hindari crash: jika klik item kosong
    if (!item) return;

    const updatedOthers = otherArticles.filter(
      (a) => a.title !== item.title
    );

    // Simpan data baru ke localStorage
    localStorage.setItem("currentArticle", JSON.stringify(item));
    localStorage.setItem("otherArticles", JSON.stringify(updatedOthers));

    // Navigasi ke berita baru dengan state
    navigate(`/news/${Date.now()}`, {
      state: { article: item, otherArticles: updatedOthers },
    });

    // Update langsung state supaya re-render tanpa reload
    setArticle(item);
    setOtherArticles(updatedOthers);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Jika belum ada artikel
  if (!article) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        <p>{language === "id" ? "Berita tidak ditemukan." : "News not found."}</p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen grid grid-cols-1 lg:grid-cols-3 gap-10 px-6 py-10 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Artikel Utama */}
      <motion.div
        className="lg:col-span-2"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <button
          onClick={() => navigate(-1)}
          className={`mb-6 px-5 py-2 rounded-lg ${
            darkMode
              ? "bg-blue-600 hover:bg-blue-500 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          ← {language === "id" ? "Kembali" : "Back"}
        </button>

        {article.urlToImage && (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-auto rounded-xl shadow-lg mb-6"
          />
        )}

        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        <p className="text-sm text-gray-400 mb-4">
          {new Date(article.publishedAt).toLocaleDateString()}
        </p>

        <p className="mb-6">{article.description}</p>
        <p>{article.content}</p>

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-block mt-6 px-5 py-2 rounded-lg font-semibold ${
            darkMode
              ? "bg-green-600 hover:bg-green-500 text-white"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          {language === "id" ? "Baca Selengkapnya 🔗" : "Read More 🔗"}
        </a>
      </motion.div>

      {/* Berita Lainnya */}
      <motion.aside
        className={`p-4 rounded-xl shadow-md h-fit ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-xl font-bold mb-4 border-b pb-2">
          {language === "id" ? "Berita Lainnya" : "Other News"}
        </h2>

        <div className="space-y-4">
          {otherArticles && otherArticles.length > 0 ? (
            otherArticles.slice(0, 4).map((item, i) => (
              <div
                key={i}
                onClick={() => handleOtherClick(item)}
                className={`cursor-pointer rounded-lg overflow-hidden hover:shadow-lg transition ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {item.urlToImage && (
                  <img
                    src={item.urlToImage}
                    alt={item.title}
                    className="w-full h-32 object-cover"
                  />
                )}
                <div className="p-2">
                  <h3 className="text-sm font-semibold line-clamp-2">
                    {item.title}
                  </h3>
                  <p
                    className={`text-xs mt-1 ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {new Date(item.publishedAt).toLocaleDateString("id-ID")}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm italic text-gray-400">
              {language === "id"
                ? "Tidak ada berita lain."
                : "No other news available."}
            </p>
          )}
        </div>
      </motion.aside>
    </div>
  );
}

export default NewsDetail;
