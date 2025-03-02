"use client";

import React from "react";
import { ArrowLeft, Database, Ruler, PenTool, LayoutGrid, Code } from "lucide-react";

function CareerPage() {
  return (
    <div className="relative h-screen w-full bg-black text-white flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background Icons */}
      <div className="absolute inset-0 flex flex-wrap items-center justify-center opacity-10">
        <Database className="absolute top-10 left-10 h-12 w-12 text-orange-600" />
        <Ruler className="absolute top-24 right-16 h-10 w-10 text-orange-600" />
        <PenTool className="absolute bottom-20 left-20 h-10 w-10 text-orange-600" />
        <LayoutGrid className="absolute bottom-10 right-24 h-12 w-12 text-orange-600" />
        <Code className="absolute top-1/2 left-1/2 h-10 w-10 text-orange-600 transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Go Back Button */}
      <button
        onClick={() => window.history.back()}
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-300 hover:text-orange-500 transition duration-200"
      >
        <ArrowLeft className="h-6 w-6" />
        <span className="text-lg font-medium">Go Back</span>
      </button>

      {/* Career Page Heading */}
      <h1 className="text-4xl font-bold text-orange-500">Career Page</h1>
    </div>
  );
}

export default CareerPage;
