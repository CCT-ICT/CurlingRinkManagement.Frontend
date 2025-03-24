import { Injectable } from '@angular/core';
import { BaseApiSerivce } from './base-api.service';
import { HttpClient } from '@angular/common/http';
import { ActivityModel } from '../models/activity.model';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivityService extends BaseApiSerivce<ActivityModel> {

  constructor(httpClient:HttpClient) { super(httpClient, "Activity")}

  public getInRange(sheetId:string, start:Date, end:Date) : Observable<ActivityModel[]>{
    return this.httpClient.get<ActivityModel[]>(`${environment.apiUrl}/Api/${this.endpoint}/${sheetId}?start=${start.toJSON()}&end=${end.toJSON()}`)
      .pipe(
        map(activities =>{
          activities.forEach(a =>{
            a.plannedDates.forEach(p =>{
              p.start = new Date(p.start);
              p.end = new Date(p.end);
            })
          })
          return activities;
        })
      );
  }
}
