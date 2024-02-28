'use client'
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { createThemes } from "@/styles/themes";
import { Loading } from "@/components/loading.component";
import { getChartDemoras, getChartDemorasSector, getProfessionalMonth } from '@/services/demoras';
import { DemorasChart } from './demorasChart';
import { DetallChart } from './detallChart';
import { ProfessionalChart } from './professionalChart';
import { useSession } from 'next-auth/react';

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

const ExpandedComponent = ({ data }: any) => {
   const monthName = ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre'];
   const hoy = new Date();
   const pad = '00';
   const { data: session, status } = useSession();
   const day = hoy.getDate();
   const [month, setMonth] = useState(hoy.getMonth());
   const [year, setYear] = useState(hoy.getFullYear());
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
         console.log(year);
         console.log(monthString);
         console.log(data.centro);

         getChartDemoras({ "any": year, "mes": monthString, "centre": data.centro }, session?.user.db)
            .then((sectors: any) => {
               console.log('sectors: ', sectors);
               setChartDemoras(sectors);
               setSector(sectors[0].name);
            })
      }
   }, [data.centro, monthString, session?.user.db, status, year])

   useEffect(() => {
      if (status === "authenticated") {
         getChartDemorasSector({ "any": year, "mes": monthString, "dia": dayString, "centre": data.centro, "sector": sector }, session?.user.db, color)
            .then((res: any) => {
               setChartDemorasSector(res);
               if (res[0].data[0]) {
                  setProfessional(res[0].data[0].name)
               }
               setLoading(false);
            })
      }
   }, [data.centro, color, dayString, monthString, sector, session?.user.db, status, year])

   useEffect(() => {
      if (status === "authenticated") {
         getProfessionalMonth({ "any": year, "mes": monthString, "centre": data.centro, "sector": sector }, professional, session?.user.db, color)
            .then((res: any) => {
               setChartProfessional(res);
               setLoading(false);
            })
      }
   }, [professional])

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
                  name={dayString + '/' + monthString + '/' + year.toString()}
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

export function DemorasTable({ date, data, centros, sectors }: any) {

   let columns: any = [{
      name: 'Centre',
      selector: (row: any) => row.centroName,
      sortable: true,
      grow: 3,
      style: { fontSize: 'var(--table-font)', backgroundColor: '', color: '' },
   }];

   let tableData: any = [];


   sectors.map((sec: any) => {

      columns.push({
         name: sec,
         selector: (row: any) => row.sec,
         sortable: false,
         minWidth: '30px',
         compact: true,
         center: true,
         wrap: true,
         grow: 1,
         style: { fontSize: 'var(--table-font)', backgroundColor: '', color: '' },
      });

      tableData.push({})

   });


   createThemes();

   return (
      <div className='flex-col grow'>
         <a className="flex justify-center text-xl font-bold">Trucades {date}</a>
         <DataTable
            className='flex'
            columns={columns}
            data={data}
            theme={'custom'}
            expandableRows
            expandOnRowClicked
            expandableRowsComponent={ExpandedComponent}
         />
      </div>
   )
};