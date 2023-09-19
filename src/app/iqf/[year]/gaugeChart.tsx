'use client'
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import { chartOptions } from '@/components/chart.components'
import highchartsMore from "highcharts/highcharts-more"
import solidGauge from "highcharts/modules/solid-gauge";

if (typeof Highcharts === "object") {
   HighchartsExporting(Highcharts)
   highchartsMore(Highcharts);
   solidGauge(Highcharts);
}

export function GaugeChart({ data, numColor }: any) {

   const options = {
      ...chartOptions,
      chart: {
         type: 'solidgauge',
         spacingTop: 30,
         height: '50%',
         margin: [0, 0, 0, 0],
         spacing: [0, 0, 0, 0],
      },
      title: {
         text: ""
      },
      series: [{
         name: data.name,
         data: [{
            color: numColor,
            radius: '80%',
            innerRadius: '55%',
            y: data.data[data.data.length - 1]
         }]
      }],
      yAxis: {
         ...chartOptions.yAxis,
         lineWidth: 0,
         tickPositions: [],
         max: 100,
         min: 0,
      },
      plotOptions: {
         solidgauge: {
            dataLabels: {
               enabled: true,
               align: 'center',
               format: '<p style="font-size: 50px;color: {point.color}; font-weight: bold;">{point.y}</p>',
               borderWidth: 0,
               style: {
                  textOutline: 'none'
               }
            },
            linecap: 'round',
            stickyTracking: false,
            rounded: true
         }
      },
      pane: {
         startAngle: 0,
         endAngle: 360,
         background: {
            outerRadius: '79%',
            innerRadius: '56%',
            backgroundColor: numColor + '50',
            borderWidth: 0
         }
      },
      tooltip: {
         enabled: false
      },
      exporting: {
         enabled: false
      }
   }

   return (
      <HighchartsReact
         highcharts={Highcharts}
         options={options}
      />
   )
}