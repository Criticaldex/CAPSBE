'use client'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

function renderMarkers(this: any) {

   var positions = [75, 80, 50, 10]
   var chart = this,
      xAxis = chart.xAxis[0],
      yAxis = chart.yAxis[0],
      renderer = chart.renderer,
      tempArray: any[] = [],
      singleMarkerPath;

   if (chart.additionalMarkers) {
      chart.additionalMarkers.forEach(function (marker: any, index: any) {
         marker.attr({
            d: "" // Cambia el nuevo path de la marca
         });
         marker.dataLabel.attr({
            text: ""
         });
      });
   }

   positions.forEach(function (position: any, index: any) {
      singleMarkerPath = [
         'M', xAxis.toPixels(-0.35 + index), yAxis.toPixels(position),
         'L', xAxis.toPixels(0.34 + index), yAxis.toPixels(position)
      ];

      if (!chart.additionalMarkers) {
         var marker = renderer.path(singleMarkerPath)
            .attr({
               'stroke-width': 1.5,
               stroke: 'red',
               zIndex: 2,
            })
            .add();

         var label = renderer.label(positions[index].toString(), xAxis.toPixels(-0.38 + index), yAxis.toPixels(position) - 20)
            .css({
               color: 'black',
               fontSize: '12px'
            })
            .add();

         marker.dataLabel = label; // Asociar la etiqueta al marcador
         tempArray.push(marker)
      } else {
         chart.additionalMarkers[index].attr({
            d: singleMarkerPath
         })
         var label = renderer.label(positions[index].toString(), xAxis.toPixels(-0.38 + index), yAxis.toPixels(position) - 20)
            .css({
               color: 'black',
               fontSize: '12px'
            })
            .add();
         chart.additionalMarkers[index].dataLabel.destroy()
         chart.additionalMarkers[index].dataLabel = label;
      }
   });

   if (!chart.additionalMarkers) {
      chart.additionalMarkers = tempArray;
   }
}

export function Chart({ name, data, objectiu, index }: any) {
   const options = {
      chart: {
         animation: false,
         type: 'column',
         events: {
            load: renderMarkers
         }
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
         min: 0
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