import { Observable } from '@nativescript/core';
import { SearchService } from './search.service';
import { Location } from '../../models/location.model';

export class SearchViewModel extends Observable {
  private searchService: SearchService;
  private _searchQuery: string = '';
  private _searchResults: Location[] = [];

  constructor() {
    super();
    this.searchService = new SearchService();
  }

  get searchQuery(): string {
    return this._searchQuery;
  }

  set searchQuery(value: string) {
    if (this._searchQuery !== value) {
      this._searchQuery = value;
      this.notifyPropertyChange('searchQuery', value);
    }
  }

  get searchResults(): Location[] {
    return this._searchResults;
  }

  set searchResults(value: Location[]) {
    if (this._searchResults !== value) {
      this._searchResults = value;
      this.notifyPropertyChange('searchResults', value);
    }
  }

  async onSearch() {
    if (!this._searchQuery.trim()) return;
    
    try {
      this.searchResults = await this.searchService.searchLocations(this._searchQuery);
    } catch (error) {
      console.error('Search failed:', error);
      this.searchResults = [];
    }
  }

  onSearchTextChange(args: any) {
    this.searchQuery = args.value;
    if (this.searchQuery.length >= 3) {
      this.onSearch();
    }
  }

  onLocationSelected(args: any) {
    const selectedLocation = this._searchResults[args.index];
    // Notify the home page about the selected location
    // Implementation will depend on your navigation/state management strategy
  }
}