export default async function handler(req, res) {
  const { category = "general" } = req.query;
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;

  try {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
}
