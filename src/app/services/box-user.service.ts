import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BoxUser } from '../models/box-user.model';

@Injectable({
  providedIn: 'root'
})
export class BoxUserService {

  constructor(private http: HttpClient) { }

  getBoxUsers(): Observable<BoxUser[]>{
    return this.http.get<BoxUser[]>("https://biot-api.azurewebsites.net/api/BoxUsers");
  }

  // getBoxUser(id: number): Observable<BoxUser>{
  //   return this.http.get<BoxUser>("https://biot-api.azurewebsites.net/api/BoxUsers/" + id);
  // }

  getBoxUsersByUserID(userID: number): Observable<BoxUser[]>{
    return this.http.get<BoxUser[]>("https://biot-api.azurewebsites.net/api/BoxUsers/" + userID);
  }

  updateBoxUser(id: number, boxUser: BoxUser){
    return this.http.put<BoxUser>("https://biot-api.azurewebsites.net/api/BoxUsers/" + id, boxUser)
  }

  addBoxUser(boxUser: BoxUser){
    return this.http.post<BoxUser>("https://biot-api.azurewebsites.net/api/BoxUsers" , boxUser);
  }

  deleteBoxUser(id: number){
    return this.http.delete<BoxUser>("https://biot-api.azurewebsites.net/api/BoxUsers/" + id)
  }
}
