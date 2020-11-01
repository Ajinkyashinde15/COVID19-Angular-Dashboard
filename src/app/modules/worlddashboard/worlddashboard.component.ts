import { Component, OnInit, ViewChild } from '@angular/core';
import { WorldDashboardService } from '../worlddashboard.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];

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
  _worldDashboardService : any;
  isWorldChartCasesDataAvailable:boolean = false;
  isallWorldChartCasesDataAvailable:boolean = false;
  chartCasesTitle : any;
  chartDeathTitle : any;
  chartCasesAndDeathsBigChart1 = [];
  chartCasesAndDeathsBigChart2 = [];
  chartCasesAndDeathsTitle = "COVID 19 Cases / Deaths";

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);



  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private worldDashboardService: WorldDashboardService) {
    this._worldDashboardService = worldDashboardService
  }

  ngOnInit() {

    this.getCasesAndDeathCountriesData();
    this.getAllWorldData();

    //this.bigChart = this.worldDashboardService.bigChart();
    this.cards = this.worldDashboardService.cards();
    this.pieChart = this.worldDashboardService.pieChart();

    this.dataSource.paginator = this.paginator;
  }

  getAllWorldData()
  {
      this._worldDashboardService.getWorldProcessDataForBigChart()
      .subscribe((data) => {

           this.coronaCasesBigChartApiData =
            [data.cases['1/31/20'],data.cases['2/28/20'],data.cases['3/31/20'],
            data.cases['4/30/20'],data.cases['5/31/20'],data.cases['6/30/20'],
            data.cases['7/31/20'],data.cases['8/31/20'],data.cases['9/30/20'],
            data.cases['10/31/20'],data.cases['11/30/20'],data.cases['12/31/20']];

           this.coronadDeathsBigChartApiData =
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

          this.isWorldChartCasesDataAvailable =true;
        });
      }, () => {
      });
  }
}
