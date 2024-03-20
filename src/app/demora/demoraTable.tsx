'use client'
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { createThemes } from "@/styles/themes";
import { Loading } from "@/components/loading.component";
import { getChartDemoras, getChartDemorasSector, getChartDemorasYear, getProfessionalMonth } from '@/services/demoras';
import { DemorasChart } from './demorasChart';
import { DetallChart } from './detallChart';
import { ProfessionalChart } from './professionalChart';
import { useSession } from 'next-auth/react';
import { DemorasChartYear } from './demorasChartYear';

const yearHandler = (year: string, setYear: any, modifier: string) => (event: any) => {
   switch (modifier) {
      case '<':
         setYear((parseInt(year) - 1).toString())
         break;
      case '>':
         setYear((parseInt(year) + 1).toString())
         break;
      default:
         break;
   }
};

const ExpandedComponent = ({ data }: any) => {
   const monthName = ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre'];
   const { data: session, status } = useSession();
   const [year, setYear] = useState(data.lastDate.any);
   const [month, setMonth] = useState(data.lastDate.mes);
   const [day, setDay] = useState(data.lastDate.dia);
   const [sector, setSector] = useState();
   const [color, setColor] = useState('var(--highcharts0)');
   const [chartDemoras, setChartDemoras] = useState({} as any);
   const [chartDemorasYear, setChartDemorasYear] = useState({} as any);
   const [chartDemorasSector, setChartDemorasSector] = useState([] as any[]);
   const [chartProfessional, setChartProfessional] = useState([] as any[]);
   const [professional, setProfessional] = useState();
   const [isLoading, setLoading] = useState(true);

   useEffect(() => {
      if (status === "authenticated") {
         getChartDemorasYear({ "any": year, "centre": data.centro }, session?.user.db)
            .then((sectors: any) => {
               setChartDemorasYear(sectors);
               setSector(sectors[0].name);
               setColor('var(--highcharts0)');
            })
      }
   }, [data.centro, session?.user.db, status, year])

   useEffect(() => {
      if (status === "authenticated") {
         getChartDemoras({ "any": year, "mes": month, "centre": data.centro }, session?.user.db)
            .then((sectors: any) => {
               setChartDemoras(sectors);
            })
      }
   }, [data.centro, month, session?.user.db, status, year])

   useEffect(() => {
      if (status === "authenticated") {
         getChartDemorasSector({ "any": year, "mes": month, "centre": data.centro, "sector": sector }, session?.user.db, color)
            .then((res: any) => {
               setChartDemorasSector(res);
               if (res[0].data[0]) {
                  setProfessional(res[0].data[0].name)
               }
            })
      }
   }, [data.centro, color, sector, session?.user.db, status, year, month])

   useEffect(() => {
      if (status === "authenticated" && professional) {

         getProfessionalMonth({ "any": year, "mes": month, "centre": data.centro, "sector": sector }, professional, session?.user.db, color)
            .then((res: any) => {
               setChartProfessional(res);
               setLoading(false);
            })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [data.centro, month, professional, session?.user.db, status, year])

   if (isLoading) return <Loading />

   return (
      <div className=" p-1 m-2 rounded-md bg-bgLight">
         <div className='flex'>
            <div className='basis-1/2'>
               <div className='flex justify-center'>
                  <button className='m-1 px-2 rounded-md text-textColor font-bold border border-darkBlue bg-bgDark hover:bg-bgLight' onClick={yearHandler(year, setYear, '<')}>&lt;</button>
                  <button className='m-1 px-2 rounded-md text-textColor font-bold border border-darkBlue bg-bgDark hover:bg-bgLight' onClick={yearHandler(year, setYear, '>')}>&gt;</button>
               </div>
               <DemorasChartYear
                  name={year}
                  data={chartDemorasYear}
                  setterMonth={setMonth}
                  setterSector={setSector}
                  setterColor={setColor}
               />
            </div>
            <div className='basis-1/2'>
               <DemorasChart
                  name={monthName[parseInt(month) - 1] + ' ' + year}
                  data={chartDemoras}
               />
            </div>
         </div>
         <div className='flex'>
            <div className='basis-1/2'>
               <DetallChart
                  name={monthName[parseInt(month) - 1] + ' ' + year}
                  data={chartDemorasSector}
                  setterProfessional={setProfessional}
                  setterColor={setColor}
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

export function DemorasTable({ date, data, sectors }: any) {
   let columns: any = [{
      name: 'Centre',
      selector: (row: any) => row.centroName,
      sortable: true,
      grow: 3,
      style: { fontSize: 'var(--table-font)', backgroundColor: '', color: '' },
   }];

   sectors.map((sec: any) => {
      columns.push({
         name: sec,
         selector: (row: any) => row[sec.replaceAll(' ', '_')],
         sortable: false,
         minWidth: '30px',
         compact: true,
         center: true,
         wrap: true,
         grow: 1,
         style: { fontSize: 'var(--table-font)', backgroundColor: '', color: '' },
      });
   });

   createThemes();

   return (
      <div className='flex-col grow'>
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