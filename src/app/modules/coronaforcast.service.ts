import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoronaforcastService {

  constructor(private http: HttpClient) { }

  getForcastData(countryName : string)
  {
    //USA,Russia,China,UK,Germany,India
    const url =  `https://covid19-api.org/api/prediction/${countryName}`;
    return this.http.get(url);
  }
}
