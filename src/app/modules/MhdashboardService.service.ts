import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MhdashboardServiceService {

  constructor(private http: HttpClient) { }

  getDistrictData()
  {
   //Get District wise MH Data
   const url =  `https://api.covidindiatracker.com/state_data.json`;
   return this.http.get(url);
  }
}
