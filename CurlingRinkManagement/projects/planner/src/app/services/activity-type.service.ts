import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivityTypeModel } from '../models/activity-type.model';
import { OAuthService } from 'angular-oauth2-oidc';
import { BaseApiService, ClubService } from '../../../../common-api/src/public-api';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivityTypeService extends BaseApiService<ActivityTypeModel> {

  constructor(httpClient:HttpClient, oauthService: OAuthService, clubService:ClubService) { super(httpClient, oauthService, "ActivityType", environment.plannerApiUrl, clubService)}

}
