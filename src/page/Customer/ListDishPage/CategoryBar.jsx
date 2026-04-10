import React from 'react';

const FIXED_CATEGORIES = [
  { key: "All", label: "Tất cả" },
  { key: "Món chính", label: "Món chính" },
  { key: "Khai vị", label: "Khai vị" },
  { key: "Tráng miệng", label: "Tráng miệng" },
  { key: "Đồ uống", label: "Đồ uống" },
];

const CategoryBar = ({ activeTab, onSelect }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-6">
      {FIXED_CATEGORIES.map((cat) => (
        <button
          key={cat.key}
          onClick={() => onSelect(cat.key)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeTab === cat.key
              ? "bg-red-500 text-white shadow-md scale-105"
              : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-100"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryBar;