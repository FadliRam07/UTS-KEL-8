import React from "react";
import { Link } from "react-router-dom";

function NewsItem({ article, language }) {
  // 🔹 Teks tombol sesuai bahasa
  const readMoreText = language === "id" ? "Baca Selengkapnya" : "Read more";

  return (
    <div
      style={{
        marginBottom: "20px",
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <h3>{article.title}</h3>
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          style={{ width: "200px" }}
        />
      )}
      <p>{article.description || (language === "id" ? "Deskripsi tidak tersedia." : "No description available.")}</p>
      <Link to="/detail" state={article}>
        {readMoreText}
      </Link>
    </div>
  );
}

export default NewsItem;
