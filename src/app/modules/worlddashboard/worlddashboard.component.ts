import { Component, OnInit, ViewChild } from '@angular/core';
import { WorldDashboardService } from '../worlddashboard.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';

export interface WorldCoronaTableElement
{
  country: string;
  flag: string;
  cases: string;
  todaycases: string;
  deaths: string;
  todaydeaths: string;
  recovered: string;
  todayrecovered: string;
  active: string;
  casesPerOneMillion: string;
  deathsPerOneMillion: string;
  activePerOneMillion: string;
}

@Component({
  selector: 'app-worlddashboard',
  templateUrl: './worlddashboard.component.html',
  styleUrls: ['./worlddashboard.component.scss']
})
export class WorldDashboardComponent implements OnInit {

  coronaCasesBigChartApiData = [];
  coronacasesBigChart = [];
  coronadDeathsBigChartApiData = [];
  coronaDeathsBigChart = [];
  cards = [];
  pieChart = [];
  TABLE_ELEMENT_DATA: WorldCoronaTableElement[] = [];
  coronadworldPieApiData = [];
  _worldDashboardService : any;
  isWorldChartCasesDataAvailable:boolean = false;
  isallWorldChartCasesDataAvailable:boolean = false;
  isallWorldTableDataAvailable: boolean =false;
  isallWorldPieDataAvailable: boolean =false;
  coronaCasesWorldBigChartApiData=[];
  coronadDeathsWorldBigChartApiData=[];
  pieTitle:string ="";

  chartCasesTitle : any;
  chartDeathTitle : any;
  chartCasesAndDeathsBigChart1 = [];
  chartCasesAndDeathsBigChart2 = [];
  chartCasesAndDeathsTitle = "COVID 19 Cases / Deaths";

  displayedColumns: string[] = ['Flag','country', 'Total_Cases', 'Todays_Cases','Total_Deaths','Todays_Deaths','Total_Recovered',
  'Todays_Recovered','Total_Active','Cases Per One Million','Deaths Per One Million','Active Per One Million'];
  dataSource : MatTableDataSource<WorldCoronaTableElement>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private worldDashboardService: WorldDashboardService) {
    this._worldDashboardService = worldDashboardService
  }

  ngOnInit() {

    this.getCasesAndDeathCountriesData();
    this.getAllWorldData();
    this.getWorldTableData();
    this.getworldPieChartData();

    this.cards = this.worldDashboardService.cards();
  //  this.pieChart = this.worldDashboardService.pieChart();
  }

  getAllWorldData()
  {
      this._worldDashboardService.getWorldProcessDataForBigChart()
      .subscribe((data) => {

           this.coronaCasesWorldBigChartApiData =
            [data.cases['1/31/20'],data.cases['2/28/20'],data.cases['3/31/20'],
            data.cases['4/30/20'],data.cases['5/31/20'],data.cases['6/30/20'],
            data.cases['7/31/20'],data.cases['8/31/20'],data.cases['9/30/20'],
            data.cases['10/31/20'],data.cases['11/30/20'],data.cases['12/31/20']];

           this.coronadDeathsWorldBigChartApiData =
            [data.deaths['1/31/20'],data.deaths['2/28/20'],data.deaths['3/31/20'],
            data.deaths['4/30/20'],data.deaths['5/31/20'],data.deaths['6/30/20'],
            data.deaths['7/31/20'],data.deaths['8/31/20'],data.deaths['9/30/20'],
            data.deaths['10/31/20'],data.deaths['11/30/20'],data.deaths['12/31/20']];

          this.isallWorldChartCasesDataAvailable =true;

      }, () => {
      });
  }

  getCasesAndDeathCountriesData()
  {
      this._worldDashboardService.getProcessedDataForBigChart()
      .subscribe((data) => {

        data.forEach(element => {

          let tempDataCases = {
            "name" : element.country,
            "data" : [element.timeline.cases['1/31/20'],element.timeline.cases['2/28/20'],element.timeline.cases['3/31/20'],
            element.timeline.cases['4/30/20'],element.timeline.cases['5/31/20'],element.timeline.cases['6/30/20'],
            element.timeline.cases['7/31/20'],element.timeline.cases['8/31/20'],element.timeline.cases['9/30/20'],
            element.timeline.cases['10/31/20'],element.timeline.cases['11/30/20'],element.timeline.cases['12/31/20']]
          };

          let tempDataDeaths = {
            "name" : element.country,
            "data" : [element.timeline.deaths['1/31/20'],element.timeline.deaths['2/28/20'],element.timeline.deaths['3/31/20'],
            element.timeline.deaths['4/30/20'],element.timeline.deaths['5/31/20'],element.timeline.deaths['6/30/20'],
            element.timeline.deaths['7/31/20'],element.timeline.deaths['8/31/20'],element.timeline.deaths['9/30/20'],
            element.timeline.deaths['10/31/20'],element.timeline.deaths['11/30/20'],element.timeline.deaths['12/31/20']]
          };

          this.coronaCasesBigChartApiData.push(tempDataCases);
          this.coronadDeathsBigChartApiData.push(tempDataDeaths);

          this.coronacasesBigChart = this.coronaCasesBigChartApiData;
          this.chartCasesTitle = "COVID-19 Cases";

          this.coronaDeathsBigChart = this.coronadDeathsBigChartApiData;
          this.chartDeathTitle = "COVID-19 Deaths";
        });
        this.isWorldChartCasesDataAvailable =true;
      }, () => {
      });
  }

  getWorldTableData()
  {
    this._worldDashboardService.getWorldTableData()
    .subscribe((data) => {
      data.forEach(element => {

        let tempData = {
          "country": element.country,
          "flag": element.countryInfo.flag,
          "cases": element.cases,
          "todaycases": element.todayCases,
          "deaths": element.deaths,
          "todaydeaths": element.todayDeaths,
          "recovered": element.recovered,
          "todayrecovered": element.todayRecovered,
          "active": element.active,
          "casesPerOneMillion": element.casesPerOneMillion,
          "deathsPerOneMillion": element.deathsPerOneMillion,
          "activePerOneMillion": element.activePerOneMillion,
        };

        this.TABLE_ELEMENT_DATA.push(tempData);
        this.dataSource = new MatTableDataSource<WorldCoronaTableElement>(this.TABLE_ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;

      });
      this.isallWorldTableDataAvailable =true;
    }, () => {
    });
  }

  getworldPieChartData()
  {
    this._worldDashboardService.getworldPieChartData()
    .subscribe((data) => {
      data.forEach(element => {

        let tempData = {
          "name":element.continent,
          "y":element.cases,
          "sliced": element.continent == 'Asia' ? true : false,
          "selected": element.continent == 'Asia' ? true : false,
        };

        this.coronadworldPieApiData.push(tempData);
        this.pieTitle ="Continent Corona Case";
      });
      this.isallWorldPieDataAvailable =true;
    }, () => {
    });
  }

}
