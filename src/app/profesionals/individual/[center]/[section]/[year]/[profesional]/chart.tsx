'use client'
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'

if (typeof Highcharts === "object") {
   HighchartsExporting(Highcharts)
}

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