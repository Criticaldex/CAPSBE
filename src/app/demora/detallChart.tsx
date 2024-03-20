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

export function DetallChart({ name, data, setterProfessional, setterColor }: any) {
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
            text: 'Mitjana demora per Professional'
         }
      }],
      xAxis: {
         type: 'category'
      },
      legend: {
         enabled: false,
      },
      tooltip: {
         formatter: function (this: any) {
            if (this.point.series.userOptions.data[this.point.index].max != undefined && this.point.series.userOptions.data[this.point.index].min != undefined) {
               const max: any = this.point.series.userOptions.data[this.point.index].max.toLocaleString()
               const min: any = this.point.series.userOptions.data[this.point.index].min.toLocaleString()
               return `<b>${this.series.name}: ${this.point.y}</b></br>Maxim: ${max}</br>Minim: ${min}`;
            } else {
               return `<b>${this.series.name}</b>: ${this.point.y}<br/>`
            }
         },
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
                  setterProfessional(event.point.name);
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