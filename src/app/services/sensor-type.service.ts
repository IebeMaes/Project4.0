import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SensorType } from '../models/sensor-type.model';

@Injectable({
  providedIn: 'root'
})
export class SensorTypeService {

  constructor(private http: HttpClient) { }

  getSensorTypes(): Observable<SensorType[]>{
    return this.http.get<SensorType[]>("https://biot-api.azurewebsites.net/api/SensorTypes");
  }

  getSensorType(id: number): Observable<SensorType>{
    return this.http.get<SensorType>("https://biot-api.azurewebsites.net/api/SensorTypes/" + id);
  }

  updateSensorType(id: number, sensorType: SensorType){
    return this.http.put<SensorType>("https://biot-api.azurewebsites.net/api/SensorTypes/" + id, sensorType)
  }

  addSensorType(sensorType: SensorType){
    return this.http.post<SensorType>("https://biot-api.azurewebsites.net/api/SensorTypes" , sensorType);
  }

  deleteSensorType(id: number){
    return this.http.delete<SensorType>("https://biot-api.azurewebsites.net/api/SensorTypes/" + id)
  }
}
