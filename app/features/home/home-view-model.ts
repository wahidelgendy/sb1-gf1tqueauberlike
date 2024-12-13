import { Observable } from '@nativescript/core';
import { LocationService } from '../../services/location.service';
import { RideService } from '../ride/ride.service';
import { Location } from '../../models/location.model';
import { MAPS_CONFIG } from '../../config/maps.config';
import { NavigationUtil } from '../../utils/navigation.util';

export class HomeViewModel extends Observable {
  private locationService: LocationService;
  private rideService: RideService;
  private _userLocation: Location;
  private _destinationLocation: Location;
  private _canRequestRide: boolean = false;
  private _destinationAddress: string = '';
  private _requestButtonText: string = 'Request Ride';
  private _mapZoom: number = MAPS_CONFIG.zoom;

  constructor() {
    super();
    this.locationService = new LocationService();
    this.rideService = new RideService();
    this.initializeLocation();
  }

  get userLocation(): Location {
    return this._userLocation || MAPS_CONFIG.defaultLocation;
  }

  get canRequestRide(): boolean {
    return this._canRequestRide;
  }

  get destinationAddress(): string {
    return this._destinationAddress;
  }

  get requestButtonText(): string {
    return this._requestButtonText;
  }

  get mapZoom(): number {
    return this._mapZoom;
  }

  private async initializeLocation() {
    try {
      const location = await this.locationService.getCurrentLocation();
      if (location) {
        this._userLocation = location;
        this.notifyPropertyChange('userLocation', this._userLocation);
      }
    } catch (error) {
      console.error('Failed to initialize location:', error);
    }
  }

  onDestinationTap() {
    NavigationUtil.navigate('search');
  }

  async onRequestRide() {
    if (!this._userLocation || !this._destinationLocation) {
      return;
    }

    this._requestButtonText = 'Requesting...';
    this.notifyPropertyChange('requestButtonText', this._requestButtonText);

    try {
      const success = await this.rideService.requestRide({
        pickupLocation: this._userLocation,
        dropoffLocation: this._destinationLocation,
        timestamp: new Date()
      });

      this._requestButtonText = success ? 'Ride Requested!' : 'Request Failed';
    } catch (error) {
      this._requestButtonText = 'Try Again';
    }

    this.notifyPropertyChange('requestButtonText', this._requestButtonText);
    setTimeout(() => {
      this._requestButtonText = 'Request Ride';
      this.notifyPropertyChange('requestButtonText', this._requestButtonText);
    }, 2000);
  }

  // Handle location selection from search page
  onLocationSelected(location: Location) {
    this._destinationLocation = location;
    this._destinationAddress = location.address || '';
    this._canRequestRide = true;
    
    this.notifyPropertyChange('destinationAddress', this._destinationAddress);
    this.notifyPropertyChange('canRequestRide', this._canRequestRide);
  }
}