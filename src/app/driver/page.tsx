"use client";

import { useState } from "react";
import { CheckCircle, Car, Star, Clock, DollarSign, MapPin, Users, ChevronRight, Phone } from "lucide-react";
import BookingStatusBadge from "@/components/BookingStatus";
import { BookingStatus } from "@/types";

interface IncomingJob {
  id: string;
  type: "taxi" | "tour";
  icon: string;
  title: string;
  pickup: string;
  dropoff?: string;
  time: string;
  passengers: number;
  fare: string;
  status: BookingStatus;
  passengerName: string;
  passengerPhone: string;
}

const jobs: IncomingJob[] = [
  {
    id: "j1",
    type: "taxi",
    icon: "🚕",
    title: "Taxi – Villa to Kingstown",
    pickup: "Villa",
    dropoff: "Kingstown",
    time: "Today, 10:00 AM",
    passengers: 2,
    fare: "XCD $22.00",
    status: "pending",
    passengerName: "Sarah T.",
    passengerPhone: "+1 784 455 8801",
  },
  {
    id: "j2",
    type: "tour",
    icon: "🌋",
    title: "La Soufrière Volcano Hike",
    pickup: "Kingstown (pickup)",
    time: "Tomorrow, 07:00 AM",
    passengers: 3,
    fare: "XCD $450",
    status: "confirmed",
    passengerName: "James W.",
    passengerPhone: "+1 784 456 2293",
  },
  {
    id: "j3",
    type: "taxi",
    icon: "✈️",
    title: "Airport Transfer",
    pickup: "Kingstown",
    dropoff: "Argyle International Airport",
    time: "Today, 02:30 PM",
    passengers: 1,
    fare: "XCD $30.00",
    status: "in_progress",
    passengerName: "Maria C.",
    passengerPhone: "+1 784 457 5510",
  },
];

const stats = [
  { label: "Today's Earnings", value: "XCD $142", icon: DollarSign, color: "text-emerald-600 bg-emerald-50" },
  { label: "Trips Today", value: "5", icon: Car, color: "text-blue-600 bg-blue-50" },
  { label: "Rating", value: "4.9 ★", icon: Star, color: "text-yellow-600 bg-yellow-50" },
  { label: "Online Hours", value: "6h 20m", icon: Clock, color: "text-purple-600 bg-purple-50" },
];

const perks = [
  "Set your own hours — work when you want",
  "Keep 85% of every fare",
  "Instant payment via local bank transfer",
  "Priority dispatch for tour bookings",
  "Free vehicle inspection & safety check",
  "Driver support 7 days a week",
];

export default function DriverPage() {
  const [isOnline, setIsOnline] = useState(true);
  const [jobStatuses, setJobStatuses] = useState<Record<string, BookingStatus>>(
    Object.fromEntries(jobs.map(j => [j.id, j.status]))
  );
  const [signupStep, setSignupStep] = useState<"info" | "form" | "done">("info");
  const [isDriver] = useState(true); // toggle to false to show sign-up flow

  const updateStatus = (id: string, status: BookingStatus) => {
    setJobStatuses(prev => ({ ...prev, [id]: status }));
  };

  if (!isDriver) {
    if (signupStep === "done") {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h1>
            <p className="text-gray-500">
              We&apos;ll review your application and get back to you within 24–48 hours.
              Welcome to SVG Rides!
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <div className="bg-gradient-to-br from-emerald-700 to-teal-800 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-4xl font-bold mb-3">Drive with SVG Rides</h1>
            <p className="text-xl text-emerald-100 mb-6 max-w-lg mx-auto">
              Earn money on your schedule. Be your own boss across St. Vincent &amp; the Grenadines.
            </p>
            <button
              onClick={() => setSignupStep("form")}
              className="bg-white text-emerald-700 font-semibold px-8 py-3 rounded-xl hover:bg-emerald-50 transition-colors"
            >
              Apply Now — It&apos;s Free
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {perks.map(p => (
              <div key={p} className="flex items-start gap-2.5 bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">{p}</p>
              </div>
            ))}
          </div>

          {signupStep === "form" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-lg mx-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Driver Application</h2>
              <div className="space-y-4">
                {[
                  { label: "Full Name", type: "text", placeholder: "Marcus James" },
                  { label: "Phone Number", type: "tel", placeholder: "+1 784 455 1234" },
                  { label: "Vehicle Make & Model", type: "text", placeholder: "Toyota Hiace" },
                  { label: "Licence Plate", type: "text", placeholder: "SVG 1234" },
                ].map(f => (
                  <div key={f.label}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                ))}
                <button
                  onClick={() => setSignupStep("done")}
                  className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
                >
                  Submit Application
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Driver dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Driver Dashboard</h1>
            <p className="text-gray-500 text-sm">Welcome back, Marcus!</p>
          </div>
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-colors ${
              isOnline
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isOnline ? "bg-white" : "bg-gray-400"}`} />
            {isOnline ? "Online" : "Offline"}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {stats.map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 ${s.color}`}>
                <s.icon className="w-4 h-4" />
              </div>
              <p className="text-xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Jobs */}
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Active &amp; Upcoming Jobs
        </h2>

        {!isOnline && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4 text-sm text-amber-700">
            You are currently offline. Go online to receive new jobs.
          </div>
        )}

        <div className="space-y-4">
          {jobs.map(job => {
            const status = jobStatuses[job.id];
            return (
              <div key={job.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{job.icon}</span>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{job.title}</p>
                      <p className="text-xs text-gray-500">{job.time}</p>
                    </div>
                  </div>
                  <BookingStatusBadge status={status} />
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{job.pickup}</span>
                  </div>
                  {job.dropoff && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-red-400" />
                      <span>{job.dropoff}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-gray-400" />
                    <span>{job.passengers} passenger{job.passengers !== 1 ? "s" : ""}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium text-emerald-700">
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>{job.fare}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                  <a
                    href={`tel:${job.passengerPhone}`}
                    className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-emerald-600 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    {job.passengerName} · {job.passengerPhone}
                  </a>

                  {status === "pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateStatus(job.id, "cancelled")}
                        className="text-xs border border-gray-200 text-gray-500 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Decline
                      </button>
                      <button
                        onClick={() => updateStatus(job.id, "confirmed")}
                        className="text-xs bg-emerald-600 text-white px-3 py-1.5 rounded-lg hover:bg-emerald-700 transition-colors"
                      >
                        Accept
                      </button>
                    </div>
                  )}
                  {status === "confirmed" && (
                    <button
                      onClick={() => updateStatus(job.id, "in_progress")}
                      className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1"
                    >
                      <Car className="w-3 h-3" /> Start Trip
                    </button>
                  )}
                  {status === "in_progress" && (
                    <button
                      onClick={() => updateStatus(job.id, "completed")}
                      className="text-xs bg-emerald-600 text-white px-3 py-1.5 rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-1"
                    >
                      <CheckCircle className="w-3 h-3" /> Complete
                    </button>
                  )}
                  {(status === "completed" || status === "cancelled") && (
                    <span className="text-xs text-gray-400 capitalize">{status}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
