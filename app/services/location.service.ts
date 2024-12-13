import { Geolocation } from '@nativescript/geolocation';
import { Location } from '../models/location.model';
import { PermissionsService } from './permissions.service';

export class LocationService {
  async getCurrentLocation(): Promise<Location | null> {
    const hasPermission = await PermissionsService.ensureLocationPermission();
    if (!hasPermission) {
      return null;
    }

    try {
      const location = await Geolocation.getCurrentLocation({
        desiredAccuracy: 3,
        maximumAge: 5000,
        timeout: 10000
      });

      return {
        latitude: location.latitude,
        longitude: location.longitude
      };
    } catch (error) {
      console.error('Failed to get location:', error);
      return null;
    }
  }
}