import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IndiadashboardService {

  constructor(private http: HttpClient) { }

  getOnlyIndiaData()
  {
    //Get Only India Data
    const url =  `https://disease.sh/v3/covid-19/countries/india?strict=true`;
    return this.http.get(url);
  }
  getIndiaStateWiseData()
  {
   //Get State wise India Data
   const url =  `https://disease.sh/v3/covid-19/gov/india`;
   return this.http.get(url);
  }
}
