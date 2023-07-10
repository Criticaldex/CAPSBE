export const chartOptions = {
   chart: {
      type: null
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
   credits: {
      enabled: false
   },
   title: {
      text: null
   },
   series: null,
   xAxis: {
      categories: ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Septembre', 'Octubre', 'Novembre', 'Decembre'],
   },
   yAxis: {
      title: {
         enabled: false
      },
      plotLines: [{
         color: 'var(--red)',
         width: 2,
         value: null
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
   },
   plotOptions: {
      series: {
         borderWidth: 0
      }
   }
};