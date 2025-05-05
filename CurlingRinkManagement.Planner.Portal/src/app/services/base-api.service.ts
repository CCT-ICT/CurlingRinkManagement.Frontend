import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { OAuthService } from "angular-oauth2-oidc";

export class BaseApiSerivce<T> {
    constructor(protected httpClient: HttpClient, private oauthService: OAuthService, protected endpoint: string) { }

    public getAll(): Observable<T[]> {

        return this.httpClient.get<T[]>(`${environment.apiUrl}/Api/${this.endpoint}`, { headers: this.getHeaders() });
    }

    public create(entity: T): Observable<T> {
        return this.httpClient.post<T>(`${environment.apiUrl}/Api/${this.endpoint}`, entity, { headers: this.getHeaders() });
    }

    public update(entity: T): Observable<T> {
        return this.httpClient.put<T>(`${environment.apiUrl}/Api/${this.endpoint}`, entity, { headers: this.getHeaders() });

    }

    public getHeaders() {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.oauthService.authorizationHeader()
        })
    }

}