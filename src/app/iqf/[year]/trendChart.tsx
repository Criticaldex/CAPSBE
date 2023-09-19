'use client'
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsExportData from 'highcharts/modules/export-data'
import HighchartsReact from 'highcharts-react-official'
import { chartOptions } from '@/components/chart.components'
import highchartsMore from "highcharts/highcharts-more.js"
import solidGauge from "highcharts/modules/solid-gauge.js";

if (typeof Highcharts === "object") {
   HighchartsExporting(Highcharts)
   HighchartsExportData(Highcharts)
   highchartsMore(Highcharts);
   solidGauge(Highcharts);
}

export function TrendChart({ data, numColor }: any) {

   const options = {
      ...chartOptions,
      chart: {
         type: 'line',
         spacingTop: 30,
         height: '15%',
         margin: [0, 0, 0, 0],
         spacing: [0, 0, 0, 0],
      },
      title: {
         text: ""
      },
      series: data,
      xAxis: {
         categories: ['Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Septembre', 'Octubre', 'Novembre', 'Decembre']
      },
      yAxis: {
         ...chartOptions.yAxis,
         max: Math.max(...data.data) + 1,
         min: Math.min(...data.data) - 1,
         gridLineWidth: 0,
      },
      plotOptions: {
         series: {
            ...chartOptions.plotOptions.series,
            marker: {
               enabled: true
            },
            lineWidth: 3,
            color: 'black'
         }
      },
      exporting: {
         enabled: false
      },
      legend: {
         enabled: false
      }
   }

   return (
      <HighchartsReact
         highcharts={Highcharts}
         options={options}
      />
   )
}