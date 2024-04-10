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

export function DemorasChart({ name, data, setterSector, setterColor }: any) {
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