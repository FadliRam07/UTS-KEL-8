import React, { useState, useEffect } from "react";

function Login({ setUser, darkMode, language }) {
  const [username, setUsername] = useState("");
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    if (username.trim() !== "") {
      const userData = { name: username };
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    }
  };

  return (
    <div
  className={`min-h-screen flex items-center justify-center px-4 transition-all duration-500 ${
    darkMode
      ? "bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white relative overflow-hidden"
      : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
  }`}
>
  {/* Opsional: efek lingkaran abstrak */}
  {darkMode && (
    <>
      <div className="absolute -top-32 -left-32 w-72 h-72 bg-indigo-800 rounded-full opacity-30 blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-800 rounded-full opacity-20 blur-3xl animate-pulse"></div>
    </>
  )}

  <div
    className={`relative w-full max-w-md p-10 rounded-3xl shadow-2xl backdrop-blur-md bg-white/20 transition-all transform duration-700 ease-out ${
      fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    } ${darkMode ? "bg-gray-800/80" : "bg-white/30"} hover:scale-105`}
  >
    <div className="flex justify-center mb-6">
      <span className="text-6xl animate-bounce">📰</span>
    </div>

    <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-2">
      {language === "id" ? "Selamat Datang!" : "Welcome!"}
    </h1>
    <p className="text-center text-gray-200 mb-6 text-sm sm:text-base">
      {language === "id"
        ? "Masukkan nama pengguna untuk memulai pengalaman berita Anda."
        : "Enter your username to start your news journey."}
    </p>

    <input
      type="text"
      placeholder={language === "id" ? "Nama Pengguna" : "Username"}
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      className="border p-3 rounded-lg w-full mb-6 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    />

    <button
      onClick={handleLogin}
      className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white rounded-lg hover:from-purple-500 hover:via-pink-400 hover:to-red-400 transition-all font-semibold shadow-lg transform hover:scale-105"
    >
      {language === "id" ? "Masuk" : "Login"}
    </button>
  </div>
</div>

  );
}

export default Login;
