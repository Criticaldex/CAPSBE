'use client'
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Chart } from "./callsChart";
import { createThemes } from "@/styles/themes"
import { getDashboardChart, getDashboardChartDays } from "@/services/calls";
import { Loading } from "@/components/loading.component";

const monthHandler = (month: number, setMonth: any, setMonthString: any, modifier: any) => (event: any) => {
   const pad = '00';
   switch (modifier) {
      case '<':
         setMonth(month - 1)
         setMonthString((pad + month).slice(-pad.length));
         break;
      case '>':
         setMonth(month + 1);
         setMonthString((pad + (month + 2)).slice(-pad.length));
         break;
      default:
         break;
   }
};

const ExpandedComponent = ({ data }: any) => {
   const pad = '00';
   const year = new Date().getFullYear().toString();
   const monthName = ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre']

   const [month, setMonth] = useState(new Date().getMonth());
   const [monthString, setMonthString] = useState((pad + (month + 1)).slice(-pad.length));
   const [detall, setDetall] = useState(null);
   const [days, setDays] = useState(null);
   const [isLoading, setLoading] = useState(true);

   console.log(data.centro);
   console.log(year);
   console.log(monthString);

   useEffect(() => {
      setLoading(true);
      getDashboardChart(year, monthString, data.centro)
         .then((res: any) => {
            setDetall(res);
            console.log(res);
            getDashboardChartDays(year, monthString, data.centro)
               .then((res: any) => {
                  setDays(res);
                  setLoading(false);
               });
         });
   }, [year, monthString, data.centro])

   if (isLoading) return <Loading />

   return (
      <>
         <div className='flex justify-center'>
            <button className='m-1 px-2 rounded-md text-textColor font-bold border border-darkBlue bg-bgDark hover:bg-bgLight' onClick={monthHandler(month, setMonth, setMonthString, '<')}>&lt;</button>
            <button className='m-1 px-2 rounded-md text-textColor font-bold border border-darkBlue bg-bgDark hover:bg-bgLight' onClick={monthHandler(month, setMonth, setMonthString, '>')}>&gt;</button>
         </div>
         <Chart
            name={monthName[month] + ' ' + year}
            data={detall}
            days={days}
         />
      </>
   );
}

export function CallsTable({ data, callsMonth, centros }: any) {
   let columns: any = [{
      name: 'Centre',
      selector: (row: any) => row.centroName,
      sortable: true,
      grow: 3,
      style: { fontSize: 'var(--table-font)', backgroundColor: '', color: '' },
   },
   {
      name: 'Abandonades',
      selector: (row: any) => row.abandoned,
      sortable: true,
      minWidth: '50px',
      right: true,
      style: { fontSize: 'var(--table-font)', backgroundColor: '', color: '' },
   },
   {
      name: 'Contestades',
      selector: (row: any) => row.answered,
      sortable: true,
      minWidth: '50px',
      right: true,
      style: { fontSize: 'var(--table-font)', backgroundColor: '', color: '' },
   },
   {
      name: 'Totals',
      selector: (row: any) => row.offered,
      sortable: true,
      minWidth: '50px',
      right: true,
      style: { fontSize: 'var(--table-font)', backgroundColor: '', color: '' },
   },
   {
      name: 'Desviades',
      selector: (row: any) => row.overflowed,
      sortable: true,
      minWidth: '50px',
      right: true,
      style: { fontSize: 'var(--table-font)', backgroundColor: '', color: '' },
   },
   {
      name: 'Temps resposta',
      selector: (row: any) => row.answered_time,
      sortable: true,
      minWidth: '50px',
      right: true,
      style: { fontSize: 'var(--table-font)', backgroundColor: '', color: '' },
   },
   {
      name: 'Temps penjada',
      selector: (row: any) => row.abandoned_time,
      sortable: true,
      minWidth: '50px',
      right: true,
      style: { fontSize: 'var(--table-font)', backgroundColor: '', color: '' },
   }];

   data.map((center: any) => {
      centros.map((centro: any) => {
         if (center.centro == centro.id) {
            center.centroName = centro.name;
         }
      });
   });


   createThemes();

   return (
      <DataTable
         columns={columns}
         data={data}
         theme={'custom'}
         expandableRows
         expandOnRowClicked
         expandableRowsComponent={ExpandedComponent}
      />
   )
};