'use client'
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import { chartOptions } from '@/components/chart.components'

if (typeof Highcharts === "object") {
   HighchartsExporting(Highcharts)
}

export function Chart({ name, data, objectiu, categories, setter }: any) {
   let max = 0;
   data.forEach((elem: any) => {
      elem.data.map((i: any) => {
         max = (i > max) ? i : max;
      });
   });
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
      yAxis: {
         ...chartOptions.yAxis,
         max: max
      },
      xAxis: {
         categories: categories,
      },
      tooltip: {
         pointFormat: '{series.name}: <b>{point.y} punts</b><br/>'
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
            events: {
               click: function (event: any) {
                  setter(event.point.category);
                  console.log('event: ', event.point.category);
               }
            }
         },
      }
   }

   return (
      <HighchartsReact
         highcharts={Highcharts}
         options={options}
      />
   )
}

