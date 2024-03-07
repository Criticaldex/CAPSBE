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

export function AccessibilitatChart({ name, data }: any) {
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
            text: 'Nº Trucades'
         }
      }, {
         title: {
            text: 'Temps (s)'
         },
         opposite: true
      }],
      xAxis: {
         ...chartOptions.xAxis,
         type: 'category'
      },
      plotOptions: {
         series: {
            borderWidth: 0,
            maxPointWidth: 10,
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