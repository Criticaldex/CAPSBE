import { getCenters } from "@/services/centros";
import { getEqasContracts } from "@/services/eqas";
import { Chart } from "./chart";
import { Iqf } from "./iqf";
import { getBasal, getIqfDashboard } from "@/services/iqfs";
import { getDmaAssignada, getDmaDashboard } from "@/services/dmas";
import { Dma } from "./dma";

export default async function LayoutDashboard({ children, params }: any) {
   const { year, centro } = params;
   let up: string = '';
   let nameCentro: string = '';
   const centros = await getCenters();
   centros.map((center: any) => {
      if (center.id == centro) {
         up = center.up
         nameCentro = center.name
      }
   })
   const eqas = await getEqasContracts(year, centros);
   const iqf = await getIqfDashboard(up);
   const basal = await getBasal(up);
   const dma = await getDmaDashboard(up);
   const dma_assignada = await getDmaAssignada(up);

   function calcularRegresionLineal(datos: any[]) {
      var sumaX = 0;
      var sumaY = 0;
      var sumaXY = 0;
      var sumaX2 = 0;

      for (var i = 0; i < datos.length; i++) {
         sumaX += i;
         sumaY += datos[i];
         sumaXY += i * datos[i];
         sumaX2 += i * i;
      }

      var n = datos.length;
      var pendiente = (n * sumaXY - sumaX * sumaY) / (n * sumaX2 - sumaX * sumaX);
      var intercepto = (sumaY - pendiente * sumaX) / n;

      return { pendiente: pendiente, intercepto: intercepto };
   }

   // Calcular la regresión lineal
   var regresion = calcularRegresionLineal(dma[0].data);

   // Crear un conjunto de datos para la línea de tendencia
   var lineaTendencia = [];
   for (var i = 0; i < 9; i++) {
      lineaTendencia.push(regresion.pendiente * i + regresion.intercepto);
   }

   return (
      <article className="min-h-fit">
         <section className="flex flex-row justify-between mx-2 mb-2">
            <div id='tabla_dashboard' className="w-3/4 h-auto bg-bgLight rounded-md shadow-xl">
               {children}
            </div>
            <div className="w-1/4 p-1 ml-2 h-auto bg-bgLight rounded-md shadow-xl">
               <Chart
                  name={'TOTAL EQA'}
                  data={eqas}
               />
            </div>
         </section>
         <div className="flex flex-row justify-between mx-2 mb-2">
            <div className="w-1/2 p-1 mr-1 bg-bgLight rounded-md shadow-xl">
               <Dma
                  name={`DMA ${nameCentro}`}
                  data={dma}
                  objectiu={dma_assignada}
                  regresion={lineaTendencia}
               />
            </div>
            <div className="w-1/2 p-1 ml-1 bg-bgLight rounded-md shadow-xl">
               <Iqf
                  name={`IQF ${nameCentro}`}
                  data={iqf}
                  objectiu={basal}
               />
            </div>
         </div>
      </article>
   );
}
