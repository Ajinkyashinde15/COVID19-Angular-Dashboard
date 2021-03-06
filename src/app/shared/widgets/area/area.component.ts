import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';


@Component({
  selector: 'app-widget-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

  chartOptions: {};
  @Input() data: any = [];
  @Input() title: any;
  @Input() categories: any = [];
  @Input() chartType : any;

  Highcharts = Highcharts;

  constructor() { }

  ngOnInit() {

    this.chartOptions = {
      chart: {
        type: this.chartType
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
        categories: this.categories,
      },
      series: this.data,
    };

    HC_exporting(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

}
