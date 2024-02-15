'use client'
import { getChartDemoras } from "@/services/demoras";
import { DemorasChart } from "./demorasChart";
import { useEffect, useState } from "react";
import { useSession, getSession } from "next-auth/react"
import { when } from 'jquery'
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
   const [dayString, setDayString] = useState((pad + day.toString()).slice(-pad.length));
   const [monthString, setMonthString] = useState((pad + (month + 1).toString()).slice(-pad.length));
   const [isLoading, setLoading] = useState(true);

   useEffect(() => {
      if (status === "authenticated") {
         console.log('sess: ', session);
         console.log('year: ', year);
         console.log('mes: ', monthString);
         console.log('centre: ', centre);

         getChartDemoras({ "any": year, "mes": monthString, "centre": centre }, session?.user.db)
            .then((res: any) => {
               console.log('res: ', res);
               setChartDemoras(res);
               console.log('chartDemoras: ', chartDemoras);
            });
         setLoading(false)
      }
   }, [year, month, centre, status])

   if (isLoading) return <Loading />

   return (
      <DemorasChart
         name={monthName[month] + ' ' + year}
         data={chartDemoras}
         setter={setDayString}
      />
   );
}