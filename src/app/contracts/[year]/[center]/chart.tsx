'use client'
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import { chartOptions } from '@/components/chart.components'

if (typeof Highcharts === "object") {
   HighchartsExporting(Highcharts)
}

export function Chart({ name, data, objectiu }: any) {
   if (objectiu && objectiu[0] == '<') objectiu = parseFloat(objectiu.substring(1))

   const options = {
      ...chartOptions,
      chart: {
         type: 'spline'
      },
      title: {
         text: name
      },
      series: data,
      yAxis: {
         ...chartOptions.yAxis,
         plotLines: [{
            color: 'var(--red)',
            width: 2,
            value: objectiu
         }]
      }
   }

   return (
      <div className="max-h-1/2 mx-2 py-1">
         <div className="max-h-full px-3 bg-bgLight rounded-md">
            <HighchartsReact
               highcharts={Highcharts}
               options={options}
            />
         </div>
      </div>
   )
}