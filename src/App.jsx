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

  // 🔹 Ambil data user & preferensi dari localStorage saat pertama kali load
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedDark = localStorage.getItem("darkMode");
    const savedLang = localStorage.getItem("language");

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedDark) setDarkMode(savedDark === "true");
    if (savedLang) setLanguage(savedLang);
  }, []);

  // 🔹 Simpan preferensi ke localStorage saat berubah
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    localStorage.setItem("language", language);
  }, [darkMode, language]);

  // 🔹 Simpan user ke localStorage setiap kali berubah
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  // 🔹 Logout hanya menghapus user dari state
  const handleLogout = () => {
    setUser(null);
  };

  // 🔹 Jika belum login → tampilkan halaman login
  if (!user) {
    return (
      <div
        className={`min-h-screen flex flex-col justify-center items-center transition-colors duration-300 ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        <Login setUser={setUser} darkMode={darkMode} language={language} />
        <Footer darkMode={darkMode} language={language} />
      </div>
    );
  }

  // 🔹 Jika sudah login → tampilkan seluruh aplikasi
  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
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
          {/* ✅ setDarkMode sudah dikirim ke Home */}
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
                onLogout={handleLogout}
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
