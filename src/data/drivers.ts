import { Driver } from "@/types";

export const drivers: Driver[] = [
  {
    id: "d1",
    name: "Marcus James",
    phone: "+1 784 455 1234",
    rating: 4.9,
    totalTrips: 842,
    vehicle: {
      make: "Toyota",
      model: "Hiace",
      year: 2020,
      type: "minibus",
      color: "White",
      plate: "SVG 1042",
      capacity: 12,
    },
    photo: "",
    isAvailable: true,
  },
  {
    id: "d2",
    name: "Keisha Providence",
    phone: "+1 784 456 5678",
    rating: 4.8,
    totalTrips: 521,
    vehicle: {
      make: "Toyota",
      model: "Camry",
      year: 2022,
      type: "sedan",
      color: "Silver",
      plate: "SVG 2318",
      capacity: 4,
    },
    photo: "",
    isAvailable: true,
  },
  {
    id: "d3",
    name: "Devon Williams",
    phone: "+1 784 457 9012",
    rating: 4.7,
    totalTrips: 1203,
    vehicle: {
      make: "Nissan",
      model: "X-Trail",
      year: 2019,
      type: "suv",
      color: "Black",
      plate: "SVG 0874",
      capacity: 5,
    },
    photo: "",
    isAvailable: false,
  },
  {
    id: "d4",
    name: "Tamara Baptiste",
    phone: "+1 784 458 3456",
    rating: 4.9,
    totalTrips: 389,
    vehicle: {
      make: "Toyota",
      model: "Land Cruiser",
      year: 2021,
      type: "suv",
      color: "White",
      plate: "SVG 3561",
      capacity: 7,
    },
    photo: "",
    isAvailable: true,
  },
];

export const availableDrivers = drivers.filter(d => d.isAvailable);

export const getDriverById = (id: string) => drivers.find(d => d.id === id);
