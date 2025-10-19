import React, { useState } from "react";
import { Link } from "react-router-dom";

function Profile({ user, setUser, darkMode, language, onLogout }) {
  const [editing, setEditing] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [form, setForm] = useState(user);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handlePasswordChange = (e) =>
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });

  // ✅ Simpan perubahan profil
  const handleSave = () => {
    setUser(form);
    localStorage.setItem("user", JSON.stringify(form));
    setEditing(false);
    setMessage(
      language === "id"
        ? "✅ Profil berhasil diperbarui!"
        : "✅ Profile updated successfully!"
    );
  };

  // ✅ Ubah password
  const handlePasswordUpdate = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) return;

    if (passwordData.oldPassword !== storedUser.password) {
      setMessage(
        language === "id"
          ? "❌ Kata sandi lama salah!"
          : "❌ Incorrect old password!"
      );
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage(
        language === "id"
          ? "❌ Konfirmasi kata sandi tidak cocok!"
          : "❌ Password confirmation does not match!"
      );
      return;
    }

    const updatedUser = { ...storedUser, password: passwordData.newPassword };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    setChangingPassword(false);
    setMessage(
      language === "id"
        ? "✅ Kata sandi berhasil diubah!"
        : "✅ Password changed successfully!"
    );
  };

  const text = {
    editProfile: language === "id" ? "✏️ Edit Profil" : "✏️ Edit Profile",
    save: language === "id" ? "💾 Simpan" : "💾 Save",
    cancel: language === "id" ? "❌ Batal" : "❌ Cancel",
    back: language === "id" ? "⬅️ Kembali" : "⬅️ Back",
    namePlaceholder: language === "id" ? "Nama" : "Name",
    emailPlaceholder: language === "id" ? "Email" : "Email",
    changePassword: language === "id" ? "🔒 Ubah Kata Sandi" : "🔒 Change Password",
    oldPassword: language === "id" ? "Kata Sandi Lama" : "Old Password",
    newPassword: language === "id" ? "Kata Sandi Baru" : "New Password",
    confirmPassword: language === "id" ? "Konfirmasi Kata Sandi" : "Confirm Password",
    update: language === "id" ? "✅ Perbarui" : "✅ Update",
    logout: language === "id" ? "🚪 Keluar" : "🚪 Logout",
    logoutConfirm: language === "id"
      ? "Apakah Anda yakin ingin keluar dari website ini?"
      : "Are you sure you want to log out from this website?",
    yes: language === "id" ? "✅ Ya, Keluar" : "✅ Yes, Logout",
    no: language === "id" ? "❌ Batal" : "❌ Cancel",
  };

  return (
    <div
      className={`max-w-2xl mx-auto p-6 mt-8 rounded-2xl shadow-lg relative ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Avatar */}
        {user.avatar ? (
          <img
            src={user.avatar}
            alt="avatar"
            className="w-28 h-28 rounded-full border-4 border-blue-400 shadow-md"
          />
        ) : (
          <div className="w-28 h-28 rounded-full bg-white border-2 border-gray-300 shadow-md flex items-center justify-center">
            <span className="text-3xl font-bold text-gray-500">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </span>
          </div>
        )}

        {/* Nama dan Email */}
        {editing ? (
          <div className="w-full flex flex-col gap-3">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="px-4 py-2 rounded-lg border text-gray-900"
              placeholder={text.namePlaceholder}
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="px-4 py-2 rounded-lg border text-gray-900"
              placeholder={text.emailPlaceholder}
            />
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-400">{user.email}</p>
          </div>
        )}

        {/* Form Ubah Password */}
        {changingPassword && (
          <div className="w-full flex flex-col gap-3 mt-4">
            <input
              type="password"
              name="oldPassword"
              value={passwordData.oldPassword}
              onChange={handlePasswordChange}
              placeholder={text.oldPassword}
              className="px-4 py-2 rounded-lg border text-gray-900"
            />
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              placeholder={text.newPassword}
              className="px-4 py-2 rounded-lg border text-gray-900"
            />
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              placeholder={text.confirmPassword}
              className="px-4 py-2 rounded-lg border text-gray-900"
            />
            <div className="flex gap-3 mt-2">
              <button
                onClick={handlePasswordUpdate}
                className="px-5 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-medium text-white shadow-md"
              >
                {text.update}
              </button>
              <button
                onClick={() => setChangingPassword(false)}
                className="px-5 py-2 bg-gray-500 hover:bg-gray-600 rounded-lg font-medium text-white shadow-md"
              >
                {text.cancel}
              </button>
            </div>
          </div>
        )}

        {/* Pesan Notifikasi */}
        {message && (
          <p
            className={`text-center mt-3 text-sm ${
              message.includes("✅")
                ? "text-green-400"
                : message.includes("❌")
                ? "text-red-400"
                : "text-blue-400"
            }`}
          >
            {message}
          </p>
        )}

        {/* Tombol Aksi */}
        <div className="flex flex-wrap gap-3 mt-5 justify-center">
          {!changingPassword && (
            <>
              {editing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="px-5 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-medium text-white shadow-md"
                  >
                    {text.save}
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="px-5 py-2 bg-gray-500 hover:bg-gray-600 rounded-lg font-medium text-white shadow-md"
                  >
                    {text.cancel}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium text-white shadow-md"
                >
                  {text.editProfile}
                </button>
              )}

              <button
                onClick={() => setChangingPassword(true)}
                className="px-5 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg font-medium text-white shadow-md"
              >
                {text.changePassword}
              </button>

              {/* 🔹 Tombol Logout */}
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="px-5 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-medium text-white shadow-md"
              >
                {text.logout}
              </button>

              <Link
                to="/"
                className="px-5 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg font-medium text-white shadow-md"
              >
                {text.back}
              </Link>
            </>
          )}
        </div>
      </div>

      {/* 🔹 Popup Konfirmasi Logout */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`p-6 rounded-xl shadow-lg text-center max-w-sm w-full ${
              darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
            }`}
          >
            <h3 className="text-lg font-semibold mb-4">{text.logoutConfirm}</h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setShowLogoutConfirm(false);
                  onLogout(); // ✅ panggil fungsi logout dari App.jsx
                }}
                className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium shadow-md"
              >
                {text.yes}
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-5 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg font-medium shadow-md"
              >
                {text.no}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
