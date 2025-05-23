import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SheetModel } from '../models/sheet.model';
import { OAuthService } from 'angular-oauth2-oidc';
import { BaseApiService, ClubService } from '../../../../common-api/src/public-api';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SheetService extends BaseApiService<SheetModel> {

  constructor(httpClient:HttpClient, oauthService: OAuthService, clubService: ClubService) { super(httpClient, oauthService, "Sheet", environment.plannerApiUrl, clubService)}
}