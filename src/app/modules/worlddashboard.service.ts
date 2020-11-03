import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorldDashboardService {

  constructor(private http: HttpClient) { }

  getProcessedDataForBigChart()
  {
    //USA,Russia,China,UK,Germany,India
    const url =  `https://disease.sh/v3/covid-19/historical/USA%2CRussia%2CChina%2CUK%2CGermany%2CIndia?lastdays=all`;
    return this.http.get(url);
  }

  getWorldProcessDataForBigChart()
  {
    //World Cases and Deaths data
    const url =  `https://disease.sh/v3/covid-19/historical/all?lastdays=all`;
    return this.http.get(url);
  }

  getWorldTableData()
  {
    //World all data by conuntries
    const url =  `https://disease.sh/v3/covid-19/countries`;
    return this.http.get(url);
  }

  getworldPieChartData()
  {
    //get continent data
    const url =  `https://disease.sh/v3/covid-19/continents`;
    return this.http.get(url);
  }

}
