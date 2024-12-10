"use client";

import { useState } from "react";
import Link from "next/link";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";

Amplify.configure(outputs);

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-gray-900">
            Welcome to Our Project
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            An open-source initiative to make development easier and more accessible
          </p>
          <div className="space-x-4">
            <Link 
              href="/todos" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-block"
            >
              Get Started
            </Link>
            <Link 
              href="/sponsors" 
              className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 inline-block"
            >
              Our Sponsors
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Easy Integration</h3>
            <p className="text-gray-600">
              Seamlessly integrate with your existing workflow and tools
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Powerful Features</h3>
            <p className="text-gray-600">
              Access advanced capabilities with simple, intuitive interfaces
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Community Driven</h3>
            <p className="text-gray-600">
              Built by developers, for developers, with love
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-8">
            Join our community and start building amazing things today
          </p>
          <a 
            href="https://github.com/your-repo"
            className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 inline-block"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </main>
  );
}
