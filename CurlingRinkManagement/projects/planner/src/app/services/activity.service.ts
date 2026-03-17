import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivityModel } from '../models/activity.model';
import { map, Observable, OperatorFunction } from 'rxjs';
import { environment } from '../../environments/environment';
import { OAuthService } from 'angular-oauth2-oidc';
import { BaseApiService, ClubService } from '../../../../common-api/src/public-api';

@Injectable({
  providedIn: 'root'
})
export class ActivityService extends BaseApiService<ActivityModel> {


  constructor(httpClient: HttpClient, oauthService: OAuthService, clubService: ClubService) { super(httpClient, oauthService, "Activity", environment.plannerApiUrl, clubService) }

  public getInRange(sheetId: string, start: Date, end: Date): Observable<ActivityModel[]> {

    var filters = ["SheetId", "StartDate", "EndDate"];
    var filterValues = [sheetId, start.toJSON(), end.toJSON()];

    return this.getAll(null, null, filters, filterValues)
      .pipe(
        map(activities => {
          activities.forEach(a => {
            this.mapDates(a);
          })
          return activities;
        })
      );
  }

  public getForUser(instructorId: string, start: Date): Observable<ActivityModel[]> {

    var filters = ["InstructorId", "StartDate"];
    var filterValues = [instructorId, start.toJSON()];

    return this.getAll(null, null, filters, filterValues)
      .pipe(
        map(activities => {
          activities.forEach(a => {
            this.mapDates(a);
          })
          return activities;
        })
      );
  }

  public getWithMissingInstructors(start: Date): Observable<ActivityModel[]> {

    var filters = ["MissingInstructors", "StartDate"];
    var filterValues = ["true", start.toJSON()];

    return this.getAll(null, null, filters, filterValues)
      .pipe(
        map(activities => {
          activities.forEach(a => {
            this.mapDates(a);
          })
          return activities;
        })
      );
  }

  public override getById(id: string): Observable<ActivityModel> {
    return this.getById(id)
      .pipe(
        map(this.mapDates)
      );
  }

  public addUserAsInstructor(activityId: string, sheetActivityId: string, userId: string) {
    return this.httpClient.put<ActivityModel>(`${this.apiBase}/Api/${this.endpoint}/${activityId}/${sheetActivityId}/${userId}`, null, { headers: this.getHeaders() });
  }

  public mapDates(activity: ActivityModel): ActivityModel {

    activity.sheetActivities.forEach(p => {
      p.activityTime.start = new Date(p.activityTime.start);
      p.activityTime.end = new Date(p.activityTime.end);
    })
    return activity;

  }
}
