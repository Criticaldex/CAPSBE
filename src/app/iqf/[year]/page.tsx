import { getCenters } from "@/services/centros";
import { ChartLayout } from "./chartLayout";
import { getPlotLines, getUniversals, getUniversalsDetall, getHiper, getSeleccio, getHiperDetall, getSeleccioDetall } from "@/services/iqfs";

export default async function LayoutDashboard({ children, params }: any) {
   const { year } = params;
   let seccioUni = 'biosimilars';
   let seccioHiper = 'benzodiazepines';
   let seccioSele = 'mpoc_seleccio';
   const centros = await getCenters();
   const universals = await getUniversals(year, centros);
   const hiper = await getHiper(year, centros);
   const seleccio = await getSeleccio(year, centros);
   const plotMatma = await getPlotLines(seccioUni)
   const plotHiper = await getPlotLines(seccioHiper)
   const plotSele = await getPlotLines(seccioSele)

   return (
      <ChartLayout
         year={year}
         centros={centros}
         universals={universals}
         hiper={hiper}
         seleccio={seleccio}
         plotMatma={plotMatma}
         plotHiper={plotHiper}
         plotSele={plotSele}
      />
   );
}
