import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setUser, darkMode, language }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fadeIn, setFadeIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser) {
        setErrorMessage(
          language === "id"
            ? "Akun tidak ditemukan. Silakan buat akun terlebih dahulu."
            : "Account not found. Please create an account first."
        );
        setIsLoading(false);
        return;
      }

      if (storedUser.name === username && storedUser.password === password) {
        setUser(storedUser);
        setErrorMessage("");
        navigate("/");
      } else {
        setErrorMessage(
          language === "id"
            ? "Nama pengguna atau kata sandi salah."
            : "Incorrect username or password."
        );
      }
      setIsLoading(false);
    }, 2000);
  };

  const handleRegister = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (username.trim() === "" || password.trim() === "") {
        setErrorMessage(
          language === "id"
            ? "Isi semua kolom untuk mendaftar."
            : "Please fill out all fields to register."
        );
        setIsLoading(false);
        return;
      }

      const newUser = { name: username, password };
      localStorage.setItem("user", JSON.stringify(newUser));
      setErrorMessage(
        language === "id"
          ? "Akun berhasil dibuat! Silakan login."
          : "Account created successfully! Please log in."
      );
      setIsRegistering(false);
      setUsername("");
      setPassword("");
      setIsLoading(false);
    }, 2000);
  };

  const handleGuestLogin = () => {
    const guestUser = {
      name: language === "id" ? "Tamu" : "Guest",
      email: "guest@newsapp.com",
      password: "",
      role: "guest",
      avatar: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
    };
    setUser(guestUser);
    localStorage.setItem("user", JSON.stringify(guestUser));
    navigate("/");
  };

  return (
    <div
      className={`w-full h-screen flex items-center justify-center px-4 transition-all duration-500 relative overflow-hidden ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white"
          : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
      }`}
    >
      {/* ✅ Efek latar belakang lebih besar */}
      {darkMode && (
        <>
          <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-indigo-800 rounded-full opacity-30 blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-purple-800 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        </>
      )}

      {/* ✅ Kotak Form Login */}
      <div
        className={`relative w-full max-w-md p-10 rounded-3xl shadow-2xl backdrop-blur-md transition-all transform duration-700 ease-out overflow-hidden ${
          fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        } ${darkMode ? "bg-gray-800/80" : "bg-white/30"} hover:scale-105`}
      >
        {isLoading && (
          <div className="absolute top-0 left-0 w-full h-2 bg-gray-700/30 overflow-hidden rounded-t-3xl">
            <div className="h-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-[loading_1.5s_infinite_linear]" />
          </div>
        )}

        <div className="flex justify-center mb-6">
          <span className="text-6xl animate-bounce">📰</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-2">
          {isRegistering
            ? language === "id"
              ? "Buat Akun"
              : "Create Account"
            : language === "id"
            ? "Selamat Datang!"
            : "Welcome!"}
        </h1>

        <p className="text-center text-gray-200 mb-6 text-sm sm:text-base">
          {isRegistering
            ? language === "id"
              ? "Isi nama pengguna dan kata sandi untuk membuat akun baru."
              : "Enter a username and password to create a new account."
            : language === "id"
            ? "Masukkan nama pengguna dan kata sandi untuk masuk."
            : "Enter your username and password to log in."}
        </p>

        {/* Username Input */}
        <input
          type="text"
          placeholder={language === "id" ? "Nama Pengguna" : "Username"}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isLoading}
          className="border p-3 rounded-lg w-full mb-4 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        {/* Password Input */}
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder={language === "id" ? "Kata Sandi" : "Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            className="border p-3 rounded-lg w-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 transition"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        {errorMessage && (
          <p className="text-red-300 text-center mb-4 text-sm">{errorMessage}</p>
        )}

        {/* Tombol utama */}
        <button
          onClick={isRegistering ? handleRegister : handleLogin}
          disabled={isLoading}
          className={`w-full px-4 py-3 rounded-lg font-semibold shadow-lg transform transition-all ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 hover:scale-105 hover:brightness-110"
          }`}
        >
          {isLoading
            ? language === "id"
              ? "Memproses..."
              : "Processing..."
            : isRegistering
            ? language === "id"
              ? "Daftar"
              : "Sign Up"
            : language === "id"
            ? "Masuk"
            : "Login"}
        </button>

        {/* Tombol tamu */}
        {!isRegistering && (
          <button
            onClick={handleGuestLogin}
            disabled={isLoading}
            className="w-full mt-4 px-4 py-3 rounded-lg font-semibold bg-gray-700 hover:bg-gray-600 text-white shadow-md transition-all hover:scale-105"
          >
            {language === "id"
              ? "Masuk sebagai Tamu 👤"
              : "Continue as Guest 👤"}
          </button>
        )}

        {/* Switch login/register */}
        <p className="text-center mt-5 text-sm text-gray-200">
          {isRegistering
            ? language === "id"
              ? "Sudah punya akun?"
              : "Already have an account?"
            : language === "id"
            ? "Belum punya akun?"
            : "Don’t have an account?"}{" "}
          <button
            onClick={() => {
              setIsRegistering(!isRegistering);
              setErrorMessage("");
            }}
            className="text-yellow-300 hover:underline font-semibold"
          >
            {isRegistering
              ? language === "id"
                ? "Masuk di sini"
                : "Login here"
              : language === "id"
              ? "Buat Akun"
              : "Create One"}
          </button>
        </p>
      </div>

      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}

export default Login;
