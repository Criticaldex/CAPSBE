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

export function Chart({ name, data, days, drilldown }: any) {
   const options = {
      ...chartOptions,
      chart: {
         type: 'column',
         spacingTop: 10
      },
      title: {
         text: name
      },
      series: [
         {
            type: "column",
            name: "Contestades",
            data: [
               {
                  name: "17",
                  y: 371,
                  drilldown: "17",
               },
               {
                  name: "18",
                  y: 16,
                  drilldown: "18",
               },
               {
                  name: "20",
                  y: 473,
                  drilldown: "20",
               },
               {
                  name: "21",
                  y: 406,
                  drilldown: "21",
               },
            ],
         },
         {
            type: "column",
            name: "Abandonades",
            data: [
               {
                  name: "17",
                  y: -74,
                  drilldown: "17",
               },
               {
                  name: "18",
                  y: -1,
                  drilldown: "18",
               },
               {
                  name: "20",
                  y: -77,
                  drilldown: "20",
               },
               {
                  name: "21",
                  y: -54,
                  drilldown: "21",
               },
            ],
         },
      ],
      drilldown: {
         breadcrumbs: {
            position: {
               align: 'right'
            }
         },
         series: [
            {
               name: '20',
               id: '20',
               data: [
                  [
                     'v58.0',
                     1.02
                  ],
                  [
                     'v57.0',
                     7.36
                  ],
                  [
                     'v56.0',
                     0.35
                  ],
                  [
                     'v55.0',
                     0.11
                  ],
                  [
                     'v54.0',
                     0.1
                  ],
                  [
                     'v52.0',
                     0.95
                  ],
                  [
                     'v51.0',
                     0.15
                  ],
                  [
                     'v50.0',
                     0.1
                  ],
                  [
                     'v48.0',
                     0.31
                  ],
                  [
                     'v47.0',
                     0.12
                  ]
               ]
            }
         ]
      },
      yAxis: {
         title: {
            text: 'Nº Trucades'
         }
      },
      xAxis: {
         categories: days,
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