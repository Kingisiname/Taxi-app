"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { tours, categoryLabels } from "@/data/tours";
import { Tour } from "@/types";
import TourCard from "@/components/TourCard";

const categories: Array<Tour["category"] | "all"> = [
  "all",
  "adventure",
  "nature",
  "culture",
  "island_hopping",
  "city",
];

const categoryLabelsAll: Record<string, string> = {
  all: "All Tours",
  ...categoryLabels,
};

export default function ToursPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Tour["category"] | "all">("all");

  const filtered = tours.filter(t => {
    const matchesCategory = activeCategory === "all" || t.category === activeCategory;
    const q = search.toLowerCase();
    const matchesSearch =
      !search ||
      t.title.toLowerCase().includes(q) ||
      t.shortDescription.toLowerCase().includes(q) ||
      t.tags.some(tag => tag.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-teal-600 to-emerald-700 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Tours &amp; Experiences</h1>
          <p className="text-teal-100 text-lg">
            Discover the best of St. Vincent &amp; the Grenadines with a trusted local guide.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tours…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Category pills */}
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-emerald-600 text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-emerald-300 hover:text-emerald-700"
                }`}
              >
                {categoryLabelsAll[cat]}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {filtered.length > 0 ? (
          <>
            <p className="text-sm text-gray-500 mb-4">
              {filtered.length} tour{filtered.length !== 1 ? "s" : ""} found
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(tour => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-lg font-medium text-gray-600">No tours found</p>
            <p className="text-sm mt-1">Try a different search or category</p>
          </div>
        )}
      </div>
    </div>
  );
}
