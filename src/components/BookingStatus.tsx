import { BookingStatus } from "@/types";

const config: Record<BookingStatus, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-yellow-100 text-yellow-700" },
  confirmed: { label: "Confirmed", className: "bg-blue-100 text-blue-700" },
  in_progress: { label: "In Progress", className: "bg-emerald-100 text-emerald-700" },
  completed: { label: "Completed", className: "bg-gray-100 text-gray-600" },
  cancelled: { label: "Cancelled", className: "bg-red-100 text-red-600" },
};

interface Props {
  status: BookingStatus;
}

export default function BookingStatusBadge({ status }: Props) {
  const { label, className } = config[status];
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${className}`}>{label}</span>
  );
}
