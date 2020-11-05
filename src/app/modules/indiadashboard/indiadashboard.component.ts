import { Component, OnInit, ViewChild } from '@angular/core';
import { IndiadashboardService } from '../indiadashboard.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
  indiaTimeseriesApiData = [];
  indiaTimeseriesApiDataTitle : any;
  coronaCasesIndiaBigChartApiData =[];
  coronadDeathsIndiaBigChartApiData =[];

  isIndiaTimeseriesApiDataAvaialable :boolean = false;
  isallIndiaDataAvailable: boolean =false;
  isstateWiseIndiaDataAvailable: boolean =false;
  chartCasesAndDeathsTitle :any;
  pieTitle : any;

  TABLE_ELEMENT_DATA: IndiaCoronaTableElement[] = [];

  constructor(private indiaDashboardService: IndiadashboardService, private datePipe: DatePipe) {
    this._indiaDashboardService = indiaDashboardService
  }

  ngOnInit() {
    this.getOnlyIndiaData();
    this.getIndiaStateWiseData();
    this.getCasesandDeathsSeriesData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getCasesandDeathsSeriesData()
  {
    this._indiaDashboardService.getCasesandDeathsSeriesData()
    .subscribe((data) => {

         this.coronaCasesIndiaBigChartApiData =
          [data.timeline.cases['1/31/20'],data.timeline.cases['2/28/20'],data.timeline.cases['3/31/20'],
          data.timeline.cases['4/30/20'],data.timeline.cases['5/31/20'],data.timeline.cases['6/30/20'],
          data.timeline.cases['7/31/20'],data.timeline.cases['8/31/20'],data.timeline.cases['9/30/20'],
          data.timeline.cases['10/31/20'],data.timeline.cases['11/30/20'],data.timeline.cases['12/31/20']];

         this.coronadDeathsIndiaBigChartApiData =
          [data.timeline.deaths['1/31/20'],data.timeline.deaths['2/28/20'],data.timeline.deaths['3/31/20'],
          data.timeline.deaths['4/30/20'],data.timeline.deaths['5/31/20'],data.timeline.deaths['6/30/20'],
          data.timeline.deaths['7/31/20'],data.timeline.deaths['8/31/20'],data.timeline.deaths['9/30/20'],
          data.timeline.deaths['10/31/20'],data.timeline.deaths['11/30/20'],data.timeline.deaths['12/31/20']];

        this.isIndiaTimeseriesApiDataAvaialable =true;
        this.chartCasesAndDeathsTitle = "COVID-19 Cases / Deaths";
    }, () => {
    });

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
          "oneCasePerPeople": data.oneCasePerPeople,
          "oneDeathPerPeople": data.oneDeathPerPeople,
          "oneTestPerPeople": data.oneTestPerPeople,
        }

      );
      this.isallIndiaDataAvailable =true;
      this.pieTitle = "Indian State Corona Cases";
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
