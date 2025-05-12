import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, Provider } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { BaseApiService } from './base-api.service';
import { Club } from '../models/club.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClubService {
  private apiBase:string = '';
  private endpoint:string = 'Club';
  constructor(private httpClient: HttpClient, private oauthService: OAuthService, @Inject('environment') environment: any) { 
    this.apiBase = environment.baseApiUrl;
  }

    public getAll(): Observable<Club[]> {

        return this.httpClient.get<Club[]>(`${this.apiBase}/Api/${this.endpoint}`, { headers: this.getHeaders() });
    }

    public create(entity: Club): Observable<Club> {
        return this.httpClient.post<Club>(`${this.apiBase}/Api/${this.endpoint}`, entity, { headers: this.getHeaders() });
    }

    public update(entity: Club): Observable<Club> {
        return this.httpClient.put<Club>(`${this.apiBase}/Api/${this.endpoint}`, entity, { headers: this.getHeaders() });

    }


  public getCurrentClub(): Club | null {
    let selected = localStorage.getItem("selected-club");

    return selected == null ? null : JSON.parse(selected);
  }

  public setCurrentClub(club:Club) {
    localStorage.setItem("selected-club", JSON.stringify(club));
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
