'use client'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export function Chart({ params }: any) {

   return (
      <div className="w-9/12 m-auto mt-20">
         <HighchartsReact
            highcharts={Highcharts}
            options={params}
         />
      </div>
   )
}