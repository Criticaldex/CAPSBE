'use client'
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { IntervalsChart } from "./intervalsChart";
import { createThemes } from "@/styles/themes"
import { getDaysChart, getHoursChart } from "@/services/call_intervals";
import { Loading } from "@/components/loading.component";

const monthHandler = (month: number, setMonth: any, setMonthString: any, year: number, setYear: any, setYearString: any, modifier: string) => (event: any) => {
   const pad = '00';
   switch (modifier) {
      case '<':
         if (month == 0) {
            setMonth(11)
            setMonthString('12')
            setYear(year - 1)
            setYearString((year - 1).toString())
         } else {
            setMonth(month - 1)
            setMonthString((pad + month).slice(-pad.length));
         }
         break;
      case '>':
         if (month == 11) {
            setMonth(0)
            setMonthString('1')
            setYear(year + 1)
            setYearString((year + 1).toString())
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
   const pad = '00';
   // const year = new Date().getFullYear().toString();
   const monthName = ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre']

   const [month, setMonth] = useState(new Date().getMonth());
   const [day, setday] = useState(new Date().getDate());
   const [year, setYear] = useState(new Date().getFullYear());
   const [dayString, setDayString] = useState((pad + (month + 1)).slice(-pad.length));
   const [monthString, setMonthString] = useState((pad + (month + 1)).slice(-pad.length));
   const [yearString, setYearString] = useState(new Date().getFullYear().toString());
   const [detall, setDetall] = useState(null);
   const [days, setDays] = useState(null);
   const [isLoading, setLoading] = useState(true);
   const [drilldown, setDrilldown] = useState(true);

   useEffect(() => {
      console.log('year, month, centro: ', yearString, monthString, data.centro);

      getDaysChart(yearString, monthString, data.centro)
         .then((res: any) => {
            setDetall(res);
            getHoursChart(yearString, monthString, dayString, data.centro)
               .then((res: any) => {
                  setDrilldown(res);
                  setLoading(false);
               });
         });
   }, [yearString, monthString, dayString, data.centro])

   if (isLoading) return <Loading />

   return (
      <div className='flex'>
         <div className='basis-1/2'>
            <div className='flex justify-center'>
               <button className='m-1 px-2 rounded-md text-textColor font-bold border border-darkBlue bg-bgDark hover:bg-bgLight' onClick={monthHandler(month, setMonth, setMonthString, year, setYear, setYearString, '<')}>&lt;</button>
               <button className='m-1 px-2 rounded-md text-textColor font-bold border border-darkBlue bg-bgDark hover:bg-bgLight' onClick={monthHandler(month, setMonth, setMonthString, year, setYear, setYearString, '>')}>&gt;</button>
            </div>
            <IntervalsChart
               name={monthName[month] + ' ' + year}
               data={detall}
               days={days}
               drilldown={drilldown}
            />
         </div>
         <div className='basis-1/2'>
            <div className='flex justify-center'>
               <button className='cursor-not-allowed opacity-50 m-1 px-2 rounded-md text-textColor font-bold border border-darkBlue bg-bgDark hover:bg-bgLight'>&lt;</button>
               <button className='cursor-not-allowed opacity-50 m-1 px-2 rounded-md text-textColor font-bold border border-darkBlue bg-bgDark hover:bg-bgLight'>&gt;</button>
            </div>
            <IntervalsChart
               name={monthName[month] + ' ' + year}
               data={detall}
               days={days}
               drilldown={drilldown}
            />
         </div>
      </div>
   );
}

export function IntervalsTable({ date, data, centros }: any) {
   let columns: any = [{
      name: 'Centre',
      selector: (row: any) => row.centroName,
      sortable: true,
      grow: 3,
      style: { fontSize: 'var(--table-font)', backgroundColor: '', color: '' },
   }];

   data[0].titulos.forEach((element: any, i: number) => {
      columns.push({
         name: element,
         selector: (row: any) => row.answered[i] + ' / ' + row.abandoned[i],
         sortable: true,
         grow: 1,
         style: { fontSize: 'var(--table-font)', backgroundColor: '', color: '' },
      })
   });

   data.map((call: any) => {
      centros.map((centro: any) => {
         if (call.centro == centro.id) {
            call.centroName = centro.name;
         } else if (call.centro == 'GS-PEDIATRIA') {
            call.centroName = 'Pediatria';
         }
      });
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