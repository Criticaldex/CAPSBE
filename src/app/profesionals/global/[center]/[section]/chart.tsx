'use client'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export function Chart({ name, data, objectiu, index }: any) {

   const data2: any = [
      {
         name: "pepe",
         data: [
            91.17,
            99.64,
            87.41,
            74.76,
         ],
      },
      {
         name: "paco",
         data: [
            61.45,
            65.54,
            60.7,
            45.58,
         ],
      },
   ]
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
         text: name
      },
      xAxis: {
         categories: index,
         scrollbar: {
            enabled: true
         },
         tickLength: 0
      },
      yAxis: {
         max: 100,
         plotLines: [{
            color: '#FF0000',
            width: 2,
            value: objectiu
         }]
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