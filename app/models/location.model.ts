export interface Location {
  latitude: number;
  longitude: number;
  name?: string;
  address?: string;
}

export interface LocationSearchResult {
  name: string;
  address: string;
  location: Location;
}