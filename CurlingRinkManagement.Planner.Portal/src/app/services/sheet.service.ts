import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiSerivce } from './base-api.service';
import { SheetModel } from '../models/sheet.model';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class SheetService extends BaseApiSerivce<SheetModel> {

  constructor(httpClient:HttpClient, oauthService: OAuthService) { super(httpClient, oauthService, "Sheet")}
}