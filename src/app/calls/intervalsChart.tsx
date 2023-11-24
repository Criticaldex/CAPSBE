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

export function IntervalsChart({ name, data, dd }: any) {
   console.log('dd: ', dd);

   const options = {
      ...chartOptions,
      chart: {
         type: 'column',
         spacingTop: 10,
         events: {
            drillup: function (event: any) {
               console.log('drillup: ', event);
            },
            load: function (event: any) {
               console.log('load: ', event);
            },
            // redraw: function (event: any) {
            //    console.log('redraw: ', event);
            // },
            // render: function (event: any) {
            //    console.log('render: ', event);
            // },
            drilldown: function (event: any) {
               console.log('drilldown: ', event);
               this.drillup(event);
            },
            click: function (event: any) {
               console.log('click: ', event);
            },
            drillupall: function (event: any) {
               console.log('drillupall: ', event);
            },
         }
      },
      title: {
         text: name
      },
      series: data,
      drilldown: dd,
      yAxis: {
         title: {
            text: 'Nº Trucades'
         }
      },
      xAxis: {
         type: 'category'
      },
      legend: {
         enabled: false,
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
            },

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