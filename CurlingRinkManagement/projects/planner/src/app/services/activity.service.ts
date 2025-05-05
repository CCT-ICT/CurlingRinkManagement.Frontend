import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivityModel } from '../models/activity.model';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { OAuthService } from 'angular-oauth2-oidc';
import { BaseApiService } from '../../../../common-api/src/public-api';

@Injectable({
  providedIn: 'root'
})
export class ActivityService extends BaseApiService<ActivityModel> {

  constructor(httpClient:HttpClient, oauthService: OAuthService) { super(httpClient, oauthService, "Activity", environment.baseApiUrl)}

  public getInRange(sheetId:string, start:Date, end:Date) : Observable<ActivityModel[]>{
    return this.httpClient.get<ActivityModel[]>(`${environment.baseApiUrl}/Api/${this.endpoint}/${sheetId}?start=${start.toJSON()}&end=${end.toJSON()}`, { headers: this.getHeaders() })
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
