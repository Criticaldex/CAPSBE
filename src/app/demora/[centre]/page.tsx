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
   const [day, setDay] = useState(ayer.getDate());
   const [month, setMonth] = useState(ayer.getMonth());
   const [year, setYear] = useState(ayer.getFullYear());
   const [chartDemoras, setChartDemoras] = useState();
   const [chartDemorasSector, setChartDemorasSector] = useState([] as any[]);
   const [nameDemorasSector, setNameDemorasSector] = useState([] as string[]);
   const [dayString, setDayString] = useState();
   const [monthString, setMonthString] = useState((pad + (month + 1).toString()).slice(-pad.length));
   const [isLoading, setLoading] = useState(true);

   useEffect(() => {
      let names: string[] = [];
      let charts: any[] = [];
      if (status === "authenticated") {
         getChartDemoras({ "any": year, "mes": monthString, "centre": centre, }, session?.user.db)
            .then((sectors: any) => {
               setChartDemoras(sectors);
               setDayString(sectors.dia);
               names = [];
               charts = [];
               sectors.forEach((sector: { name: string }, i: number) => {
                  console.log("sector.name: ", sector.name);
                  // console.log("any: ", year);
                  // console.log("mes: ", monthString);
                  console.log("dayString: ", dayString);
                  // console.log("centre: ", centre);
                  getChartDemorasSector({ "any": year, "mes": monthString, "dia": '14', "centre": centre, "sector": sector.name }, session?.user.db)
                     .then((res: any) => {
                        console.log('reSector: ', res);
                        console.log('sectors.length: ', sectors.length);
                        console.log('charts.length: ', charts.length);
                        charts = [...charts, res];
                        names = [...names, sector.name];
                        if (sectors.length <= charts.length) {
                           setNameDemorasSector(names);
                           setChartDemorasSector(charts);
                           setLoading(false);
                        }
                     })
               })
            })
      }
   }, [year, month, monthString, day, dayString, centre, status])

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
               console.log('chartDemorasSector: ', chartDemorasSector);
               console.log('nameDemorasSector: ', nameDemorasSector);

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