"use client";

import Link from "next/link";
import { Car, MapPin, Calendar, Clock, ChevronRight } from "lucide-react";
import BookingStatusBadge from "@/components/BookingStatus";
import { BookingStatus } from "@/types";

interface MockBooking {
  id: string;
  type: "taxi" | "tour";
  title: string;
  subtitle: string;
  date: string;
  status: BookingStatus;
  amount: string;
  icon: string;
}

const mockBookings: MockBooking[] = [
  {
    id: "b1",
    type: "taxi",
    title: "Arnos Vale → Kingstown",
    subtitle: "1 passenger · Marcus James",
    date: "2026-04-20 · 09:00",
    status: "confirmed",
    amount: "XCD $24.50",
    icon: "🚕",
  },
  {
    id: "b2",
    type: "tour",
    title: "La Soufrière Volcano Hike",
    subtitle: "2 guests · Tamara Baptiste",
    date: "2026-04-22 · 07:00",
    status: "pending",
    amount: "XCD $300",
    icon: "🌋",
  },
  {
    id: "b3",
    type: "taxi",
    title: "Kingstown → Airport",
    subtitle: "2 passengers · Keisha Providence",
    date: "2026-04-18 · 14:30",
    status: "completed",
    amount: "XCD $18.00",
    icon: "✈️",
  },
  {
    id: "b4",
    type: "tour",
    title: "Bequia Day Trip",
    subtitle: "4 guests · Devon Williams",
    date: "2026-04-10 · 08:00",
    status: "completed",
    amount: "XCD $800",
    icon: "⛵",
  },
  {
    id: "b5",
    type: "taxi",
    title: "Villa → Mesopotamia",
    subtitle: "1 passenger",
    date: "2026-04-05 · 11:00",
    status: "cancelled",
    amount: "XCD $42.00",
    icon: "🚕",
  },
];

const upcoming = mockBookings.filter(b => ["pending", "confirmed", "in_progress"].includes(b.status));
const past = mockBookings.filter(b => ["completed", "cancelled"].includes(b.status));

function BookingRow({ booking }: { booking: MockBooking }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-2xl flex-shrink-0">
        {booking.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-semibold text-gray-900 text-sm truncate">{booking.title}</p>
          <BookingStatusBadge status={booking.status} />
        </div>
        <p className="text-xs text-gray-500 mt-0.5">{booking.subtitle}</p>
        <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {booking.date}
          </span>
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="font-semibold text-sm text-gray-900">{booking.amount}</p>
        <p className="text-xs text-gray-400 capitalize mt-0.5">{booking.type}</p>
      </div>
    </div>
  );
}

export default function BookingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">My Bookings</h1>
        <p className="text-gray-500 mb-8">Your upcoming and past rides &amp; tours.</p>

        {/* Upcoming */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Upcoming ({upcoming.length})
          </h2>
          {upcoming.length > 0 ? (
            <div className="space-y-3">
              {upcoming.map(b => (
                <BookingRow key={b.id} booking={b} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-8 text-center">
              <p className="text-3xl mb-2">📅</p>
              <p className="text-gray-600 font-medium">No upcoming bookings</p>
              <p className="text-sm text-gray-400 mt-1">Book a taxi or tour to get started</p>
            </div>
          )}
        </section>

        {/* Past */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Past ({past.length})
          </h2>
          {past.length > 0 ? (
            <div className="space-y-3">
              {past.map(b => (
                <BookingRow key={b.id} booking={b} />
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No past bookings yet.</p>
          )}
        </section>

        {/* CTA */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            href="/book"
            className="flex items-center justify-between bg-emerald-600 text-white rounded-xl p-4 hover:bg-emerald-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-lg p-2">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">Book a Taxi</p>
                <p className="text-xs text-emerald-100">Any trip, any time</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-emerald-100" />
          </Link>
          <Link
            href="/tours"
            className="flex items-center justify-between bg-teal-600 text-white rounded-xl p-4 hover:bg-teal-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-lg p-2">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">Explore Tours</p>
                <p className="text-xs text-teal-100">Guided experiences</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-teal-100" />
          </Link>
        </div>
      </div>
    </div>
  );
}
