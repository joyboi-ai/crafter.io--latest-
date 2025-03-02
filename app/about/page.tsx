"use client";

import React from "react";
import Image from "next/image";
import { Info, Users, ShieldCheck, FileText, MessageSquare, ArrowLeft, Database, Ruler, PenTool, LayoutGrid, Code } from "lucide-react";

function AboutPage() {
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

      {/* College Logo */}
      <div className="mb-4">
        <Image src="/collagelogobw.png" alt="Valia Collage Logo" width={100} height={100} />
      </div>

      {/* Page Header */}
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold flex justify-center items-center gap-2 text-orange-500">
          <Info className="h-7 w-7" /> About Crafter.io
        </h1>
      </header>

      {/* Main Content */}
      <main className="text-center max-w-2xl">
        {/* Our Vision */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-300">Our Vision</h2>
          <p className="mt-3 text-gray-400">
            Our mission is to revolutionize collaboration by providing an
            <span className="text-orange-500"> AI-powered, cloud-based </span>
            document and diagramming tool that enhances teamwork and creativity.
          </p>
        </section>

        {/* Key Features */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-300">Key Features</h2>
          <div className="grid grid-cols-2 gap-5 mt-4">
            <div className="flex items-center justify-center gap-2">
              <FileText className="h-7 w-7 text-orange-500" />
              <p className="text-gray-400 text-sm">Intuitive Document Editor</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Users className="h-7 w-7 text-orange-500" />
              <p className="text-gray-400 text-sm">Real-Time Collaboration</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="h-7 w-7 text-orange-500" />
              <p className="text-gray-400 text-sm">Robust Security & Privacy</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <MessageSquare className="h-7 w-7 text-orange-500" />
              <p className="text-gray-400 text-sm">Ai Assistance</p>
            </div>
          </div>
        </section>

        {/* Creator & Project Guide */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-300">Project By</h2>
          <p className="text-orange-500 mt-2 text-lg font-semibold">Surya</p>

          <h2 className="text-2xl font-semibold text-gray-300 mt-4">Project Guide</h2>
          <p className="text-orange-500 mt-2 text-lg font-semibold">Prof. Aarti Patkar & Prof Jermin shaikh</p>
          <p className="text-gray-400 text-sm mt-1">
            Department of Information Technology, Valia College
          </p>
        </section>
      </main>
    </div>
  );
}

export default AboutPage;
