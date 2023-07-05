'use client'
import React from 'react';
import DataTable from 'react-data-table-component';
import { createThemes } from "@/styles/themes"


export function ProfesionalsTable({ data, profesionals }: any) {

   let columns: any = [{
      name: 'Indicador',
      selector: (row: any) => row.Indicador,
      sortable: false,
      grow: 6,
      style: { fontSize: '16px', backgroundColor: '', color: '' },
   }];

   profesionals.map((prof: any) => {
      columns.push({
         name: prof,
         selector: (row: any) => row[prof],
         sortable: false,
         minWidth: '30px',
         maxWidth: '100px',
         compact: true,
         center: true,
         allowOverflow: true,
         grow: 1,
         style: { fontSize: '', backgroundColor: '', color: '' },
         conditionalCellStyles: [
            {
               when: (row: any) => {
                  let objetivo = (row.Objectiu != null && row.Objectiu[0] == '<') ? -row.Objectiu.substring(1) : row.Objectiu;

                  if (objetivo > 0 && row[prof] >= Math.abs(objetivo)) return true;
                  else if (objetivo < 0 && row[prof] <= Math.abs(objetivo)) return true;
                  else return false
               },
               style: {
                  backgroundColor: 'var(--green)',
                  color: 'var(--white)'
               },
            },
            {
               when: (row: any) => {
                  let objetivo = (row.Objectiu != null && row.Objectiu[0] == '<') ? -row.Objectiu.substring(1) : row.Objectiu;

                  if (objetivo > 0 && row[prof] <= Math.abs(objetivo)) return true;
                  else if (objetivo < 0 && row[prof] >= Math.abs(objetivo)) return true
                  else return false

               },
               style: {
                  backgroundColor: 'var(--red)',
                  color: 'var(--white)'
               },
            },
            {
               when: (row: any): any => row.Objectiu == null,
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
      maxWidth: '100px',
      compact: true,
      center: true,
      allowOverflow: true,
      grow: 1,
      style: { fontSize: '', backgroundColor: 'var(--bg-light)', color: 'var(--text-color)' }
   })

   let tableData: any = [];
   for (const [key, indicador] of (Object.entries(data) as [string, any][])) {
      let fila: { [k: string]: any } = {
         id: key,
         Indicador: key,
         Objectiu: (indicador[0].objectiu < 0) ? `<${Math.abs(indicador[0].objectiu)}` : indicador[0].objectiu
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
