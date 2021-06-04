import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '../models/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  getLocations(): Observable<Location[]>{
    return this.http.get<Location[]>("https://biot-api.azurewebsites.net/api/Locations");
  }

  getLocation(id: number): Observable<Location>{
    return this.http.get<Location>("https://biot-api.azurewebsites.net/api/Locations/" + id);
  }

  updateLocation(id: number, location: Location){
    return this.http.put<Location>("https://biot-api.azurewebsites.net/api/Locations/" + id, location)
  }

  addLocation(location: Location){
    return this.http.post<Location>("https://biot-api.azurewebsites.net/api/Locations" , location);
  }

  deleteLocation(id: number){
    return this.http.delete<Location>("https://biot-api.azurewebsites.net/api/Locations/" + id)
  }
}
