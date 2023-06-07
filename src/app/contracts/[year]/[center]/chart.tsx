'use client'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useEffect, useRef } from 'react'

export function Chart({ params }: any) {

   const chartRef = useRef<any>(null)

   useEffect(() => {
      const table = document.getElementById('cliqueo')
      const rows = table?.querySelectorAll('tbody tr')
      if (chartRef.current.chart.options.title.text != 'TOTAL EQA') {
         var chartInd = chartRef.current.chart
         rows?.forEach(function (row) {
            row.addEventListener('mouseenter', function () {
               if (chartRef.current != null) {
                  var serie = row.querySelector('th:first-child')?.textContent;
                  chartInd.series.forEach(function (s: any) {
                     if (s.name.replaceAll('`', "'") === serie?.replaceAll('+', '-')) {
                        s.graph.attr({ 'stroke-width': 2 }).animate({ opacity: 1 }, { duration: 300 });
                        s.data.forEach(function (point: any) {
                           point.graphic.animate({ opacity: 1 }, { duration: 300 });
                        });
                     } else {
                        s.graph.attr().animate({ opacity: 0.1 }, { duration: 300 });
                        s.data.forEach(function (point: any) {
                           point.graphic.animate({ opacity: 0.1 }, { duration: 300 });
                        });
                     }
                  });
               }
            })
            row.addEventListener('mouseleave', function () {
               if (chartRef.current != null) {
                  chartInd.series.forEach(function (s: any) {
                     s.graph.attr({ 'stroke-width': 1 }).animate({ opacity: 1 }, { duration: 500 })
                     s.data.forEach(function (point: any) {
                        point.graphic.animate({ opacity: 1 }, { duration: 500 })
                     })
                  })
               }
            })
         })
      }
   }, [])

   return (
      <div className="h-1/2 ml-2 py-1">
         <div className='h-full px-3 bg-white rounded-lg shadow-lg shadow-gray-400-50'>
            <HighchartsReact
               containerProps={{ style: { height: "100%" } }}
               highcharts={Highcharts}
               options={params}
               ref={chartRef}
            />
         </div>
      </div>
   )
}