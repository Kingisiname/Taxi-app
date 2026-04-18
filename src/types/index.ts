export type BookingStatus = "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";
export type BookingType = "taxi" | "tour";
export type VehicleType = "sedan" | "suv" | "minibus" | "van";

export interface Location {
  id: string;
  name: string;
  parish: string;
  lat: number;
  lng: number;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  rating: number;
  totalTrips: number;
  vehicle: {
    make: string;
    model: string;
    year: number;
    type: VehicleType;
    color: string;
    plate: string;
    capacity: number;
  };
  photo: string;
  isAvailable: boolean;
}

export interface Tour {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  duration: string;
  maxGuests: number;
  price: number;
  currency: string;
  category: "nature" | "culture" | "beach" | "adventure" | "island_hopping" | "city";
  highlights: string[];
  includes: string[];
  meetingPoint: string;
  image: string;
  rating: number;
  reviewCount: number;
  available: boolean;
  tags: string[];
}

export interface TaxiBooking {
  id: string;
  type: "taxi";
  pickup: Location;
  dropoff: Location;
  pickupTime: string;
  passengers: number;
  notes: string;
  estimatedFare: number;
  driver?: Driver;
  status: BookingStatus;
  createdAt: string;
}

export interface TourBooking {
  id: string;
  type: "tour";
  tour: Tour;
  date: string;
  guests: number;
  totalPrice: number;
  driver?: Driver;
  status: BookingStatus;
  createdAt: string;
  specialRequests?: string;
}

export type Booking = TaxiBooking | TourBooking;

export interface FareEstimate {
  basefare: number;
  distance: number;
  distanceCost: number;
  total: number;
  currency: string;
}
