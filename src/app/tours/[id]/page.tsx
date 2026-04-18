"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Clock,
  Users,
  Star,
  MapPin,
  CheckCircle,
  ChevronLeft,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { getTourById, categoryLabels } from "@/data/tours";
import { availableDrivers } from "@/data/drivers";
import DriverCard from "@/components/DriverCard";

type Step = "details" | "confirm" | "booked";

export default function TourDetailPage() {
  const { id } = useParams<{ id: string }>();
  const tour = getTourById(id);

  const [step, setStep] = useState<Step>("details");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [requests, setRequests] = useState("");
  const [selectedDriver] = useState(availableDrivers[0]?.id ?? "");

  const today = new Date().toISOString().split("T")[0];
  const { data: session } = useSession();
  const router = useRouter();
  const driver = availableDrivers.find(d => d.id === selectedDriver);
  const totalPrice = tour ? tour.price * guests : 0;

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">🗺️</p>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Tour Not Found</h1>
          <Link href="/tours" className="text-emerald-600 hover:underline">
            Browse all tours →
          </Link>
        </div>
      </div>
    );
  }

  if (step === "booked") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Tour Booked!</h1>
          <p className="text-gray-500 mb-2">
            <strong>{tour.title}</strong>
          </p>
          <p className="text-gray-400 text-sm mb-6">
            {guests} guest{guests !== 1 ? "s" : ""} · {date} · Meet at {tour.meetingPoint}
          </p>
          {driver && (
            <div className="mb-6">
              <DriverCard driver={driver} />
            </div>
          )}
          <div className="bg-emerald-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-500">Total paid</p>
            <p className="text-3xl font-bold text-emerald-700">
              {tour.currency} ${totalPrice}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              href="/bookings"
              className="bg-emerald-600 text-white py-3 rounded-xl font-medium hover:bg-emerald-700 transition-colors"
            >
              View My Bookings
            </Link>
            <Link
              href="/tours"
              className="border border-gray-200 text-gray-600 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Explore More Tours
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (step === "confirm") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-lg mx-auto px-4 py-8">
          <button
            onClick={() => setStep("details")}
            className="flex items-center gap-1 text-gray-500 hover:text-gray-700 mb-6 text-sm"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Confirm Booking</h1>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-4">
            <h2 className="font-semibold text-sm text-gray-500 uppercase tracking-wide mb-3">Tour</h2>
            <p className="font-semibold text-gray-900">{tour.title}</p>
            <p className="text-sm text-gray-500 mt-1">{tour.shortDescription}</p>
            <div className="mt-3 pt-3 border-t border-gray-50 grid grid-cols-3 gap-2 text-center text-sm">
              <div>
                <p className="text-gray-400 text-xs">Date</p>
                <p className="font-medium">{date}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Guests</p>
                <p className="font-medium">{guests}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Duration</p>
                <p className="font-medium text-xs">{tour.duration}</p>
              </div>
            </div>
            {requests && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                <span className="font-medium">Special requests: </span>{requests}
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-4">
            <h2 className="font-semibold text-sm text-gray-500 uppercase tracking-wide mb-3">Price</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>
                  {tour.currency} ${tour.price} × {guests} guest{guests !== 1 ? "s" : ""}
                </span>
                <span>
                  {tour.currency} ${totalPrice}
                </span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-100">
                <span>Total</span>
                <span className="text-emerald-700">
                  {tour.currency} ${totalPrice}
                </span>
              </div>
            </div>
          </div>

          {driver && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
              <h2 className="font-semibold text-sm text-gray-500 uppercase tracking-wide mb-3">Guide / Driver</h2>
              <DriverCard driver={driver} />
            </div>
          )}

          <button
            onClick={async () => {
              if (!session) { router.push(`/login?callbackUrl=/tours/${id}`); return; }
              await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  type: "tour",
                  tourId: tour.id,
                  tourDate: date,
                  guests,
                  totalPrice,
                  notes: requests,
                  driverName: driver?.name ?? "",
                }),
              });
              setStep("booked");
            }}
            className="w-full bg-emerald-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
          >
            Confirm &amp; Book <CheckCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  // Details / booking form
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-500 to-teal-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          <Link
            href="/tours"
            className="flex items-center gap-1 text-emerald-100 hover:text-white mb-4 text-sm w-fit"
          >
            <ChevronLeft className="w-4 h-4" /> All Tours
          </Link>
          <span className="text-xs font-medium bg-white/20 px-3 py-1 rounded-full">
            {categoryLabels[tour.category]}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mt-3 mb-2">{tour.title}</h1>
          <div className="flex items-center gap-4 text-emerald-100 text-sm">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              {tour.rating} ({tour.reviewCount} reviews)
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> {tour.duration}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" /> Max {tour.maxGuests}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: tour info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-semibold text-gray-900 mb-3">About This Tour</h2>
              <p className="text-gray-600 leading-relaxed">{tour.description}</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-semibold text-gray-900 mb-3">Highlights</h2>
              <ul className="space-y-2">
                {tour.highlights.map(h => (
                  <li key={h} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-semibold text-gray-900 mb-3">What&apos;s Included</h2>
              <div className="flex flex-wrap gap-2">
                {tour.includes.map(item => (
                  <span
                    key={item}
                    className="bg-emerald-50 text-emerald-700 text-sm px-3 py-1 rounded-full"
                  >
                    ✓ {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-semibold text-gray-900 mb-2">Meeting Point</h2>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4 text-emerald-500" />
                {tour.meetingPoint}
              </div>
            </div>
          </div>

          {/* Right: booking form */}
          <div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-20">
              <div className="mb-4">
                <span className="text-2xl font-bold text-gray-900">
                  {tour.currency} ${tour.price}
                </span>
                <span className="text-gray-400 text-sm ml-1">/ person</span>
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" /> Date
                    </span>
                  </label>
                  <input
                    type="date"
                    min={today}
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-gray-400" /> Guests
                    </span>
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="w-9 h-9 rounded-full border border-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-50 text-lg"
                    >
                      −
                    </button>
                    <span className="text-lg font-semibold w-6 text-center">{guests}</span>
                    <button
                      type="button"
                      onClick={() => setGuests(Math.min(tour.maxGuests, guests + 1))}
                      className="w-9 h-9 rounded-full border border-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-50 text-lg"
                    >
                      +
                    </button>
                    <span className="text-xs text-gray-400">max {tour.maxGuests}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Requests{" "}
                    <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <textarea
                    value={requests}
                    onChange={e => setRequests(e.target.value)}
                    rows={2}
                    placeholder="Dietary needs, accessibility…"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                  />
                </div>
              </div>

              {guests > 0 && (
                <div className="flex justify-between text-sm mb-4 border-t border-gray-50 pt-3">
                  <span className="text-gray-500">
                    ${tour.price} × {guests}
                  </span>
                  <span className="font-semibold text-gray-900">
                    {tour.currency} ${totalPrice}
                  </span>
                </div>
              )}

              <button
                disabled={!date}
                onClick={() => setStep("confirm")}
                className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Book Now <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-xs text-gray-400 text-center mt-2">No payment required now · Pay on the day</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
