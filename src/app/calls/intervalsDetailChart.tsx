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

export function IntervalsDetailChart({ name, data, days }: any) {
   const options = {
      ...chartOptions,
      chart: {
         type: 'column',
         spacingTop: 10
      },
      title: {
         text: name
      },
      series: data,
      yAxis: {
         title: {
            text: 'Nº Trucades'
         }
      },
      xAxis: {
         type: 'category'
      },
      plotOptions: {
         column: {
            stacking: 'normal'
         },
         series: {
            borderWidth: 0,
            maxPointWidth: 50,
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