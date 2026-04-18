import Link from "next/link";
import { Clock, Users, Star, MapPin } from "lucide-react";
import { categoryLabels } from "@/data/tours";
import { Tour } from "@/types";

const categoryColors: Record<Tour["category"], string> = {
  nature: "bg-green-100 text-green-700",
  culture: "bg-amber-100 text-amber-700",
  beach: "bg-sky-100 text-sky-700",
  adventure: "bg-red-100 text-red-700",
  island_hopping: "bg-blue-100 text-blue-700",
  city: "bg-purple-100 text-purple-700",
};

const categoryEmojis: Record<Tour["category"], string> = {
  nature: "🌿",
  culture: "🏛️",
  beach: "🏖️",
  adventure: "🧗",
  island_hopping: "⛵",
  city: "🏙️",
};

interface Props {
  tour: Tour;
}

export default function TourCard({ tour }: Props) {
  return (
    <Link href={`/tours/${tour.id}`} className="group block">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
        {/* Image placeholder with gradient */}
        <div className="h-44 bg-gradient-to-br from-emerald-400 to-teal-600 relative flex items-center justify-center">
          <span className="text-6xl opacity-80">{categoryEmojis[tour.category]}</span>
          <div className="absolute top-3 left-3">
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[tour.category]}`}>
              {categoryLabels[tour.category]}
            </span>
          </div>
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
            <span className="text-xs font-semibold text-gray-800">{tour.rating}</span>
            <span className="text-xs text-gray-500">({tour.reviewCount})</span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors leading-snug mb-1">
            {tour.title}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2 mb-3">{tour.shortDescription}</p>

          <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {tour.duration}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              Up to {tour.maxGuests}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              SVG
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-gray-900">
                {tour.currency} ${tour.price}
              </span>
              <span className="text-xs text-gray-400 ml-1">/ person</span>
            </div>
            <span className="text-sm font-medium text-emerald-600 group-hover:underline">
              View details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
