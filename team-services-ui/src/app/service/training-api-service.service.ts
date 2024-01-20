import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { ApiEndpoints } from '../core/config/api-endpoints';
@Injectable({
  providedIn: 'root'
})
export class TrainingApiServiceService {

  constructor(private http:HttpClient) { }
  getTrainingData():Observable<any[]>{
    return this.http.get<any[]>(ApiEndpoints.TrainingData)
  }
  saveTrainingData(data: any) {
    console.log("trainingData", data);
    return this.http.post(ApiEndpoints.TrainingData, data);
}
updateTraining(data:any):Observable<any>{
return this.http.put<any>(`${ApiEndpoints.TrainingData}/${data.id}`,data)
}
}
