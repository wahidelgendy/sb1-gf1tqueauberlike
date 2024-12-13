import { Location } from '../../models/location.model';

export class SearchService {
  // Simulated location data for demonstration
  private readonly mockLocations: Location[] = [
    {
      name: 'Central Park',
      address: 'New York, NY 10022',
      latitude: 40.7829,
      longitude: -73.9654
    },
    {
      name: 'Times Square',
      address: 'Manhattan, NY 10036',
      latitude: 40.7580,
      longitude: -73.9855
    }
  ];

  async searchLocations(query: string): Promise<Location[]> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Filter mock locations based on search query
    return this.mockLocations.filter(location => 
      location.name.toLowerCase().includes(query.toLowerCase()) ||
      location.address.toLowerCase().includes(query.toLowerCase())
    );
  }
}