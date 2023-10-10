'use client'
import React from 'react';
import DataTable from 'react-data-table-component';
import { createThemes } from "@/styles/themes";
import { Loading } from '@/components/loading.component';

const ExpandedComponent = ({ data }: any) => {
   console.log('data: ', data);

   if (data.subtaula) {
      let tableData: any = [];
      for (const [key, indicador] of (Object.entries(data.subtaula) as [string, any][])) {
         let fila: { [k: string]: any } = {
            id: key,
            Indicador: `${indicador[0].identificador} - ${indicador[0].indicador}`,
            Objectiu: (indicador[0].objectiu) ? ((indicador[0].invers) ? `< ${indicador[0].objectiu}` : indicador[0].objectiu) : '',
            Invers: indicador[0].invers,
            any: indicador[0].any,
            centre: indicador[0].centre,
            sector: indicador[0].sector
         };

         indicador.map((centre: any) => {
            for (const [key, prof] of (Object.entries(centre.professionals) as [string, any][])) {
               fila[key] = prof[Object.keys(prof)[Object.keys(prof).length - 1]];
            }
         });
         tableData.push(fila);
      }
      createThemes();

      return (
         <div className="flex rounded-md m-1 ml-12 border-2 border-darkBlue">
            <DataTable
               className=''
               columns={data.columns}
               data={tableData}
               theme={'custom'}
            />
         </div>
      )
   }
   return <Loading />
}

export function ProfessionalsTable({ data, professional }: any) {

   let columns: any = [{
      name: 'Indicador',
      selector: (row: any) => row.Indicador,
      sortable: false,
      grow: 7,
      style: { fontSize: 'var(--table-font)', backgroundColor: '', color: '' }
   },
   {
      name: professional,
      cell: (row: any) => (
         <div className={`${row.Objectiu == '' ? '' : 'tags'} w-full text-center`} data-gloss={`Objectiu: ${row.Objectiu}`}>
            {row[professional]}
         </div>
      ),
      sortable: false,
      grow: 1,
      style: { fontSize: '', backgroundColor: '', color: '' },
      conditionalCellStyles: [
         {
            when: (row: any) => {
               if (!row.Invers) {
                  if (row[professional] >= row.Objectiu) return true
                  else return false
               } else {
                  if (row[professional] <= row.Objectiu.replace(/\D/g, '')) return true
                  else return false
               }
            },
            style: {
               backgroundColor: 'var(--green)',
               color: 'var(--white)',
            },
         },
         {
            when: (row: any) => {
               if (!row.Invers) {
                  if (row[professional] <= row.Objectiu) return true
                  else return false
               } else {
                  if (row[professional] >= row.Objectiu.replace(/\D/g, '')) return true
                  else return false
               }
            },
            style: {
               backgroundColor: 'var(--red)',
               color: 'var(--white)'
            },
         },
         {
            when: (row: any): any => {
               if (row.Objectiu) {
                  return false;
               }
               return true;
            },
            style: {
               backgroundColor: '',
               color: '',
            },
         }
      ]
   }];

   let tableData: any = [];
   for (const [key, indicador] of (Object.entries(data) as [string, any][])) {
      let fila: { [k: string]: any } = {
         id: key,
         Indicador: key,
         Objectiu: (indicador[0].objectiu) ? ((indicador[0].invers) ? `< ${indicador[0].objectiu}` : indicador[0].objectiu) : '',
         Invers: indicador[0].invers,
         disabled: true
      };

      if (indicador[0].subtaula) {
         fila.subtaula = indicador[0].subtaula;
         fila.columns = columns;
         fila.disabled = false;
      }

      indicador.map((centre: any) => {
         for (const [key, prof] of (Object.entries(centre.professionals) as [string, any][])) {
            fila[key] = prof[Object.keys(prof)[Object.keys(prof).length - 1]];
         }
      });
      tableData.push(fila);
   }
   createThemes();

   return (
      <div className="rounded-md overflow-hidden pl-2">
         <DataTable
            className=''
            columns={columns}
            data={tableData}
            theme={'custom'}
            expandableRows
            expandOnRowClicked
            expandableRowDisabled={(row: any) => row.disabled}
            expandableRowsComponent={ExpandedComponent}
         />
      </div>
   )
};