"use client";

import React from "react";
import { FileText, Users, ShieldCheck, Code, MessageSquare, Cloud, ArrowLeft } from "lucide-react";

function ServicesPage() {
  return (
    <div className="h-screen w-full bg-black text-white flex flex-col items-center justify-center p-6 relative">
      {/* Go Back Button */}
      <button
        onClick={() => window.history.back()}
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-300 hover:text-orange-500 transition duration-200"
      >
        <ArrowLeft className="h-6 w-6" />
        <span className="text-lg font-medium">Go Back</span>
      </button>

      {/* Page Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-orange-500">Our Services</h1>
        <p className="text-gray-400 mt-2 text-lg">
          Empowering collaboration through AI-driven solutions.
        </p>
      </header>

      {/* Services List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl">
        {/* Smart Document Editing */}
        <div className="flex flex-col items-center text-center bg-[#111] p-6 rounded-lg shadow-lg">
          <FileText className="h-10 w-10 text-orange-500 mb-3" />
          <h2 className="text-xl font-semibold text-white">Smart Document Editing</h2>
          <p className="text-gray-400 mt-2 text-sm">
            AI-powered markdown and document editor for seamless writing and collaboration.
          </p>
        </div>

        {/* Real-Time Collaboration */}
        <div className="flex flex-col items-center text-center bg-[#111] p-6 rounded-lg shadow-lg">
          <Users className="h-10 w-10 text-orange-500 mb-3" />
          <h2 className="text-xl font-semibold text-white">Real-Time Collaboration</h2>
          <p className="text-gray-400 mt-2 text-sm">
            Work with your team on shared documents and diagrams in real time.
          </p>
        </div>

        {/* Secure & Private */}
        <div className="flex flex-col items-center text-center bg-[#111] p-6 rounded-lg shadow-lg">
          <ShieldCheck className="h-10 w-10 text-orange-500 mb-3" />
          <h2 className="text-xl font-semibold text-white">Secure & Private</h2>
          <p className="text-gray-400 mt-2 text-sm">
            Industry-standard encryption ensures your data is protected.
          </p>
        </div>

        {/* Diagram-as-Code */}
        <div className="flex flex-col items-center text-center bg-[#111] p-6 rounded-lg shadow-lg">
          <Code className="h-10 w-10 text-orange-500 mb-3" />
          <h2 className="text-xl font-semibold text-white">Diagram-as-Code</h2>
          <p className="text-gray-400 mt-2 text-sm">
            Convert text-based commands into stunning, interactive diagrams.
          </p>
        </div>

        {/* AI Assistance */}
        <div className="flex flex-col items-center text-center bg-[#111] p-6 rounded-lg shadow-lg">
          <MessageSquare className="h-10 w-10 text-orange-500 mb-3" />
          <h2 className="text-xl font-semibold text-white">AI Assistance</h2>
          <p className="text-gray-400 mt-2 text-sm">
            Get intelligent suggestions for your content and workflows.
          </p>
        </div>

        {/* Cloud Storage */}
        <div className="flex flex-col items-center text-center bg-[#111] p-6 rounded-lg shadow-lg">
          <Cloud className="h-10 w-10 text-orange-500 mb-3" />
          <h2 className="text-xl font-semibold text-white">Cloud Storage</h2>
          <p className="text-gray-400 mt-2 text-sm">
            Securely store, access, and share your documents from anywhere.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ServicesPage;
