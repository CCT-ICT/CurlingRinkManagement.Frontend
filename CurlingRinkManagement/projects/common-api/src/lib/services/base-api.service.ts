import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { OAuthService } from "angular-oauth2-oidc";
import { ClubService } from "./club.service";

export class BaseApiService<T> {
    constructor(protected httpClient: HttpClient, private oauthService: OAuthService, protected endpoint: string, private apiBase: string, private clubService: ClubService) { }
    public getAll(page: number | null = null, amount: number | null = null, filters: string[] | null = null, filterValues: string[] | null = null): Observable<T[]> {
        let params = new HttpParams();
        if (page) {
            params = params.set('page', page);
        }
        if (amount) {
            params = params.set('amount', amount);
        }
        params = this.addFiltersToParams(params, filters, filterValues);

        return this.httpClient.get<T[]>(`${this.apiBase}/Api/${this.endpoint}`, { headers: this.getHeaders(), params: params });
    }

    public getAmount(filters: string[] | null = null, filterValues: string[] | null = null): Observable<number> {
        let params = new HttpParams();
        params = this.addFiltersToParams(params, filters, filterValues);
        return this.httpClient.get<number>(`${this.apiBase}/Api/${this.endpoint}/Amount`, { headers: this.getHeaders(), params:params });
    }


    public create(entity: T): Observable<T> {
        return this.httpClient.post<T>(`${this.apiBase}/Api/${this.endpoint}`, entity, { headers: this.getHeaders() });
    }

    public update(entity: T): Observable<T> {
        return this.httpClient.put<T>(`${this.apiBase}/Api/${this.endpoint}`, entity, { headers: this.getHeaders() });
    }

    public delete(id: string): Observable<object> {
        return this.httpClient.delete<object>(`${this.apiBase}/Api/${this.endpoint}/${id}`, { headers: this.getHeaders() });
    }

    public getHeaders() {
        if (this.oauthService.authorizationHeader() === null) {
            this.oauthService.initLoginFlow();
        }
        let currentClub = this.clubService.getCurrentClub();
        let clubId = '';
        if (currentClub !== null) {
            clubId = currentClub.id
        }
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.oauthService.authorizationHeader(),
            'X-Club-Id': clubId
        })
    }

    private addFiltersToParams(params: HttpParams, filters: string[] | null = null, filterValues: string[] | null = null) {
        if (filters) {
            filters.forEach(filter => {
                params = params.append('filters', filter);
            });
        }
        if (filterValues) {
            filterValues.forEach(filterValues => {
                params = params.append('filterValues', filterValues);
            });
        }
        return params;
    }

}