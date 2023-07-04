'use client'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export function Chart({ name, data }: any) {
   const options = {
      chart: {
         animation: false,
         type: 'spline',
      },
      lang: {
         noData: "No hi han dades disponibles"
      },
      noData: {
         style: {
            fontSize: '26px',
            fontWeight: 'bold',
            color: '#666666'
         },
      },
      series: data,
      title: {
         text: name
      },
      xAxis: {
         categories: ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Septembre', 'Octubre', 'Novembre', 'Decembre'],
         scrollbar: {
            enabled: true
         },
         tickLength: 0
      },
      yAxis: {
         max: 100,
         min: 0
      },
      credits: {
         enabled: false
      },
      tooltip: {
         shared: false,
      }
   }

   return (
      <div className="max-h-1/2 mx-2 pb-2">
         <div className="max-h-full px-3 bg-bgLight rounded-md shadow-xl">
            <HighchartsReact
               highcharts={Highcharts}
               options={options}
            />
         </div>
      </div>
   )
}