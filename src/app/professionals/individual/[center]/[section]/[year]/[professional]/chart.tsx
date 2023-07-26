'use client'
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import { chartOptions } from '@/components/chart.components'


if (typeof Highcharts === "object") {
   HighchartsExporting(Highcharts)
}

export function Chart({ name, data }: any) {
   const options = {
      ...chartOptions,
      chart: {
         type: 'spline'
      },
      series: data,
      title: {
         text: name
      },
      yAxis: {
         ...chartOptions.yAxis,
         max: 100,
         min: 0
      }
   }

   return (
      <div className="max-h-1/2 pb-2">
         <div className="max-h-full px-3 bg-bgLight rounded-md">
            <HighchartsReact
               highcharts={Highcharts}
               options={options}
            />
         </div>
      </div>
   )
}