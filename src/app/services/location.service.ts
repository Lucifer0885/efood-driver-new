import { inject, Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Socket } from 'ngx-socket-io';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  public socket = inject(Socket);
  public auth = inject(AuthService);

  public locationGranted = false;
  public location = {
    latitude: 0,
    longitude: 0,
  };

  constructor() { }

  public async checkLocationPermission() {
    const permission = await Geolocation.checkPermissions();
    this.locationGranted = permission.location === 'granted';
    if (this.locationGranted) {
      this.watchCurrentPosition();
    }
  }

  public async requestLocationPermission() {
    const {coords} = await Geolocation.getCurrentPosition();
    this.setLocation(coords);
    if (this.locationGranted) {
      this.watchCurrentPosition();
    }
  }

  public async watchCurrentPosition() {
    Geolocation.watchPosition(
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
      (position, err) => {
        if (err) {
          return;
        }
        this.setLocation(position?.coords);
      }
    );
  }

  public setLocation(coords?: { latitude: number; longitude: number }) {
    if (!coords || !coords.latitude || !coords.longitude) {
      return;
    }
    this.location.latitude = coords.latitude;
    this.location.longitude = coords.longitude;
    this.locationGranted = true;

    localStorage.setItem(
      'location',
      JSON.stringify(this.location)
    );

    this.socket.emit('driver-location', {
      driver_id: this.auth.user?.id,
      latitude: this.location.latitude,
      longitude: this.location.longitude,
    });
  }
}
