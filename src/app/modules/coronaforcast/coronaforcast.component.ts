import { Component, OnInit, ViewChild } from '@angular/core';
import { MhdashboardServiceService } from '../MhdashboardService.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { CoronaforcastService } from '../coronaforcast.service';

@Component({
  selector: 'app-coronaforcast',
  templateUrl: './coronaforcast.component.html',
  styleUrls: ['./coronaforcast.component.scss']
})
export class CoronaforcastComponent implements OnInit {

  _coronaForcastService : any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, null) sort: MatSort;

  isForcastDataAvailable: boolean = false;
  forcastCases = [];
  forcastDate = [];
  tempDataForcast =[];
  countries = [];
  chartType:any = "line";
  chartTitle :any="";

  constructor(private coronaForcastService: CoronaforcastService, private datePipe: DatePipe) {
    this._coronaForcastService = coronaForcastService
  }

  ngOnInit() {
    this.getForcastData();
  }

  getForcastData()
  {
    //USA,Russia,China,UK,Germany,India
    this.countries = ['IN','US','RU','GB','CN'];
    this.chartTitle = "COVID-19 Forcast For Next 2 Weeks";

    this.countries.forEach(element => {
      this._coronaForcastService.getForcastData(element)
      .subscribe((data) => {
        this.tempDataForcast = [];
        this.forcastDate = [];
        for(let i=0;i<data.length;i++)
        {
          this.tempDataForcast.push(data[i].cases);
          this.forcastDate.push(data[i].date);
        }
        this.forcastCases.push({"name" : element, "data": this.tempDataForcast});
        if(this.forcastCases.length>4)
          this.isForcastDataAvailable =true;
      });
    });
  }
}

