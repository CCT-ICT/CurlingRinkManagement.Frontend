import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiSerivce } from './base-api.service';
import { SheetModel } from '../models/sheet.model';

@Injectable({
  providedIn: 'root'
})
export class SheetService extends BaseApiSerivce<SheetModel> {

  constructor(httpClient:HttpClient) { super(httpClient, "Sheet")}
}