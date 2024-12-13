import { Geolocation } from '@nativescript/geolocation';

export class PermissionsService {
  static async ensureLocationPermission(): Promise<boolean> {
    const isEnabled = await Geolocation.isEnabled();
    if (!isEnabled) {
      try {
        await Geolocation.enableLocationRequest();
        return true;
      } catch (error) {
        console.error('Failed to enable location:', error);
        return false;
      }
    }
    return true;
  }
}