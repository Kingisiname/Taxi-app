import Link from "next/link";
import { Car, MapPin, Shield, Clock, Star, ChevronRight, Users, Leaf } from "lucide-react";
import { tours } from "@/data/tours";
import TourCard from "@/components/TourCard";

const features = [
  {
    icon: Clock,
    title: "Book in Minutes",
    description: "Request a taxi or tour instantly. Get confirmed in under 2 minutes.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Shield,
    title: "Verified Drivers",
    description: "All drivers are locally vetted, licensed, and insured for your peace of mind.",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: MapPin,
    title: "Island Experts",
    description: "Our drivers know every corner of St. Vincent and the Grenadines.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: Leaf,
    title: "Any Trip Size",
    description: "Short grocery run, airport transfer, or full-day tour — we handle it all.",
    color: "bg-purple-50 text-purple-600",
  },
];

const stats = [
  { value: "500+", label: "Happy Riders" },
  { value: "50+", label: "Local Drivers" },
  { value: "4.8★", label: "Average Rating" },
  { value: "24/7", label: "Available" },
];

const quickLinks = [
  { href: "/book", label: "Airport Transfer", icon: "✈️", desc: "Argyle International" },
  { href: "/book", label: "Grocery Run", icon: "🛒", desc: "We help you shop" },
  { href: "/tours/la-soufriere-hike", label: "Volcano Hike", icon: "🌋", desc: "La Soufrière" },
  { href: "/tours/bequia-day-trip", label: "Bequia Day Trip", icon: "⛵", desc: "Island hopping" },
  { href: "/tours/wallilabou-pirates", label: "Pirates Bay", icon: "🏴‍☠️", desc: "Wallilabou" },
  { href: "/tours/kingstown-city-tour", label: "City Tour", icon: "🏙️", desc: "Kingstown" },
];

const featuredTours = tours.filter(t =>
  ["la-soufriere-hike", "bequia-day-trip", "falls-of-baleine"].includes(t.id)
);

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              St. Vincent &amp; the Grenadines
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Taxis &amp; Tours,<br />
              <span className="text-emerald-300">Your Way</span>
            </h1>
            <p className="text-lg text-emerald-100 mb-8 leading-relaxed">
              Whether you need a quick grocery run, an airport transfer, or a guided tour of
              SVG&apos;s most stunning spots — SVG Rides connects you with trusted local drivers instantly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/book"
                className="bg-white text-emerald-700 font-semibold px-6 py-3 rounded-xl hover:bg-emerald-50 transition-colors text-center flex items-center justify-center gap-2"
              >
                <Car className="w-5 h-5" />
                Book a Taxi Now
              </Link>
              <Link
                href="/tours"
                className="border-2 border-white/30 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors text-center flex items-center justify-center gap-2"
              >
                <MapPin className="w-5 h-5" />
                Explore Tours
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="border-t border-white/10 bg-black/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {stats.map(s => (
                <div key={s.label}>
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-xs text-emerald-200">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick book */}
      <section className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Quick Book
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {quickLinks.map(q => (
              <Link
                key={q.label}
                href={q.href}
                className="bg-white rounded-xl p-4 text-center border border-gray-100 hover:border-emerald-200 hover:shadow-sm transition-all group"
              >
                <span className="text-3xl mb-2 block">{q.icon}</span>
                <p className="font-medium text-sm text-gray-800 group-hover:text-emerald-700 transition-colors">
                  {q.label}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{q.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Why SVG Rides?</h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Built for St. Vincent — by people who love this island.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(f => (
            <div key={f.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${f.color}`}>
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured tours */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Popular Tours</h2>
              <p className="text-gray-500 mt-1">Discover the best of St. Vincent &amp; the Grenadines</p>
            </div>
            <Link
              href="/tours"
              className="hidden sm:flex items-center gap-1 text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
            >
              View all tours <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTours.map(tour => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
          <div className="mt-6 text-center sm:hidden">
            <Link href="/tours" className="text-emerald-600 font-medium hover:text-emerald-700">
              View all tours →
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">What People Say</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              name: "Sarah T.",
              origin: "UK Tourist",
              text: "Our driver Marcus knew every hidden gem on the island. The La Soufrière hike was incredible — couldn't have done it without SVG Rides!",
              rating: 5,
            },
            {
              name: "James W.",
              origin: "Local Resident",
              text: "I use SVG Rides for everything — grocery runs, taking the kids to school, airport trips. Reliable, friendly, and always on time.",
              rating: 5,
            },
            {
              name: "Maria C.",
              origin: "Canadian Visitor",
              text: "Booked the Bequia day trip through the app and it was seamless. Our guide was fantastic and the island was just magical.",
              rating: 5,
            },
          ].map(r => (
            <div key={r.name} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{r.name}</p>
                <p className="text-xs text-gray-400">{r.origin}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Driver CTA */}
      <section className="bg-emerald-700 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Are you a driver?</h2>
            <p className="text-emerald-200 max-w-md">
              Join SVG Rides and start earning. Set your own hours, accept the trips you want,
              and be your own boss across St. Vincent and the Grenadines.
            </p>
          </div>
          <Link
            href="/driver"
            className="bg-white text-emerald-700 font-semibold px-8 py-3 rounded-xl hover:bg-emerald-50 transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <Users className="w-5 h-5" />
            Drive with Us
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <div className="bg-emerald-600 rounded-lg p-1.5">
              <Car className="w-4 h-4" />
            </div>
            SVG Rides
          </div>
          <p className="text-sm text-center">
            © {new Date().getFullYear()} SVG Rides · St. Vincent &amp; the Grenadines
          </p>
          <div className="flex gap-4 text-sm">
            <Link href="/book" className="hover:text-white transition-colors">Book</Link>
            <Link href="/tours" className="hover:text-white transition-colors">Tours</Link>
            <Link href="/driver" className="hover:text-white transition-colors">Drivers</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
