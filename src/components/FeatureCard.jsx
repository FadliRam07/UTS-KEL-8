import React from "react";

function FeatureCard({ icon, title, description, darkMode }) {
  return (
    <div
      className={`rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition ${
        darkMode
          ? "bg-gray-800 text-white hover:bg-gray-700"
          : "bg-white text-gray-800 hover:bg-gray-100"
      }`}
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p
        className={`text-sm mt-2 ${
          darkMode ? "text-gray-300" : "text-gray-600"
        }`}
      >
        {description}
      </p>
    </div>
  );
}

export default FeatureCard;
