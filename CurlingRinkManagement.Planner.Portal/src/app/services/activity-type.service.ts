import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiSerivce } from './base-api.service';
import { ActivityTypeModel } from '../models/activity-type.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityTypeService extends BaseApiSerivce<ActivityTypeModel> {

  constructor(httpClient:HttpClient) { super(httpClient, "ActivityType")}

}
