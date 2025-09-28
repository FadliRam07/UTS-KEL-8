// api/news.js
export default async function handler(req, res) {
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;
  const { category = "general" } = req.query;

  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
}
