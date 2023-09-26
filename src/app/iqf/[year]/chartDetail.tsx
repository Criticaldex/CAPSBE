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
   let min = 100;
   data.forEach((elem: any) => {
      elem.data.map((i: any) => {
         max = (i > max) ? i : max;
         min = (i < min) ? i : min;
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
         categories: ['Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre']
      },
      yAxis: {
         ...chartOptions.yAxis,
         max: max,
         min: min,
         plotLines: objectius,
      },
      tooltip: {
         pointFormat: '{series.name}: <b>{point.y}</b><br/>'
      },
      plotOptions: {
         series: {
            ...chartOptions.plotOptions.series,
            dataLabels: {
               enabled: true,
               style: {
                  textOutline: 'none'
               }
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