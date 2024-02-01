'use client'
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsExportData from 'highcharts/modules/export-data'
import HighchartsReact from 'highcharts-react-official'
import { chartOptions } from '@/components/chart.components'

if (typeof Highcharts === "object") {
   HighchartsExporting(Highcharts)
   HighchartsExportData(Highcharts)
}

export function ChartDetail({ name, data, objectius, categories }: any) {
   let max = 0;
   let min = 10000;

   console.log('data: ', data);


   data.forEach((elem: any) => {
      elem.data.map((i: any) => {
         max = (i > max && i != null) ? i : max;
         min = (i < min && i != null) ? i : min;
      });
   });
   objectius.forEach((elem: any) => {
      max = (elem.value > max) ? elem.value : max;
      min = (elem.value < min) ? elem.value : min;
   });

   const options = {
      ...chartOptions,
      chart: {
         type: 'spline',
         spacingTop: 30
      },
      title: {
         text: name
      },
      series: data,
      xAxis: {
         categories: data[0].mesos
      },
      legend: {
         enabled: false,
      },
      yAxis: {
         ...chartOptions.yAxis,
         max: max,
         min: min,
         plotLines: objectius,
      },
      tooltip: {
         formatter: function (this: any) {
            if (this.point.series.userOptions.numeradors) {
               const numerador: any = this.point.series.userOptions.numeradors[this.point.index].toLocaleString()
               const denominador: any = this.point.series.userOptions.denominadors[this.point.index].toLocaleString()
               return `<b>${this.series.name}</b></br>
               ( ${numerador} / ${denominador} ) x 1000 = <b>${this.point.y}</b>`;
            } else {
               return `<b>${this.series.name}</b>: ${this.point.y}<br/>`
            }
         },
      },
      plotOptions: {
         series: {
            ...chartOptions.plotOptions.series,
            dataLabels: {
               enabled: true,
               style: {
                  textOutline: 'none'
               }
            },
            connectNulls: true
         }
      }
   }

   return (
      <HighchartsReact
         highcharts={Highcharts}
         options={options}
      />
   )
}