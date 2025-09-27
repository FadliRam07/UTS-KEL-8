import React from "react";
import { useLocation, Link } from "react-router-dom";

function Detail() {
  const { state: article } = useLocation();

  if (!article) {
    return <p>Artikel tidak ditemukan.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>{article.title}</h1>
      {article.urlToImage && (
        <img src={article.urlToImage} alt={article.title} style={{ width: "100%", maxWidth: "600px" }} />
      )}
      <p>{article.description}</p>
      <a href={article.url} target="_blank" rel="noreferrer">Baca sumber asli</a>
      <br />
      <Link to="/">← Kembali</Link>
    </div>
  );
}

export default Detail;
