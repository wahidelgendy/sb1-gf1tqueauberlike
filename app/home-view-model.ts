import { Observable } from '@nativescript/core';
import { LocationService } from './services/location.service';
import { Location } from './models/location.model';

export class HomeViewModel extends Observable {
  private locationService: LocationService;
  private _userLocation: Location;
  private _destinationLocation: Location;
  private _canRequestRide: boolean = false;

  constructor() {
    super();
    this.locationService = new LocationService();
    this.initializeLocation();
  }

  get userLocation(): Location {
    return this._userLocation;
  }

  get canRequestRide(): boolean {
    return this._canRequestRide;
  }

  private async initializeLocation() {
    try {
      this._userLocation = await this.locationService.getCurrentLocation();
      this.notifyPropertyChange('userLocation', this._userLocation);
    } catch (error) {
      console.error('Failed to get location:', error);
    }
  }

  onDestinationTap() {
    // TODO: Implement Google Places search
    console.log('Opening destination search...');
  }

  onRequestRide() {
    // TODO: Implement ride request logic
    console.log('Requesting ride...');
  }
}