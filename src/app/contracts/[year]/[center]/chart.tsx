'use client'
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'

if (typeof Highcharts === "object") {
   HighchartsExporting(Highcharts)
}

export function Chart({ name, data, objectiu }: any) {

   if (objectiu && objectiu[0] == '<') objectiu = parseFloat(objectiu.substring(1))

   const options = {
      chart: {
         type: 'spline'
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
            color: 'var(--red)',
            width: 2,
            value: objectiu
         }]
      },
      legend: {
         enabled: true,
         align: 'right',
         verticalAlign: 'middle',
         width: 125
      },
      navigation: {
         buttonOptions: {
            theme: {
               stroke: 'var(--darkBlue)',
               fill: 'var(--bg-dark)',
               states: {
                  hover: {
                     fill: 'var(--bg-light)',
                  },
                  select: {
                     stroke: 'var(--darkBlue)',
                     fill: 'var(--darkBlue)'
                  }
               }
            }
         },
         menuStyle: {
            background: 'var(--bg-dark)'
         },
         menuItemStyle: {
            borderLeft: '2px solid var(--darkBlue)',
            borderRadius: 0,
            color: 'var(--text-color)',
         },
         menuItemHoverStyle: {
            background: 'var(--bg-light)'
         }
      }
   }

   return (
      <div className="max-h-1/2 mx-2 py-1">
         <div className="max-h-full px-3 bg-bgLight rounded-md">
            <HighchartsReact
               highcharts={Highcharts}
               options={options}
            />
         </div>
      </div>
   )
}