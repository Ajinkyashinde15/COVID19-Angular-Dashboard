import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-twoseries-area',
  templateUrl: './twoseries-area.component.html',
  styleUrls: ['./twoseries-area.component.scss']
})
export class TwoseriesAreaComponent implements OnInit {

  chartOptions: {};
  @Input() series1 = [];
  @Input() series2 = [];
  @Input() title: any;

  Highcharts = Highcharts;

  constructor() { }

  ngOnInit() {

    this.chartOptions = {
      chart: {
        type: 'line'
      },
      title: {
        text: this.title
      },
      subtitle: {
        text: '2020'
      },
      tooltip: {
        split: true,
      },
      credits: {
        enabled: false,
      },
      exporting: {
        enabled: true,
      },
      yAxis:{
        title: {
          text: 'Population'
        }
      },
      xAxis:{
        categories:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      },
      series: [{
        type: 'line',
        name: 'Cases',
        data: this.series1
      },{
          type: 'column',
          name: 'Deaths',
          data: this.series2
      }]
    };

    HC_exporting(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

}
