import { Injectable } from '@angular/core';
import { ContactModel } from '../models/contact-model';
import { HttpClient } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';
import { BaseApiService, ClubService } from '../../../../common-api/src/public-api';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService extends BaseApiService<ContactModel> {

  constructor(httpClient:HttpClient, oauthService: OAuthService, clubService: ClubService) { super(httpClient, oauthService, "Contact", environment.plannerApiUrl, clubService)}
}
