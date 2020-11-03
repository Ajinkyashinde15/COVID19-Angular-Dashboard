import { Component, OnInit, ViewChild } from '@angular/core';
import { IndiadashboardService } from '../indiadashboard.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { DatePipe } from '@angular/common';

export interface IndiaCoronaTableElement
{
  state: string;
  cases: string;
  todayCases: string;
  deaths: string;
  todayDeaths: string;
  recovered: string;
  todayRecovered: string;
  active: string;
  todayactive: string;
}

@Component({
  selector: 'app-indiadashboard',
  templateUrl: './indiadashboard.component.html',
  styleUrls: ['./indiadashboard.component.scss']
})
export class IndiadashboardComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, null) sort: MatSort;

  displayedColumns: string[] = ['state', 'cases', 'todayCases','deaths','todayDeaths','recovered',
  'todayRecovered','active','todayActive'];
  dataSource : MatTableDataSource<IndiaCoronaTableElement>;

  _indiaDashboardService : any;
  onlyIndiaApiData=[];
  coronaIndiadPieApiData=[];
  stateWiseIndiaApiData=[];
  isallIndiaDataAvailable: boolean =false;
  isstateWiseIndiaDataAvailable: boolean =false;
  pieTitle : "Indian State Corona Cases";

  TABLE_ELEMENT_DATA: IndiaCoronaTableElement[] = [];

  constructor(private indiaDashboardService: IndiadashboardService, private datePipe: DatePipe) {
    this._indiaDashboardService = indiaDashboardService
  }

  ngOnInit() {
    this.getOnlyIndiaData();
    this.getIndiaStateWiseData();

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getOnlyIndiaData()
  {
    this._indiaDashboardService.getOnlyIndiaData()
    .subscribe((data) => {

      this.onlyIndiaApiData.push(
        {
          "flag": data.countryInfo.flag,
          "cases": data.cases,
          "todayCases": data.todayCases,
          "deaths": data.deaths,
          "todayDeaths": data.todayDeaths,
          "recovered": data.recovered,
          "todayRecovered": data.todayRecovered,
          "active": data.active,
          "tests": data.tests,
          "population": data.population,
        }

      );
      this.isallIndiaDataAvailable =true;
    }, () => {
    });
  }

  getIndiaStateWiseData(){
    this._indiaDashboardService.getIndiaStateWiseData()
    .subscribe((data) => {

      data.states.forEach(element => {

        let tempData = {
          "state":element.state,
          "active": element.active,
          "cases": element.cases,
          "deaths": element.deaths,
          "recovered": element.recovered,
          "todayDeaths": element.todayDeaths,
          "todayActive": element.todayActive,
          "todayCases": element.todayCases,
          "todayRecovered": element.todayRecovered,
        };

        if(element.state=="Maharashtra" || element.state=="Gujarat" ||  element.state=="Madhya Pradesh" ||  element.state=="Kerala" ||  element.state=="Punjab")
        {
          let tempDataPieChart =
          {
            "name":element.state,
            "y":element.cases,
            "sliced": element.state == 'Maharashtra' ? true : false,
            "selected": element.state == 'Maharashtra' ? true : false,
          };

          this.coronaIndiadPieApiData.push(tempDataPieChart);
        }

        this.stateWiseIndiaApiData.push(tempData);
      });
      this.dataSource = new MatTableDataSource<IndiaCoronaTableElement>(this.stateWiseIndiaApiData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isstateWiseIndiaDataAvailable=true;
    }, () => {
    });
  }

}
