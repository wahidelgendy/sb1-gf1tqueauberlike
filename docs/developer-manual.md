# RideShare Developer Manual

## Table of Contents
1. [Project Structure](#project-structure)
2. [Setup and Installation](#setup-and-installation)
3. [Architecture](#architecture)
4. [Development Guidelines](#development-guidelines)
5. [Testing](#testing)
6. [Deployment](#deployment)

## Project Structure

```
app/
├── config/           # Configuration files
├── features/         # Feature modules
│   ├── home/        # Home screen feature
│   ├── ride/        # Ride management
│   └── search/      # Location search
├── models/          # Data models
├── services/        # Shared services
└── utils/           # Utility functions
```

## Setup and Installation

### Prerequisites
- Node.js 14+
- NativeScript CLI
- Android Studio (for Android development)
- Xcode (for iOS development)

### Development Environment Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   ns preview
   ```

## Architecture

### Core Components

1. **View Models**
   - Extend `Observable` from `@nativescript/core`
   - Handle UI logic and state management
   - Example:
   ```typescript
   export class HomeViewModel extends Observable {
     private _property: string;
     
     get property(): string {
       return this._property;
     }
     
     set property(value: string) {
       if (this._property !== value) {
         this._property = value;
         this.notifyPropertyChange('property', value);
       }
     }
   }
   ```

2. **Services**
   - Handle business logic
   - Manage API calls
   - Example:
   ```typescript
   export class LocationService {
     async getCurrentLocation(): Promise<Location> {
       // Implementation
     }
   }
   ```

3. **Models**
   - Define data structures
   - Use TypeScript interfaces
   - Example:
   ```typescript
   export interface Location {
     latitude: number;
     longitude: number;
     address?: string;
   }
   ```

### Best Practices

1. **File Naming**
   - Use kebab-case for files: `home-page.ts`
   - Use PascalCase for classes: `HomeViewModel`
   - Add type suffixes: `.model.ts`, `.service.ts`

2. **Code Organization**
   - One class per file
   - Group related features in modules
   - Keep services singleton
   - Use dependency injection

3. **Error Handling**
   ```typescript
   try {
     await this.service.operation();
   } catch (error) {
     console.error('Operation failed:', error);
     // Handle error appropriately
   }
   ```

## Testing

### Unit Tests
```typescript
describe('LocationService', () => {
  it('should get current location', async () => {
    // Test implementation
  });
});
```

### E2E Tests
```typescript
describe('Home Screen', () => {
  it('should display map', async () => {
    // Test implementation
  });
});
```

## Deployment

### Build Process
1. Generate release build:
   ```bash
   ns build android --release
   ns build ios --release
   ```

2. Sign the application:
   ```bash
   ns build android --release --key-store-path keystore.jks
   ```

### CI/CD Pipeline
- Use GitHub Actions for automation
- Run tests before deployment
- Automated versioning
- Distribution to app stores