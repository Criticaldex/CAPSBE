'use client'
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsExportData from 'highcharts/modules/export-data'
import HighchartsReact from 'highcharts-react-official'
import HighchartsNoData from 'highcharts/modules/no-data-to-display'
import { chartOptions } from '@/components/chart.components'

if (typeof Highcharts === "object") {
   HighchartsExporting(Highcharts)
   HighchartsExportData(Highcharts)
   HighchartsNoData(Highcharts)
}

export function Iqf({ name, data, objectiu }: any) {
   let max = 0;
   let sum = 0;
   let mesos: any = [];

   if (data[0].data) {
      data[0].data.forEach((elem: any, i: number) => {
         sum = data[0].data[i] + data[1].data[i] + data[2].data[i];
         max = (sum > max) ? sum : max;
         mesos = data[0].mesos;
      });
   }
   max = (objectiu > max) ? objectiu : max;
   const options = {
      ...chartOptions,
      chart: {
         type: 'column',
         spacingTop: 30
      },
      title: {
         text: name
      },
      series: data,
      xAxis: {
         categories: mesos
      },
      yAxis: {
         ...chartOptions.yAxis,
         max: max,
         plotLines: [{
            color: 'var(--red)',
            width: 2,
            value: objectiu
         }],
         stackLabels: {
            enabled: true,
            style: {
               textOutline: 'none'
            },
            total: '',
            formatter: function () {
               return '<b>' + this.total + '</b>'
            },
            y: -3
         },
      },
      plotOptions: {
         series: {
            borderWidth: 0,
            stacking: 'normal',
            dataLabels: {
               enabled: true,
               style: {
                  textOutline: 'none'
               },
            }
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