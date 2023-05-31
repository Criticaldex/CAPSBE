import { Chart } from './chart'
import { getMongoData, getChartIndicators, getCleanCenters } from "../../../services/contracts";

export default async function ContractsChart({ params }: any) {
   const { year, center } = params;
   const centros = await getCleanCenters(year);
   const indicadoresContrato = await getMongoData({ "Any": year, "Centre": center })
   const infoChart = await getChartIndicators(indicadoresContrato);
   const options = {
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
         text: centros[center].name
      },
      series: infoChart,
      xAxis: {
         categories: ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Septembre', 'Octubre', 'Novembre', 'Decembre'],
         startOnTick: true
      },
      credits: {
         text: ""
      },
      legend: {
         enabled: true,
         align: 'right',
         verticalAlign: 'middle',
         width: 150
      },
      tooltip: {
         shared: false
      }
   }

   return (
      <div>
         <Chart
            params={options}
         />
      </div>
   )
}