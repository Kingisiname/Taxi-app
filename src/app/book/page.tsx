"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Car, MapPin, Clock, Users, ArrowRight, ChevronLeft, CheckCircle, Info } from "lucide-react";
import { locations, estimateFare } from "@/data/locations";
import { availableDrivers } from "@/data/drivers";
import DriverCard from "@/components/DriverCard";

type Step = "details" | "confirm" | "booked";

export default function BookPage() {
  const [step, setStep] = useState<Step>("details");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [notes, setNotes] = useState("");
  const [selectedDriver, setSelectedDriver] = useState(availableDrivers[0]?.id ?? "");

  const pickupLoc = locations.find(l => l.id === pickup);
  const dropoffLoc = locations.find(l => l.id === dropoff);

  const fareEstimate = useMemo(() => {
    if (pickupLoc && dropoffLoc) return estimateFare(pickupLoc, dropoffLoc);
    return null;
  }, [pickupLoc, dropoffLoc]);

  const driver = availableDrivers.find(d => d.id === selectedDriver);

  const canProceed = pickup && dropoff && pickup !== dropoff && date && time;

  const today = new Date().toISOString().split("T")[0];

  if (step === "booked") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Ride Confirmed!</h1>
          <p className="text-gray-500 mb-6">
            Your driver will meet you at <strong>{pickupLoc?.name}</strong> on {date} at {time}.
          </p>
          {driver && (
            <div className="mb-6">
              <DriverCard driver={driver} />
            </div>
          )}
          {fareEstimate && (
            <div className="bg-emerald-50 rounded-xl p-4 mb-6 text-left">
              <p className="text-sm text-gray-600 mb-1">Estimated fare</p>
              <p className="text-2xl font-bold text-emerald-700">
                XCD ${fareEstimate.total.toFixed(2)}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {fareEstimate.distance} km · Pay your driver on completion
              </p>
            </div>
          )}
          <div className="flex flex-col gap-3">
            <Link
              href="/bookings"
              className="bg-emerald-600 text-white py-3 rounded-xl font-medium hover:bg-emerald-700 transition-colors"
            >
              View My Bookings
            </Link>
            <button
              onClick={() => {
                setStep("details");
                setPickup("");
                setDropoff("");
                setDate("");
                setTime("");
                setNotes("");
              }}
              className="border border-gray-200 text-gray-600 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Book Another Ride
            </button>
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

          <h1 className="text-2xl font-bold text-gray-900 mb-6">Confirm Your Booking</h1>

          {/* Trip summary */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-4">
            <h2 className="font-semibold text-gray-700 mb-4 text-sm uppercase tracking-wide">Trip Details</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Pickup</p>
                  <p className="font-medium text-gray-900">{pickupLoc?.name}</p>
                  <p className="text-xs text-gray-400">{pickupLoc?.parish}</p>
                </div>
              </div>
              <div className="ml-1.5 border-l-2 border-dashed border-gray-200 h-4" />
              <div className="flex items-start gap-3">
                <MapPin className="w-3 h-3 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Drop-off</p>
                  <p className="font-medium text-gray-900">{dropoffLoc?.name}</p>
                  <p className="text-xs text-gray-400">{dropoffLoc?.parish}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-50 grid grid-cols-3 gap-3 text-center text-sm">
              <div>
                <p className="text-gray-400 text-xs">Date</p>
                <p className="font-medium text-gray-800">{date}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Time</p>
                <p className="font-medium text-gray-800">{time}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Passengers</p>
                <p className="font-medium text-gray-800">{passengers}</p>
              </div>
            </div>
            {notes && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                <span className="font-medium">Notes: </span>{notes}
              </div>
            )}
          </div>

          {/* Fare */}
          {fareEstimate && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-4">
              <h2 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide">Fare Estimate</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Base fare</span>
                  <span>XCD ${fareEstimate.baseFare.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Distance ({fareEstimate.distance} km)</span>
                  <span>XCD ${(fareEstimate.total - fareEstimate.baseFare).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span className="text-emerald-700">XCD ${fareEstimate.total.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-400">
                <Info className="w-3.5 h-3.5" />
                Cash payment to driver on completion
              </div>
            </div>
          )}

          {/* Driver */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
            <h2 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide">Your Driver</h2>
            {driver && <DriverCard driver={driver} />}
          </div>

          <button
            onClick={() => setStep("booked")}
            className="w-full bg-emerald-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
          >
            Confirm Booking <CheckCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto px-4 py-8">
        <Link href="/" className="flex items-center gap-1 text-gray-500 hover:text-gray-700 mb-6 text-sm">
          <ChevronLeft className="w-4 h-4" /> Home
        </Link>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Book a Taxi</h1>
          <p className="text-gray-500 mt-1">
            Rides across St. Vincent &amp; the Grenadines, any time of day.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-4 space-y-4">
          {/* Pickup */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                Pickup Location
              </span>
            </label>
            <select
              value={pickup}
              onChange={e => setPickup(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              <option value="">Select pickup location…</option>
              {locations.map(l => (
                <option key={l.id} value={l.id}>
                  {l.name} — {l.parish}
                </option>
              ))}
            </select>
          </div>

          {/* Dropoff */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                Drop-off Location
              </span>
            </label>
            <select
              value={dropoff}
              onChange={e => setDropoff(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              <option value="">Select drop-off location…</option>
              {locations
                .filter(l => l.id !== pickup)
                .map(l => (
                  <option key={l.id} value={l.id}>
                    {l.name} — {l.parish}
                  </option>
                ))}
            </select>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  Date
                </span>
              </label>
              <input
                type="date"
                min={today}
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  Time
                </span>
              </label>
              <input
                type="time"
                value={time}
                onChange={e => setTime(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Passengers */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-gray-400" />
                Passengers
              </span>
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setPassengers(Math.max(1, passengers - 1))}
                className="w-10 h-10 rounded-full border border-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-50 transition-colors text-lg font-medium"
              >
                −
              </button>
              <span className="text-lg font-semibold text-gray-900 w-8 text-center">{passengers}</span>
              <button
                type="button"
                onClick={() => setPassengers(Math.min(12, passengers + 1))}
                className="w-10 h-10 rounded-full border border-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-50 transition-colors text-lg font-medium"
              >
                +
              </button>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Notes <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="e.g. I have luggage, wheelchair access needed, picking up at lobby…"
              rows={2}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            />
          </div>
        </div>

        {/* Fare preview */}
        {fareEstimate && (
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-emerald-700 font-medium">Estimated Fare</p>
              <p className="text-xs text-emerald-600">{fareEstimate.distance} km · cash on delivery</p>
            </div>
            <p className="text-2xl font-bold text-emerald-700">XCD ${fareEstimate.total.toFixed(2)}</p>
          </div>
        )}

        {/* Driver select */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
          <h2 className="font-semibold text-gray-700 mb-3 text-sm">Available Drivers</h2>
          <div className="space-y-2">
            {availableDrivers.map(d => (
              <label
                key={d.id}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer border transition-colors ${
                  selectedDriver === d.id
                    ? "border-emerald-300 bg-emerald-50"
                    : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="driver"
                  value={d.id}
                  checked={selectedDriver === d.id}
                  onChange={() => setSelectedDriver(d.id)}
                  className="accent-emerald-600"
                />
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-900">{d.name}</p>
                  <p className="text-xs text-gray-500">
                    {d.vehicle.color} {d.vehicle.make} {d.vehicle.model} · ⭐ {d.rating}
                  </p>
                </div>
                <span className="text-xs text-gray-400 font-mono">{d.vehicle.plate}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          disabled={!canProceed}
          onClick={() => setStep("confirm")}
          className="w-full bg-emerald-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Car className="w-5 h-5" />
          Continue
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
