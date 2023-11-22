'use client'
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsExportData from 'highcharts/modules/export-data'
import highchartsDrilldown from "highcharts/modules/drilldown";
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
            color: "var(--green)",
            // colorByPoint: true,
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
                  drilldown: "Chrome",
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
            color: "var(--red)",
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
                  drilldown: "Chrome",
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
               type: 'column',
               name: 'Detall',
               id: '21',
               color: "var(--green)",
               data: [
                  [
                     '17',
                     1.02
                  ],
                  [
                     '18',
                     7.36
                  ],
                  [
                     '20',
                     0.35
                  ],
                  [
                     '21',
                     0.11
                  ],
                  [
                     '22',
                     0.1
                  ]
               ]
            },
            {
               type: 'column',
               name: 'Detall',
               id: '21',
               color: "var(--red)",
               data: [
                  [
                     '17',
                     1.02
                  ],
                  [
                     '18',
                     7.36
                  ],
                  [
                     '20',
                     0.35
                  ],
                  [
                     '21',
                     0.11
                  ],
                  [
                     '22',
                     0.1
                  ]
               ]
            }
         ],
         xAxis: {
            categories: null,
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

   highchartsDrilldown(Highcharts);

   return (
      <HighchartsReact
         highcharts={Highcharts}
         options={options}
      />
   )
}