import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { UserData } from '../models/userdata.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiBase: string = '';
  private endpoint: string = 'User';
  constructor(private httpClient: HttpClient, private oauthService: OAuthService, @Inject('environment') environment: any) {
    this.apiBase = environment.baseApiUrl;
  }

  public getAll(club: string): Observable<UserData> {

    return this.httpClient.get<UserData>(`${this.apiBase}/Api/${this.endpoint}/${club}`, { headers: this.getHeaders() });
  }


  public getHeaders() {
    if (this.oauthService.authorizationHeader() === null) {
      this.oauthService.initLoginFlow();
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.oauthService.authorizationHeader()
    })
  }
}
