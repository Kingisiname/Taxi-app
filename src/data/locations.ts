import { Location } from "@/types";

export const locations: Location[] = [
  { id: "kingstown", name: "Kingstown", parish: "St. George", lat: 13.1600, lng: -61.2248 },
  { id: "villa", name: "Villa", parish: "St. George", lat: 13.1492, lng: -61.2013 },
  { id: "calliaqua", name: "Calliaqua", parish: "St. George", lat: 13.1417, lng: -61.1958 },
  { id: "arnos-vale", name: "Arnos Vale", parish: "St. George", lat: 13.1431, lng: -61.2131 },
  { id: "kingstown-park", name: "Kingstown Park", parish: "St. George", lat: 13.1611, lng: -61.2181 },
  { id: "edinburgh", name: "Edinburgh", parish: "St. George", lat: 13.1719, lng: -61.2219 },
  { id: "mesopotamia", name: "Mesopotamia", parish: "St. Andrew", lat: 13.2244, lng: -61.1481 },
  { id: "georgetown", name: "Georgetown", parish: "St. Andrew", lat: 13.2683, lng: -61.1219 },
  { id: "biabou", name: "Biabou", parish: "St. Andrew", lat: 13.2128, lng: -61.1303 },
  { id: "colonarie", name: "Colonarie", parish: "St. Andrew", lat: 13.2344, lng: -61.1278 },
  { id: "chateaubelair", name: "Chateaubelair", parish: "St. David", lat: 13.2997, lng: -61.2411 },
  { id: "barrouallie", name: "Barrouallie", parish: "St. Patrick", lat: 13.2317, lng: -61.2694 },
  { id: "layou", name: "Layou", parish: "St. Patrick", lat: 13.1983, lng: -61.2614 },
  { id: "richmond", name: "Richmond", parish: "St. David", lat: 13.3239, lng: -61.2436 },
  { id: "owia", name: "Owia", parish: "St. Patrick", lat: 13.3739, lng: -61.1528 },
  { id: "fancy", name: "Fancy", parish: "St. Patrick", lat: 13.3867, lng: -61.1561 },
  { id: "wallilabou", name: "Wallilabou", parish: "St. Patrick", lat: 13.2547, lng: -61.2681 },
  { id: "montreal", name: "Montreal Gardens", parish: "St. Andrew", lat: 13.2422, lng: -61.1556 },
  { id: "airport", name: "Argyle International Airport", parish: "St. George", lat: 13.1567, lng: -61.1497 },
  { id: "ferry-terminal", name: "Kingstown Ferry Terminal", parish: "St. George", lat: 13.1581, lng: -61.2286 },
];

export const popularPickups = locations.filter(l =>
  ["kingstown", "airport", "villa", "arnos-vale", "ferry-terminal"].includes(l.id)
);

export const getLocationById = (id: string) => locations.find(l => l.id === id);

export const calculateDistance = (from: Location, to: Location): number => {
  const R = 6371;
  const dLat = ((to.lat - from.lat) * Math.PI) / 180;
  const dLon = ((to.lng - from.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((from.lat * Math.PI) / 180) *
      Math.cos((to.lat * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

export const estimateFare = (from: Location, to: Location) => {
  const distance = calculateDistance(from, to);
  const baseFare = 10;
  const perKm = 3.5;
  const total = Math.round((baseFare + distance * perKm) * 100) / 100;
  return { baseFare, distance: Math.round(distance * 10) / 10, total, currency: "XCD" };
};
