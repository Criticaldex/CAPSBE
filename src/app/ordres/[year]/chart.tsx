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

export function OrdresChart({ name, data }: any) {

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
   }

   return (
      <HighchartsReact
         highcharts={Highcharts}
         options={options}
      />
   )
}