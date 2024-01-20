import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private sharedDataSubject = new BehaviorSubject<string>(''); 

  setSharedData(data: string): void {
    this.sharedDataSubject.next(data);
  }

  getSharedData(): BehaviorSubject<string> {
    return this.sharedDataSubject;
  }
  
}

