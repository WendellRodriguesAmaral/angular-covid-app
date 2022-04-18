import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Content, CovidCards } from '../models/covid-cards.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CovidCardService {
  url:string= environment.urlPath
  version:number = 1

  constructor( private http:HttpClient) { }
  
  getCovidsData():Observable<Content<Array<CovidCards>>>{
    return this.http.get<Content<Array<CovidCards>>>(`${environment.urlPath}report/v${this.version}`)
  }
}
