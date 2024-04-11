'use client'
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsExportData from 'highcharts/modules/export-data'
import HighchartsReact from 'highcharts-react-official'
import HighchartsNoData from 'highcharts/modules/no-data-to-display'
import { chartOptions } from '@/components/chart.components'

if (typeof Highcharts === "object") {
   HighchartsExporting(Highcharts)
   HighchartsExportData(Highcharts)
   HighchartsNoData(Highcharts)
}

export function Eqa({ name, data, objectius }: any) {
   let max = 0;
   let min = 1000;
   let plotLines = [];
   data.forEach((elem: any) => {
      elem.data.map((i: any) => {
         max = (i > max && i != null) ? i : max;
         min = (i < min && i != null) ? i : min;
      });
   });

   if (objectius) {
      for (const [key, obj] of (Object.entries(objectius) as [string, any][])) {
         plotLines.push({
            color: 'var(--red)',
            width: 2,
            value: obj
         })
         max = (obj > max) ? obj : max;
         min = (obj < min) ? obj : min;
      }
   }

   const options = {
      ...chartOptions,
      chart: {
         type: 'spline',
         spacingTop: 30
      },
      title: {
         text: name
      },
      series: data,
      yAxis: {
         ...chartOptions.yAxis,
         max: max,
         min: min,
         plotLines: plotLines
      }
   }

   return (
      <HighchartsReact
         highcharts={Highcharts}
         options={options}
      />
   )
}