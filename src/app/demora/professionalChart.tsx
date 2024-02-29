'use client'
import Highcharts from 'highcharts'
import HighchartsMore from 'highcharts/highcharts-more'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsExportData from 'highcharts/modules/export-data'
import HighchartsAccessibility from 'highcharts/modules/accessibility'
import HighchartsReact from 'highcharts-react-official'
import { chartOptions } from '@/components/chart.components'

if (typeof Highcharts === "object") {
   HighchartsExporting(Highcharts)
   HighchartsExportData(Highcharts)
   HighchartsAccessibility(Highcharts)
   HighchartsMore(Highcharts)
}

export function ProfessionalChart({ name, data, setterProfessional }: any) {
   const options = {
      ...chartOptions,
      chart: {
         spacingTop: 10,
      },
      title: {
         text: name
      },
      series: data,
      yAxis: [{
         title: {
            text: 'Dies demora Mes'
         }
      }],
      xAxis: {
         type: 'category'
      },
      legend: {
         enabled: false,
      },
      tooltip: {
         crosshairs: true,
         shared: true,
         valueSuffix: ' dies'
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
                  setterProfessional(event.point.nomComplet);
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