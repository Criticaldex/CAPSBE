'use client'
import { getChartDemoras, getChartDemorasSector, getProfessionalMonth } from "@/services/demoras";
import { DemorasChart } from "./demorasChart";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"
import Loading from "./loading";
import { DetallChart } from "./detallChart";
import { ProfessionalChart } from "./professionalChart";

const monthHandler = (month: number, setMonth: any, setMonthString: any, year: number, setYear: any, modifier: string) => (event: any) => {
   const pad = '00';
   switch (modifier) {
      case '<':
         if (month == 0) {
            setMonth(11)
            setMonthString('12')
            setYear(year - 1)
         } else {
            setMonth(month - 1)
            setMonthString((pad + month).slice(-pad.length));
         }
         break;
      case '>':
         if (month == 11) {
            setMonth(0)
            setMonthString('01')
            setYear(year + 1)
         } else {
            setMonth(month + 1);
            setMonthString((pad + (month + 2)).slice(-pad.length));
         }
         break;
      default:
         break;
   }
};

export default function Demora({ children, params }: any) {
   const { centre } = params;
   const monthName = ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre'];
   const hoy = new Date();
   let ayer = new Date();
   ayer.setDate(hoy.getDate() - 1);
   const pad = '00';
   const { data: session, status } = useSession();
   const day = ayer.getDate();
   const [month, setMonth] = useState(ayer.getMonth());
   const [year, setYear] = useState(ayer.getFullYear());
   const [dayString, setDayString] = useState((pad + day.toString()).slice(-pad.length));
   const [sector, setSector] = useState();
   const [color, setColor] = useState();
   const [monthString, setMonthString] = useState((pad + (month + 1).toString()).slice(-pad.length));
   const [chartDemoras, setChartDemoras] = useState({} as any);
   const [chartDemorasSector, setChartDemorasSector] = useState([] as any[]);
   const [chartProfessional, setChartProfessional] = useState([] as any[]);
   const [professional, setProfessional] = useState('');
   const [isLoading, setLoading] = useState(true);

   useEffect(() => {
      if (status === "authenticated") {
         getChartDemoras({ "any": year, "mes": monthString, "centre": centre }, session?.user.db)
            .then((sectors: any) => {
               setChartDemoras(sectors);
               setSector(sectors[0].name);
            })
      }
   }, [centre, monthString, session?.user.db, status, year])

   useEffect(() => {
      if (status === "authenticated") {
         getChartDemorasSector({ "any": year, "mes": monthString, "dia": dayString, "centre": centre, "sector": sector }, session?.user.db, color)
            .then((res: any) => {
               setChartDemorasSector(res);
               if (res[0].data[0]) {
                  setProfessional(res[0].data[0].name)
               }
               setLoading(false);
            })
      }
   }, [centre, color, dayString, monthString, sector, session?.user.db, status, year])

   useEffect(() => {
      if (status === "authenticated") {
         getProfessionalMonth({ "any": year, "mes": monthString, "centre": centre, "sector": sector }, professional, session?.user.db, color)
            .then((res: any) => {
               setChartProfessional(res);
               setLoading(false);
            })
      }
   }, [centre, color, monthString, professional, sector, session?.user.db, status, year])

   if (isLoading) return <Loading />

   return (
      <div className=" p-1 m-2 rounded-md bg-bgLight">
         <div className='flex justify-center'>
            <button className='m-1 px-2 rounded-md text-textColor font-bold border border-darkBlue bg-bgDark hover:bg-bgLight' onClick={monthHandler(month, setMonth, setMonthString, year, setYear, '<')}>&lt;</button>
            <button className='m-1 px-2 rounded-md text-textColor font-bold border border-darkBlue bg-bgDark hover:bg-bgLight' onClick={monthHandler(month, setMonth, setMonthString, year, setYear, '>')}>&gt;</button>
         </div>

         <DemorasChart
            name={monthName[month] + ' ' + year}
            data={chartDemoras}
            setterDay={setDayString}
            setterSector={setSector}
            setterColor={setColor}
         />
         <div className='flex'>
            <div className='basis-1/2'>
               <DetallChart
                  name={sector + ' ' + dayString + '/' + monthString + '/' + year.toString()}
                  data={chartDemorasSector}
                  setterProfessional={setProfessional}
               />
            </div>
            <div className='basis-1/2'>
               <ProfessionalChart
                  name={professional}
                  data={chartProfessional}
               />
            </div>
         </div>
      </div>
   );
}