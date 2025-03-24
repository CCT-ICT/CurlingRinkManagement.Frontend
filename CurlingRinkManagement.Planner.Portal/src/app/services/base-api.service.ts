import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

export class BaseApiSerivce<T> {
    constructor(protected httpClient:HttpClient, protected endpoint: string){}

    public GetAll() : Observable<T[]> {
        return this.httpClient.get<T[]>(`${environment.apiUrl}/Api/${this.endpoint}`);
    }

    public Create(entity:T) : Observable<T> {
        return this.httpClient.post<T>(`${environment.apiUrl}/Api/${this.endpoint}`, entity);
    }

    public Update(entity:T) : Observable<T> {
        return this.httpClient.put<T>(`${environment.apiUrl}/Api/${this.endpoint}`, entity);

    }

}