import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>("https://biot-api.azurewebsites.net/api/Users1");
  }

  getUser(id: number): Observable<User>{
    return this.http.get<User>("https://biot-api.azurewebsites.net/api/Users1/" + id);
  }

  updateUser(id: number, user: User){
    return this.http.put<User>("https://biot-api.azurewebsites.net/api/Users1/" + id, user)
  }

  addUser(user: User){
    return this.http.post<User>("https://biot-api.azurewebsites.net/api/Users1" , user);
  }

  deleteUser(id: number){
    return this.http.delete<User>("https://biot-api.azurewebsites.net/api/Users1/" + id)
  }
}
