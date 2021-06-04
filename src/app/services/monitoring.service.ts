import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Monitoring } from '../models/monitoring.model';

@Injectable({
  providedIn: 'root'
})
export class MonitoringService {

  constructor(private http: HttpClient) { }

  getMonitorings(): Observable<Monitoring[]>{
    return this.http.get<Monitoring[]>("https://biot-api.azurewebsites.net/api/Monitorings");
  }

  getMonitoring(id: number): Observable<Monitoring>{
    return this.http.get<Monitoring>("https://biot-api.azurewebsites.net/api/Monitorings/" + id);
  }

  updateMonitoring(id: number, monitoring: Monitoring){
    return this.http.put<Monitoring>("https://biot-api.azurewebsites.net/api/Monitorings/" + id, monitoring)
  }

  addMonitoring(monitoring: Monitoring){
    return this.http.post<Monitoring>("https://biot-api.azurewebsites.net/api/Monitorings" , monitoring);
  }

  deleteMonitoring(id: number){
    return this.http.delete<Monitoring>("https://biot-api.azurewebsites.net/api/Monitorings/" + id)
  }
}
