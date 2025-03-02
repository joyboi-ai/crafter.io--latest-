"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";

function HistoryPage() {
  return (
    <div className="h-screen w-full bg-black text-white flex flex-col items-center justify-center relative">
      {/* Go Back Button */}
      <button
        onClick={() => window.history.back()}
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-300 hover:text-orange-500 transition duration-200"
      >
        <ArrowLeft className="h-6 w-6" />
        <span className="text-lg font-medium">Go Back</span>
      </button>

      {/* Page Header */}
      <h1 className="text-4xl font-bold text-orange-500">Blogs Page</h1>
    </div>
  );
}

export default HistoryPage;
