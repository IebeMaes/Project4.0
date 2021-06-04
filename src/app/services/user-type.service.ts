import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserType } from '../models/user-type.model';

@Injectable({
  providedIn: 'root'
})
export class UserTypeService {

  constructor(private http: HttpClient) { }

  getUserTypes(): Observable<UserType[]>{
    return this.http.get<UserType[]>("https://biot-api.azurewebsites.net/api/UserTypes");
  }

  getUserType(id: number): Observable<UserType>{
    return this.http.get<UserType>("https://biot-api.azurewebsites.net/api/UserTypes/" + id);
  }

  updateUserType(id: number, userType: UserType){
    return this.http.put<UserType>("https://biot-api.azurewebsites.net/api/UserTypes/" + id, userType)
  }

  addUserType(userType: UserType){
    return this.http.post<UserType>("https://biot-api.azurewebsites.net/api/UserTypes" , userType);
  }

  deleteUserType(id: number){
    return this.http.delete<UserType>("https://biot-api.azurewebsites.net/api/UserTypes/" + id)
  }
}
