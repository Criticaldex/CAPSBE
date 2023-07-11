'use client'
import React from 'react';
import DataTable from 'react-data-table-component';
import { createThemes } from "@/styles/themes";


export function ProfessionalsTable({ data, professionals, professional }: any) {

   let columns: any = [{
      name: 'Indicador',
      selector: (row: any) => row.Indicador,
      sortable: false,
      grow: 7,
      style: { fontSize: 'var(--table-font)', backgroundColor: '', color: '' }
   },
   {
      name: professional,
      selector: (row: any) => row[professional],
      sortable: false,
      grow: 1,
      style: { fontSize: '', backgroundColor: '', color: '' },
      conditionalCellStyles: [
         {
            when: (row: any) => {
               let objetivo = (row.Objectiu != null && row.Objectiu[0] == '<') ? -row.Objectiu.substring(1) : row.Objectiu;

               if (objetivo > 0 && row[professional] >= Math.abs(objetivo)) return true;
               else if (objetivo < 0 && row[professional] <= Math.abs(objetivo)) return true;
            },
            style: {
               backgroundColor: 'var(--green)',
               color: 'var(--white)'
            },
         },
         {
            when: (row: any) => {
               let objetivo = (row.Objectiu != null && row.Objectiu[0] == '<') ? -row.Objectiu.substring(1) : row.Objectiu;

               if (objetivo > 0 && row[professional] <= Math.abs(objetivo)) return true;
               else if (objetivo < 0 && row[professional] >= Math.abs(objetivo)) return true
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
   },
   {
      name: 'Objectiu',
      selector: (row: any) => row.Objectiu,
      sortable: false,
      grow: 1,
      style: { fontSize: '', backgroundColor: 'var(--bg-light)', color: 'var(--text-color)' }
   }];

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
      <div className="rounded-md overflow-hidden">
         <DataTable
            className=''
            columns={columns}
            data={tableData}
            theme={'custom'}
         />
      </div>
   )
};