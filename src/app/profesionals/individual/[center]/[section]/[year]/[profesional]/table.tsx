'use client'
import React from 'react';
import DataTable from 'react-data-table-component';
import { createThemes } from "@/app/styles/themes"


export function ProfesionalsTable({ data, profesionals, profesional }: any) {

   let columns = [{
      name: 'Indicador',
      selector: (row: any) => row.Indicador,
      sortable: false,
      grow: 7,
      style: { fontSize: '16px', backgroundColor: '', color: '' }
   },
   {
      name: profesional,
      selector: (row: any) => row[profesional],
      sortable: false,
      grow: 1,
      style: { fontSize: '', backgroundColor: '', color: '' }
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
         Objectiu: indicador[0].objectiu
      };

      indicador.map((centre: any) => {
         for (const [key, prof] of (Object.entries(centre.professionals) as [string, any][])) {
            fila[key] = prof[Object.keys(prof)[Object.keys(prof).length - 1]];

         }
      });
      tableData.push(fila);
   }

   const conditionalRowStyles = [
      {
         when: (row: any) => {
            let objetivo = (row.Objectiu != null && row.Objectiu[0] == '<') ? -row.Objectiu.substring(1) : row.Objectiu;

            if (row[profesional] >= Math.abs(objetivo)) return true;
            else return false;
         },
         style: {
            backgroundColor: 'var(--green);',
            color: 'var(--white);'
         },
      },
      {
         when: (row: any) => {
            let objetivo = (row.Objectiu != null && row.Objectiu[0] == '<') ? -row.Objectiu.substring(1) : row.Objectiu;

            if (row[profesional] <= Math.abs(objetivo)) return true;
         },
         style: {
            backgroundColor: 'var(--red);',
            color: 'var(--white);'
         },
      },
      {
         when: (row: any): any => row.Objectiu == null,
         style: {
            backgroundColor: '#DDDDDD',
            color: 'black',
         },
      }
   ];

   createThemes();

   return (
      <div className="rounded-lg overflow-hidden basis-1/2">
         <DataTable
            className=''
            columns={columns}
            data={tableData}
            conditionalRowStyles={conditionalRowStyles}
            theme={'custom'}
         />
      </div>
   )
};
