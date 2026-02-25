import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { BaseApiService, ClubService } from '../../../../common-api/src/public-api';
import { environment } from '../../environments/environment';
import { CustomerRequest } from '../models/customer-request.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerRequestService extends BaseApiService<CustomerRequest> {

  constructor(httpClient:HttpClient, oauthService: OAuthService, clubService: ClubService) { super(httpClient, oauthService, "CustomerRequest", environment.plannerApiUrl, clubService)}
}
