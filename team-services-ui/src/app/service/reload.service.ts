import { Injectable } from '@angular/core';
import { Subject,Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root',
})
export class ReloadService {
    constructor(private http:HttpClient){}
  private reloadSubject = new Subject<void>();

  reloadEvent$ = this.reloadSubject.asObservable();

  triggerReload() {
    this.reloadSubject.next();
  }
  
}