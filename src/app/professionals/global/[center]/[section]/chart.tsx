'use client'
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import { chartOptions } from '@/components/chart.components'


if (typeof Highcharts === "object") {
   HighchartsExporting(Highcharts)
}

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
               stroke: 'var(--red)',
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
      ...chartOptions,
      chart: {
         type: 'column',
         events: {
            load: renderMarkers
         }
      },
      series: data,
      title: {
         text: name
      },
      xAxis: {
         categories: index,
      },
      yAxis: {
         ...chartOptions.yAxis,
         max: 100,
         min: 0
      },
      legend: {
         ...chartOptions.legend,
         width: 250
      },
   }
}