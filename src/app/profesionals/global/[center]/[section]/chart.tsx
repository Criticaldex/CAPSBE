'use client'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export function Chart({ name, data, objectiu }: any) {

   if (objectiu && objectiu[0] == '<') objectiu = parseFloat(objectiu.substring(1))

   const options = {
      chart: {
         animation: false,
         type: 'column',
         spacingTop: 40,
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
         text: 'placeholder'
      },
      xAxis: {
         categories: ['0', '1'],
         scrollbar: {
            enabled: true
         },
         tickLength: 0
      },
      yAxis: {
         max: 100
      },
      credits: {
         enabled: false
      },
      tooltip: {
         shared: false,
      }
   }

   const options2 = {
      chart: { type: 'spline' },
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
      title: {
         text: name
      },
      series: data,
      xAxis: {
         categories: ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Septembre', 'Octubre', 'Novembre', 'Decembre'],
         startOnTick: true
      },
      yAxis: {
         title: {
            enabled: false
         },
         plotLines: [{
            color: '#FF0000',
            width: 2,
            value: objectiu
         }]
      },
      credits: {
         text: ""
      },
      legend: {
         enabled: true,
         align: 'right',
         verticalAlign: 'middle',
         width: 125
      },
      tooltip: {
         shared: false
      }
   }

   return (
      <div className="max-h-1/2 mx-2 py-1">
         <div className="max-h-full px-3 bg-white rounded-xl shadow-lg shadow-gray-400-50">
            <HighchartsReact
               highcharts={Highcharts}
               options={options}
            />
         </div>
      </div>
   )
}