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

export function Dma({ name, data, objectiu, regresion, invers }: any) {
   let max = 0;
   data.forEach((elem: any) => {
      elem.data.map((i: any) => {
         max = (i > max) ? i : max;
      });
   });
   max = (objectiu > max) ? objectiu : max;
   const obj = (invers) ? objectiu.replace(/\D/g, '') : objectiu
   const options = {
      ...chartOptions,
      chart: {
         type: 'column',
         spacingTop: 30
      },
      title: {
         text: name
      },
      series: [
         data[0],
         {
            type: 'line',
            name: 'Línea de Tendencia',
            data: regresion,
            color: 'black'
         }
      ],
      xAxis: {
         categories: ['Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Septembre', 'Octubre', 'Novembre', 'Decembre']
      },
      yAxis: {
         ...chartOptions.yAxis,
         max: max,
         plotLines: [{
            color: 'var(--red)',
            width: 2,
            value: obj
         }]
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
         },
         line: {
            lineWidth: 2,
            marker: {
               enabled: false
            },
            dataLabels: {
               enabled: false
            }
         }
      },
      tooltip: {
         pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.1f}%)<br/>'
      }
   }

   return (
      <HighchartsReact
         highcharts={Highcharts}
         options={options}
      />
   )
}