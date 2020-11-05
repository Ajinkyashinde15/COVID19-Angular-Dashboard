import { Component, OnInit, ViewChild } from '@angular/core';
import { MhdashboardServiceService } from '../MhdashboardService.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';

export interface MhCoronaTableElement
{
  name: string;
  confirmed: string;
  recovered: string;
  deaths: string;
  oldConfirmed: string;
  oldRecovered: string;
  oldDeaths: string;
}

@Component({
  selector: 'app-mumbaidashboard',
  templateUrl: './mumbaidashboard.component.html',
  styleUrls: ['./mumbaidashboard.component.scss']
})
export class MumbaidashboardComponent implements OnInit {

  _mhDashboardService : any;
  isMHDataAvailable: boolean= false;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, null) sort: MatSort;
  pieTitle : any;

  districtWiseMHApiData = [];
  coronaMHPieApiData = [];
  displayedColumns: string[] = ['name', 'confirmed','oldConfirmed','deaths','oldDeaths','recovered','oldRecovered'];
  dataSource : MatTableDataSource<MhCoronaTableElement>;

  constructor(private mhDashboardService: MhdashboardServiceService, private datePipe: DatePipe) {
    this._mhDashboardService = mhDashboardService
  }

  ngOnInit() {
    this.getDistrictData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getDistrictData()
  {
    this._mhDashboardService.getDistrictData()
    .subscribe((data) => {

      for(let i=0;i<data.length;i++)
      {
        if(data[i].state == "Maharashtra")
        {
          data = data[i];
        }
      }

      data.districtData.forEach(element => {

            let tempData = {
              "name":element.name,
              "confirmed": element.confirmed == null ? 0 :element.confirmed,
              "deaths": element.deaths== null ? 0 :element.deaths,
              "recovered": element.recovered == null ? 0 :element.recovered,
              "oldConfirmed": element.oldConfirmed == null ? 0 :element.oldConfirmed,
              "oldDeaths": element.oldDeaths == null ? 0 :element.oldDeaths,
              "oldRecovered": element.oldRecovered == null ? 0 :element.oldRecovered,
            };

            if(element.name=="Pune" || element.name=="Mumbai" ||  element.name=="Nagpur" ||  element.name=="Solapur" ||  element.name=="Nashik")
            {
              let tempDataPieChart =
              {
                "name":element.name,
                "y":element.confirmed,
                "sliced": element.name == 'Mumbai' ? true : false,
                "selected": element.name == 'Mumbai' ? true : false,
              };

              this.coronaMHPieApiData.push(tempDataPieChart);
            }

            this.districtWiseMHApiData.push(tempData);
          });

        this.dataSource = new MatTableDataSource<MhCoronaTableElement>(this.districtWiseMHApiData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isMHDataAvailable=true;
        this.pieTitle = "Maharashtra District Corona Cases";
    }, () => {
    });

  }
}
