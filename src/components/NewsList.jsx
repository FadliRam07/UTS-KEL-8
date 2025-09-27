import React from "react";
import { Link } from "react-router-dom";

function NewsList({ articles, darkMode, language }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 py-4">
      {articles.map((article, index) => (
        <div
          key={index}
          className={`shadow-md rounded-xl overflow-hidden flex flex-col hover:shadow-lg transition ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
          }`}
        >
          {/* Gambar */}
          {article.urlToImage && (
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
          )}

          {/* Isi Card */}
          <div className="p-4 flex flex-col flex-grow">
            <h2 className="text-md font-semibold line-clamp-2 mb-2">
              {article.title}
            </h2>
            <p
              className={`text-sm mb-2 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {new Date(article.publishedAt).toLocaleDateString()}
            </p>
            <p
              className={`text-sm line-clamp-3 flex-grow ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {article.description || (language === "id" ? "Tidak ada deskripsi." : "No description available.")}
            </p>

            {/* Tombol */}
            <Link
              to={`/news/${index}`}
              state={{ article }}
              className={`mt-4 inline-block px-4 py-2 rounded-lg text-sm text-center transition ${
                darkMode
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {language === "id" ? "Baca Selengkapnya →" : "Read More →"}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NewsList;
