import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Measurement } from '../models/measurement.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  private data : BehaviorSubject<Measurement[]>  = new BehaviorSubject([]);
  currentData = this.data;


  constructor() {

   }

  setData(data) {
    this.data.next(data);
  }
}
