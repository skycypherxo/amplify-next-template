"use client";

import Link from "next/link";

export default function SponsorsPage() {
  const sponsors = [
    {
      name: "AWS",
      tier: "platinum",
      logo: "/aws-logo.png", // You'll need to add these images
      description: "Cloud computing services",
      link: "https://aws.amazon.com"
    },
    // Add more sponsors as needed
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Link 
            href="/"
            className="text-blue-600 hover:text-blue-700 mb-8 inline-block"
          >
            ← Back to Home
          </Link>
          <h1 className="text-5xl font-bold mb-6 text-gray-900">Our Sponsors</h1>
          <p className="text-xl text-gray-600">
            Thank you to these amazing organizations that make our work possible
          </p>
        </div>

        {/* Sponsors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sponsors.map((sponsor) => (
            <a
              key={sponsor.name}
              href={sponsor.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-video relative mb-4">
                {/* Add proper image component when you have the logos */}
                <div className="absolute inset-0 bg-gray-100 rounded flex items-center justify-center">
                  {sponsor.name}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{sponsor.name}</h3>
              <p className="text-gray-600">{sponsor.description}</p>
              <span className="inline-block mt-3 text-sm text-blue-600 capitalize">
                {sponsor.tier} Sponsor
              </span>
            </a>
          ))}
        </div>

        {/* Become a Sponsor CTA */}
        <div className="text-center mt-16 p-8 bg-white rounded-xl shadow-sm">
          <h2 className="text-3xl font-bold mb-4">Become a Sponsor</h2>
          <p className="text-gray-600 mb-8">
            Support our project and get your company featured on this page
          </p>
          <a 
            href="mailto:your-email@example.com"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-block"
          >
            Contact Us
          </a>
        </div>
      </div>
    </main>
  );
} 