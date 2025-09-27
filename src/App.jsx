import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NewsDetail from "./components/NewsDetail";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import Login from "./components/Login";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState("id");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  if (!user)
    return <Login setUser={setUser} darkMode={darkMode} language={language} />;

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        language={language}
        setLanguage={setLanguage}
        user={user}
        onLogout={handleLogout}
      />

      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                language={language}
              />
            }
          />
          <Route
            path="/news/:id"
            element={<NewsDetail darkMode={darkMode} language={language} />}
          />
          <Route
            path="/about"
            element={<About darkMode={darkMode} language={language} />}
          />
          <Route
            path="/contact"
            element={<Contact darkMode={darkMode} language={language} />}
          />
          <Route
            path="/profile"
            element={
              <Profile
                user={user}
                setUser={setUser}
                darkMode={darkMode}
                language={language}
              />
            }
          />
          <Route
            path="/settings"
            element={
              <Settings
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                language={language}
                setLanguage={setLanguage}
              />
            }
          />
        </Routes>
      </main>

      <Footer darkMode={darkMode} language={language} />
    </div>
  );
}

export default App;
