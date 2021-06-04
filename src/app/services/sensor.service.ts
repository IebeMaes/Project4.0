import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sensor } from '../models/sensor.model';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  constructor(private http: HttpClient) { }

  getSensors(): Observable<Sensor[]>{
    return this.http.get<Sensor[]>("https://biot-api.azurewebsites.net/api/Sensors");
  }

  getSensor(id: number): Observable<Sensor>{
    return this.http.get<Sensor>("https://biot-api.azurewebsites.net/api/Sensors/" + id);
  }

  updateSensor(id: number, sensor: Sensor){
    return this.http.put<Sensor>("https://biot-api.azurewebsites.net/api/Sensors/" + id, sensor)
  }

  addSensor(sensor: Sensor){
    return this.http.post<Sensor>("https://biot-api.azurewebsites.net/api/Sensors" , sensor);
  }

  deleteSensor(id: number){
    return this.http.delete<Sensor>("https://biot-api.azurewebsites.net/api/Sensors/" + id)
  }
}
