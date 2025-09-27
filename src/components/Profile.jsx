import React, { useState } from "react";
import { Link } from "react-router-dom";

function Profile({ user, setUser, darkMode, language }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(user);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = () => {
    setUser(form);
    localStorage.setItem("user", JSON.stringify(form));
    setEditing(false);
  };

  const text = {
    editProfile: language === "id" ? "✏️ Edit Profil" : "✏️ Edit Profile",
    save: language === "id" ? "💾 Simpan" : "💾 Save",
    cancel: language === "id" ? "❌ Batal" : "❌ Cancel",
    back: language === "id" ? "⬅️ Kembali" : "⬅️ Back",
    namePlaceholder: language === "id" ? "Nama" : "Name",
    emailPlaceholder: language === "id" ? "Email" : "Email",
  };

  return (
    <div className={`max-w-2xl mx-auto p-6 mt-8 rounded-2xl shadow-lg ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
      <div className="flex flex-col items-center gap-4">
        {/* Avatar default seperti WA */}
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

        <div className="flex gap-3 mt-4">
          {editing ? (
            <>
              <button onClick={handleSave} className="px-5 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-medium text-white shadow-md">{text.save}</button>
              <button onClick={() => setEditing(false)} className="px-5 py-2 bg-gray-500 hover:bg-gray-600 rounded-lg font-medium text-white shadow-md">{text.cancel}</button>
            </>
          ) : (
            <button onClick={() => setEditing(true)} className="px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium text-white shadow-md">{text.editProfile}</button>
          )}
          <Link to="/" className="px-5 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg font-medium text-white shadow-md">{text.back}</Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;
