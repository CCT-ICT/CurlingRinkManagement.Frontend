import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Provider } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { BaseApiService } from './base-api.service';
import { Club } from '../models/club.model';

@Injectable({
  providedIn: 'root'
})
export class ClubService extends BaseApiService<Club> {

  constructor(httpClient: HttpClient, oauthService: OAuthService, @Inject('environment') environment: any) { super(httpClient, oauthService, "Club", environment.baseApiUrl) }

  public getCurrentClub(): Club | null {
    let selected = localStorage.getItem("selected-club");

    return selected == null ? null : JSON.parse(selected);
  }

  public setCurrentClub(club:Club) {
    localStorage.setItem("selected-club", JSON.stringify(club));
  }

}
