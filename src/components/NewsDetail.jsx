import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function NewsDetail({ darkMode, language }) {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.article) {
    return (
      <div
        className={`p-6 min-h-screen ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        <p>{language === "id" ? "Berita tidak ditemukan." : "News not found."}</p>
        <button
          onClick={() => navigate(-1)}
          className={`mt-4 px-4 py-2 rounded-lg font-medium transition ${
            darkMode
              ? "bg-blue-600 text-white hover:bg-blue-500"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          ← {language === "id" ? "Kembali" : "Back"}
        </button>
      </div>
    );
  }

  const { article } = state;

  return (
    <div
      className={`p-6 max-w-3xl mx-auto rounded-xl shadow-md ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Tombol kembali */}
      <button
        onClick={() => navigate(-1)}
        className={`mb-4 px-4 py-2 rounded-lg font-medium transition ${
          darkMode
            ? "bg-blue-600 text-white hover:bg-blue-500"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        ← {language === "id" ? "Kembali" : "Back"}
      </button>

      {/* Gambar berita */}
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full rounded-xl mb-6"
        />
      )}

      {/* Judul */}
      <h1 className="text-2xl font-bold mb-4">{article.title}</h1>

      {/* Penulis + tanggal */}
      <p
        className={`mb-4 text-sm italic ${
          darkMode ? "text-gray-300" : "text-gray-600"
        }`}
      >
        {article.author ? `${article.author} - ` : ""}
        {new Date(article.publishedAt).toLocaleDateString()}
      </p>

      {/* Isi berita */}
      <div className="text-lg leading-relaxed space-y-4">
        {/* Deskripsi */}
        {article.description &&
          (!article.content ||
            !article.content.includes(article.description)) && (
            <p>{article.description}</p>
          )}

        {/* Konten lebih panjang */}
        <p>
          {article.content
            ? article.content.replace(/\[\+\d+ chars\]/, "")
            : language === "id"
            ? "Tidak ada konten lebih lanjut."
            : "No further content available."}
        </p>
      </div>

      {/* Link eksternal */}
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-6 inline-block px-4 py-2 rounded-lg font-medium transition ${
          darkMode
            ? "bg-green-600 text-white hover:bg-green-500"
            : "bg-green-500 text-white hover:bg-green-600"
        }`}
      >
        {language === "id" ? "Baca Selengkapnya 🔗" : "Read More 🔗"}
      </a>
    </div>
  );
}

export default NewsDetail;
