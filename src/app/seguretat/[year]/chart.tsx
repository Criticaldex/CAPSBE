'use client'
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsExportData from 'highcharts/modules/export-data'
import HighchartsReact from 'highcharts-react-official'
import HighchartsNoData from 'highcharts/modules/no-data-to-display'
import { chartOptions } from '@/components/chart.components'
import { useEffect } from 'react'

if (typeof Highcharts === "object") {
   HighchartsExporting(Highcharts)
   HighchartsExportData(Highcharts)
   HighchartsNoData(Highcharts)
}

export function Chart({ name, data, objectiu, categories, setter }: any) {

   // eslint-disable-next-line react-hooks/exhaustive-deps
   let centrosClass = ['centrosGeriatria', 'centrosSnc']
   useEffect(() => {
      centrosClass.forEach(clase => {
         let contenedor = document.getElementsByClassName(clase)
         for (var i = 0; i < contenedor.length; i++) {
            let p = contenedor[i].getElementsByTagName('p')
            p[0].style.borderColor = `var(--highcharts${i})`
         };
      })
   }, [centrosClass])

   let max = 0;
   data.forEach((elem: any) => {
      elem.data.map((i: any) => {
         max = (i > max && i != null) ? i : max;
      });
   });
   max = (objectiu > max) ? objectiu : max;
   const options = {
      ...chartOptions,
      chart: {
         type: 'column',
         spacingTop: 30
      },
      title: {
         text: name
      },
      series: data,
      yAxis: {
         ...chartOptions.yAxis,
         max: max
      },
      xAxis: {
         categories: categories,
      },
      legend: {
         enabled: false
      },
      tooltip: {
         enabled: false
      },
      plotOptions: {
         series: {
            ...chartOptions.plotOptions.series,
            dataLabels: {
               enabled: true,
               style: {
                  textOutline: 'none'
               }
            },
            events: {
               click: function (event: any) {
                  setter(event.point.category);
               }
            }
         },
      }
   }

   return (
      <HighchartsReact
         highcharts={Highcharts}
         options={options}
      />
   )
}

