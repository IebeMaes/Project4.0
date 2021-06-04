import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Measurement } from '../models/measurement.model';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {

  constructor(private http: HttpClient) { }

  getMeasurements(): Observable<Measurement[]>{
    return this.http.get<Measurement[]>("https://biot-api.azurewebsites.net/api/Measurements");
  }

  getMeasurementsByBoxSensorDate(boxid: number, sensorid: number, startdate: Date, enddate?: Date): Observable<Measurement[]>{
    return this.http.get<Measurement[]>("https://biot-api.azurewebsites.net/api/Measurements/" + boxid + "/sensorid/" + sensorid + "/startdate/" + startdate  + "/enddate/" + enddate);
  }

  getLatestMeasurement(boxid: number, sensorid: number): Observable<Measurement>{
    return this.http.get<Measurement>("https://biot-api.azurewebsites.net/api/Measurements/Latest/boxid/" + boxid +"/sensorid/"+ sensorid);
  }


  updateMeasurement(id: number, measurement: Measurement){
    return this.http.put<Measurement>("https://biot-api.azurewebsites.net/api/Measurements/" + id, measurement)
  }

  addMeasurement(measurement: Measurement){
    return this.http.post<Measurement>("https://biot-api.azurewebsites.net/api/Measurements" , measurement);
  }

  deleteMeasurement(id: number){
    return this.http.delete<Measurement>("https://biot-api.azurewebsites.net/api/Measurements/" + id)
  }
}
