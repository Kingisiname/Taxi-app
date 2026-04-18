import { Star, Car, Phone } from "lucide-react";
import { Driver } from "@/types";

const vehicleTypeLabel: Record<Driver["vehicle"]["type"], string> = {
  sedan: "Sedan",
  suv: "SUV",
  minibus: "Minibus",
  van: "Van",
};

interface Props {
  driver: Driver;
  compact?: boolean;
}

export default function DriverCard({ driver, compact = false }: Props) {
  const initials = driver.name
    .split(" ")
    .map(n => n[0])
    .join("");

  return (
    <div className={`bg-white rounded-xl border border-gray-100 shadow-sm ${compact ? "p-3" : "p-4"}`}>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-lg flex-shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-gray-900 truncate">{driver.name}</p>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                driver.isAvailable ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
              }`}
            >
              {driver.isAvailable ? "Available" : "Busy"}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-0.5 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
              {driver.rating}
            </span>
            <span>{driver.totalTrips.toLocaleString()} trips</span>
          </div>
        </div>
      </div>

      {!compact && (
        <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between text-sm">
          <div className="flex items-center gap-1.5 text-gray-600">
            <Car className="w-4 h-4" />
            <span>
              {driver.vehicle.color} {driver.vehicle.make} {driver.vehicle.model} ·{" "}
              {vehicleTypeLabel[driver.vehicle.type]}
            </span>
          </div>
          <span className="text-gray-400 font-mono text-xs">{driver.vehicle.plate}</span>
        </div>
      )}

      {!compact && (
        <a
          href={`tel:${driver.phone}`}
          className="mt-3 flex items-center justify-center gap-2 w-full py-2 border border-emerald-200 text-emerald-700 rounded-lg text-sm font-medium hover:bg-emerald-50 transition-colors"
        >
          <Phone className="w-4 h-4" />
          {driver.phone}
        </a>
      )}
    </div>
  );
}
