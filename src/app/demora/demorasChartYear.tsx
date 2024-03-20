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

export function DemorasChartYear({ name, data, setterMonth, setterSector, setterColor }: any) {
   const options = {
      ...chartOptions,
      chart: {
         spacingTop: 10
      },
      title: {
         text: name
      },
      series: data,
      yAxis: [{
         title: {
            text: 'Mitjana Demora per Centre'
         }
      }],
      xAxis: {
         type: 'category'
      },
      plotOptions: {
         series: {
            borderWidth: 0,
            maxPointWidth: 0,
            dataLabels: {
               enabled: true,
               style: {
                  textOutline: 'none'
               },
            },
            events: {
               click: function (event: any) {
                  setterMonth(event.point.monthNum);
                  setterSector(event.point.series.name);
                  setterColor(event.point.color);
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