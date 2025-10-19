useEffect(() => {
  const fetchNews = async () => {
    try {
      setIsLoading(true);
      const apiKey = process.env.REACT_APP_NEWS_API_KEY; // pastikan sudah ada di .env
      const url = `https://newsapi.org/v2/top-headlines?country=us&category=${selectedCategory}&apiKey=${apiKey}`;
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
