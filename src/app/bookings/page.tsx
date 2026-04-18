"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Car, MapPin, Calendar, ChevronRight, Loader2 } from "lucide-react";
import BookingStatusBadge from "@/components/BookingStatus";
import { BookingStatus } from "@/types";
import { getLocationById } from "@/data/locations";
import { getTourById } from "@/data/tours";

interface RawBooking {
  id: string;
  type: "taxi" | "tour";
  status: BookingStatus;
  pickupId?: string;
  dropoffId?: string;
  pickupTime?: string;
  passengers?: number;
  fareEstimate?: number;
  tourId?: string;
  tourDate?: string;
  guests?: number;
  totalPrice?: number;
  driverName?: string;
  createdAt: string;
}

function bookingTitle(b: RawBooking): string {
  if (b.type === "taxi") {
    const from = b.pickupId ? getLocationById(b.pickupId)?.name : "?";
    const to = b.dropoffId ? getLocationById(b.dropoffId)?.name : "?";
    return `${from} → ${to}`;
  }
  return b.tourId ? (getTourById(b.tourId)?.title ?? "Tour") : "Tour";
}

function bookingSubtitle(b: RawBooking): string {
  if (b.type === "taxi") return `${b.passengers ?? 1} passenger${(b.passengers ?? 1) !== 1 ? "s" : ""}${b.driverName ? ` · ${b.driverName}` : ""}`;
  return `${b.guests ?? 1} guest${(b.guests ?? 1) !== 1 ? "s" : ""}${b.driverName ? ` · ${b.driverName}` : ""}`;
}

function bookingDate(b: RawBooking): string {
  const d = b.type === "taxi" ? b.pickupTime : b.tourDate;
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function bookingAmount(b: RawBooking): string {
  const amt = b.type === "taxi" ? b.fareEstimate : b.totalPrice;
  return amt ? `XCD $${amt.toFixed(2)}` : "—";
}

function bookingIcon(b: RawBooking): string {
  if (b.type === "tour") {
    const id = b.tourId ?? "";
    if (id.includes("soufriere")) return "🌋";
    if (id.includes("bequia")) return "⛵";
    if (id.includes("baleine") || id.includes("dark-view")) return "💧";
    if (id.includes("wallilabou")) return "🏴‍☠️";
    return "🗺️";
  }
  if (b.dropoffId === "airport" || b.pickupId === "airport") return "✈️";
  return "🚕";
}

function BookingRow({ booking }: { booking: RawBooking }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-2xl flex-shrink-0">
        {bookingIcon(booking)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-semibold text-gray-900 text-sm truncate">{bookingTitle(booking)}</p>
          <BookingStatusBadge status={booking.status} />
        </div>
        <p className="text-xs text-gray-500 mt-0.5">{bookingSubtitle(booking)}</p>
        <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
          <Calendar className="w-3 h-3" />
          {bookingDate(booking)}
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="font-semibold text-sm text-gray-900">{bookingAmount(booking)}</p>
        <p className="text-xs text-gray-400 capitalize mt-0.5">{booking.type}</p>
      </div>
    </div>
  );
}

export default function BookingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState<RawBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/bookings");
      return;
    }
    if (status === "authenticated") {
      fetch("/api/bookings")
        .then(r => r.json())
        .then(data => { setBookings(data); setLoading(false); })
        .catch(() => setLoading(false));
    }
  }, [status, router]);

  const upcoming = bookings.filter(b => ["pending", "confirmed", "in_progress"].includes(b.status));
  const past = bookings.filter(b => ["completed", "cancelled"].includes(b.status));

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">My Bookings</h1>
        <p className="text-gray-500 mb-8">
          Hello {session?.user?.name?.split(" ")[0]} — your upcoming and past rides &amp; tours.
        </p>

        {/* Upcoming */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Upcoming ({upcoming.length})
          </h2>
          {upcoming.length > 0 ? (
            <div className="space-y-3">
              {upcoming.map(b => <BookingRow key={b.id} booking={b} />)}
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
        {past.length > 0 && (
          <section className="mb-8">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Past ({past.length})
            </h2>
            <div className="space-y-3">
              {past.map(b => <BookingRow key={b.id} booking={b} />)}
            </div>
          </section>
        )}

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
