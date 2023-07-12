'use client'
import React from 'react';
import DataTable from 'react-data-table-component';
import { createThemes } from "@/styles/themes"

export function ProfessionalsTable({ data, professionals }: any) {

   let columns: any = [{
      name: 'Indicador',
      selector: (row: any) => row.Indicador,
      sortable: false,
      grow: 7,
      minWidth: '400px',
      style: { fontSize: 'var(--table-font)', backgroundColor: '', color: '' },
   }];

   professionals.map((prof: any) => {
      columns.push({
         name: prof,
         selector: (row: any) => row[prof],
         sortable: false,
         minWidth: '30px',
         compact: true,
         center: true,
         wrap: true,
         grow: 1,
         style: { fontSize: '', backgroundColor: '', color: '' },
         conditionalCellStyles: [
            {
               when: (row: any) => {
                  if (!row.Invers) {
                     if (row[prof] >= row.Objectiu) return true
                     else return false
                  } else {
                     if (row[prof] <= row.Objectiu.replace(/\D/g, '')) return true
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
                     if (row[prof] <= row.Objectiu) return true
                     else return false
                  } else {
                     if (row[prof] >= row.Objectiu.replace(/\D/g, '')) return true
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
      })
   });

   columns.push({
      name: 'Objectiu',
      selector: (row: any) => row.Objectiu,
      sortable: false,
      minWidth: '30px',
      compact: true,
      center: true,
      wrap: true,
      grow: 1,
      style: { fontSize: '', backgroundColor: 'var(--bg-light)', color: 'var(--text-color)' }
   })

   let tableData: any = [];
   for (const [key, indicador] of (Object.entries(data) as [string, any][])) {
      let fila: { [k: string]: any } = {
         id: key,
         Indicador: `${indicador[0].identificador} - ${indicador[0].indicador}`,
         Objectiu: (indicador[0].objectiu) ? ((indicador[0].invers) ? `< ${indicador[0].objectiu}` : indicador[0].objectiu) : '',
         Invers: indicador[0].invers
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
      <div className="rounded-md overflow-hidden mb-5">
         <DataTable
            className=''
            columns={columns}
            data={tableData}
            theme={'custom'}
         />
      </div>
   )
};
