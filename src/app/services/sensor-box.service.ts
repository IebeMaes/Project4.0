import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SensorBox } from '../models/sensor-box.model';

@Injectable({
  providedIn: 'root'
})
export class SensorBoxService {

  constructor(private http: HttpClient) { }

  getSensorBoxes(): Observable<SensorBox[]>{
    return this.http.get<SensorBox[]>("https://biot-api.azurewebsites.net/api/SensorBoxes");
  }

  getSensorBoxesByBoxID(boxID: number): Observable<SensorBox[]>{
    return this.http.get<SensorBox[]>("https://biot-api.azurewebsites.net/api/SensorBoxes/" + boxID);
  }

  updateSensorBox(id: number, sensorBox: SensorBox){
    return this.http.put<SensorBox>("https://biot-api.azurewebsites.net/api/SensorBoxes/" + id, sensorBox)
  }

  addSensorBox(sensorBox: SensorBox){
    return this.http.post<SensorBox>("https://biot-api.azurewebsites.net/api/SensorBoxes" , sensorBox);
  }

  deleteSensorBox(boxID: number, sensorID: number){
    return this.http.delete<SensorBox>("https://biot-api.azurewebsites.net/api/SensorBoxes/boxid/" + boxID + "/sensorid/" + sensorID)
  }
}
