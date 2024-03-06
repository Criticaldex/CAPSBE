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

export function AccessibilitatChart({ name, data, setter }: any) {
   const options = {
      ...chartOptions,
      chart: {
         spacingTop: 10
      },
      title: {
         text: name
      },
      series: [
         {
            type: "spline",
            name: "MEDICINA DE FAMÍLIA",
            data: [
               {
                  name: "01",
                  y: 3.29,
               },
               {
                  name: "02",
                  y: 3.76,
               },
               {
                  name: "05",
                  y: 3.45,
               },
               {
                  name: "06",
                  y: 3.45,
               },
               {
                  name: "08",
                  y: 3.5,
               },
               {
                  name: "09",
                  y: 3.12,
               },
               {
                  name: "12",
                  y: 3.12,
               },
               {
                  name: "13",
                  y: 3.69,
               },
               {
                  name: "14",
                  y: 5.5,
               },
               {
                  name: "15",
                  y: 4.6,
               },
               {
                  name: "16",
                  y: 4.31,
               },
               {
                  name: "19",
                  y: 4.43,
               },
               {
                  name: "20",
                  y: 4.95,
               },
               {
                  name: "21",
                  y: 5.76,
               },
               {
                  name: "23",
                  y: 5.02,
               },
               {
                  name: "26",
                  y: 4.98,
               },
               {
                  name: "27",
                  y: 5.05,
               },
               {
                  name: "28",
                  y: 4.17,
               },
               {
                  name: "29",
                  y: 4.93,
               },
            ],
         },
         {
            type: "spline",
            name: "INFERMERIA D'ATENCIÓ PRIMÀRIA",
            data: [
               {
                  name: "01",
                  y: 2.22,
               },
               {
                  name: "02",
                  y: 2.88,
               },
               {
                  name: "05",
                  y: 2.72,
               },
               {
                  name: "06",
                  y: 3,
               },
               {
                  name: "08",
                  y: 2.34,
               },
               {
                  name: "09",
                  y: 2.88,
               },
               {
                  name: "12",
                  y: 2.66,
               },
               {
                  name: "13",
                  y: 2.56,
               },
               {
                  name: "14",
                  y: 2.44,
               },
               {
                  name: "15",
                  y: 2.38,
               },
               {
                  name: "16",
                  y: 2.16,
               },
               {
                  name: "19",
                  y: 2.25,
               },
               {
                  name: "20",
                  y: 2.53,
               },
               {
                  name: "21",
                  y: 2.75,
               },
               {
                  name: "23",
                  y: 3.66,
               },
               {
                  name: "26",
                  y: 3.22,
               },
               {
                  name: "27",
                  y: 3.06,
               },
               {
                  name: "28",
                  y: 4.84,
               },
               {
                  name: "29",
                  y: 4.53,
               },
            ],
         },
      ],
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
               },
            },
            events: {
               click: function (event: any) {
                  setter(event.point.name);
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