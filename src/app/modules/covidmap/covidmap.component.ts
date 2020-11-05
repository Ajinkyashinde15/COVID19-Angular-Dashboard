import { Component, OnInit } from '@angular/core';
import { MapChart } from 'angular-highcharts';
import { HttpClient } from '@angular/common/http';
import { forkJoin, of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { TheVirusTracker } from '../../shared/thevirustracker.model'

var Highcharts = require('highcharts/highmaps'),
  map = require('@highcharts/map-collection/custom/world.geo.json');

  @Component({
    selector: 'app-covidmap',
    templateUrl: './covidmap.component.html',
    styleUrls: ['./covidmap.component.scss']
  })

export class CovidmapComponent implements OnInit {
  arrayOfHttp = [];
  chartData = [];
  globalData = [];
  isLoading: boolean = false;

  constructor(private http: HttpClient, public mapChart: MapChart) { }

  ngOnInit() {
    map.features.forEach(element => {
      this.arrayOfHttp.push(
        this.http.get<TheVirusTracker>(
          `https://disease.sh/v3/covid-19/countries/${element.id}?yesterday=true&twoDaysAgo=true&strict=true`
        )
          .pipe(catchError(error => of(error)))
      );
    });

    forkJoin(this.arrayOfHttp).subscribe(results => {

      let tempData = [];
      tempData = results;

      for(let i=0;i<tempData.length;i++)
      {
        //console.log(tempData[i].countryInfo._id);

        if (tempData[i].countryInfo) {
          this.chartData.push({
            code3: tempData[i].countryInfo.iso3,
            name: tempData[i].country,
            value: tempData[i].cases,
            total_cases: tempData[i].cases,
            total_active_cases: tempData[i].active,
            total_deaths: tempData[i].deaths,
            total_recovered: tempData[i].recovered,
            total_new_cases_today: tempData[i].todayCases,
            total_new_deaths_today: tempData[i].todayDeaths
          });
        }
      }
      this.prepapareChat();
    });

    this.http
      .get<TheVirusTracker>("https://disease.sh/v3/covid-19/all?yesterday=true&twoDaysAgo=true&allowNull=true")
      .subscribe(data => {
        this.globalData.push({
          total_active_cases: data["active"],
          total_cases: data["cases"],
          total_deaths: data["deaths"],
          total_new_cases_today: data["todayCases"],
          total_new_deaths_today: data["todayDeaths"]
        });
      });
  }

  prepapareChat() {
    this.mapChart = new MapChart({
      chart: {
        borderWidth: 0,
        height: (9 / 16) * 100 - 15 + "%",
        map: map,
        backgroundColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, "#4a0000"],
            [1, "#000000"]
          ]
        }
      },

      title: {
        text: "COVID - 19",
        style: {
          color: "white",
          fontWeight: "bold",
          fontSize: "2em",
          opacity: 0.8
        }
      },

      subtitle: {
        text: "Hover on a country or territory to see casses, deaths and recoveries.",
        style: {
          color: "white",
          fontSize: "1em",
          opacity: 0.8
        }
      },

      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: "top"
        }
      },

      colorAxis: {
        dataClasses: [
          {
            from: 0,
            to: 0,
            color: "#FBEFEF"
          }, {
            from: 1,
            to: 100,
            color: "#FA5858"
          }, {
            from: 101,
            to: 1000,
            color: "#500000"
          }, {
            from: 1001,
            to: 10000,
            color: "#880000"
          }, {
            from: 10001,
            to: 20000,
            color: "#b10000"
          }, {
            from: 20001,
            to: 50000,
            color: "#FE2E2E"
          }, {
            from: 50001,
            color: "#ff0000"
          }
        ]
      },

      series: [
        {
          type: undefined,
          name: "Covid",
          animation: {
            duration: 2000
          },
          borderColor: "#FFDF00",
          joinBy: ["iso-a3", "code3"],
          data: this.chartData,
          dataLabels: {
            enabled: false,
            format: "{point.name}"
          },
          minSize: 4,
          maxSize: "40%",
          tooltip: {
            headerFormat: "{point.name}",
            pointFormat: `<b>{point.name}</b> <br /> <br /> Total Cases : {point.total_cases}
                  <br /> Total Active Cases : {point.total_active_cases}
                  <br /> Total Deaths : {point.total_deaths}
                  <br /> Total Recovered : {point.total_recovered}
                  <br /> New Cases Today : <b>+ {point.total_new_cases_today}

                  `
          }
        }
      ]
    });
  }
}


