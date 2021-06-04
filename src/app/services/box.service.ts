import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Box } from '../models/box.model';

@Injectable({
  providedIn: 'root'
})
export class BoxService {

  constructor(private http: HttpClient) { }

  getBoxes(): Observable<Box[]>{
    return this.http.get<Box[]>("https://biot-api.azurewebsites.net/api/Boxes1");
  }

  getBox(id: number): Observable<Box>{
    return this.http.get<Box>("https://biot-api.azurewebsites.net/api/Boxes1/" + id);
  }

  updateBox(id: number, box: Box){
    return this.http.put<Box>("https://biot-api.azurewebsites.net/api/Boxes1/" + id, box)
  }

  addBox(box: Box){
    return this.http.post<Box>("https://biot-api.azurewebsites.net/api/Boxes1" , box);
  }

  deleteBox(id: number){
    return this.http.delete<Box>("https://biot-api.azurewebsites.net/api/Boxes1/" + id)
  }
}
