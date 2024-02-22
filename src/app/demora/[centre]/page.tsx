'use client'
import { getChartDemoras, getChartDemorasSector } from "@/services/demoras";
import { DemorasChart } from "./demorasChart";
import { useEffect, useState } from "react";
import { useSession, getSession } from "next-auth/react"
import Loading from "./loading";

export default function Demora({ children, params }: any) {
   const { centre } = params;
   const monthName = ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre'];
   const hoy = new Date();
   let ayer = new Date();
   ayer.setDate(hoy.getDate() - 1);
   const pad = '00';
   const { data: session, status } = useSession();
   const day = ayer.getDate();
   const month = ayer.getMonth();
   const year = ayer.getFullYear();
   const [dayString, setDayString] = useState((pad + day.toString()).slice(-pad.length));
   const [monthString, setMonthString] = useState((pad + (month + 1).toString()).slice(-pad.length));
   const [chartDemoras, setChartDemoras] = useState({} as any);
   const [chartDemorasSector, setChartDemorasSector] = useState([] as any[]);
   const [nameDemorasSector, setNameDemorasSector] = useState([] as string[]);
   const [isLoading, setLoading] = useState(true);

   useEffect(() => {
      if (status === "authenticated") {
         getChartDemoras({ "any": year, "mes": monthString, "centre": centre }, session?.user.db)
            .then((sectors: any) => {
               console.log("sectors: ", sectors);
               setChartDemoras(sectors);
               let names: string[] = [];
               let charts: any[] = [];
               sectors.forEach((sector: { name: string }, i: number) => {
                  console.log("CHART DEMORA SECTOR");
                  getChartDemorasSector({ "any": year, "mes": monthString, "dia": dayString, "centre": centre, "sector": sector.name }, session?.user.db)
                     .then((res: any) => {
                        charts = [...charts, res];
                        names = [...names, sector.name];
                        if (chartDemoras.length <= charts.length) {
                           setNameDemorasSector(names);
                           setChartDemorasSector(charts);
                           setLoading(false);
                        }
                     })
               })
            })
      }
   }, [centre, chartDemoras.length, dayString, monthString, session?.user.db, status, year])

   if (isLoading) return <Loading />

   return (
      <div className="rounded-md p-1 m-2 bg-bgLight">
         <DemorasChart
            name={monthName[month] + ' ' + year}
            data={chartDemoras}
            setter={setDayString}
         />

         <div className=" p-1 m-2 flex justify-evenly flex-auto rounded-md bg-bgLight basis-auto items-stretch">
            {chartDemorasSector.map((sector: any, index: number) => {

               return (
                  <div className=" p-1 m-2 flex justify-evenly flex-auto rounded-md bg-bgLight" key={index}>
                     <DemorasChart
                        name={nameDemorasSector[index]}
                        data={sector}
                     />
                  </div>
               )
            })}
         </div >
      </div>
   );
}