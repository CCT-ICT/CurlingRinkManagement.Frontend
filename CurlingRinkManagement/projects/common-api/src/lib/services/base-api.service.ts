import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { OAuthService } from "angular-oauth2-oidc";

export class BaseApiService<T> {
    constructor(protected httpClient: HttpClient, private oauthService: OAuthService, protected endpoint: string, private apiBase:string) { }

    public getAll(): Observable<T[]> {

        return this.httpClient.get<T[]>(`${this.apiBase}/Api/${this.endpoint}`, { headers: this.getHeaders() });
    }

    public create(entity: T): Observable<T> {
        return this.httpClient.post<T>(`${this.apiBase}/Api/${this.endpoint}`, entity, { headers: this.getHeaders() });
    }

    public update(entity: T): Observable<T> {
        return this.httpClient.put<T>(`${this.apiBase}/Api/${this.endpoint}`, entity, { headers: this.getHeaders() });

    }

    public getHeaders() {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.oauthService.authorizationHeader()
        })
    }

}