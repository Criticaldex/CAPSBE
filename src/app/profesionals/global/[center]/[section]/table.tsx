'use client'
import React from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';

export function ProfesionalsTable({ data, profesionals }: any) {

   let columns = [{
      name: 'Indicador',
      selector: (row: any) => row.Indicador,
      sortable: false,
      grow: 7,
      style: { fontSize: '16px', backgroundColor: '', color: '' },
      conditionalCellStyles: [{
         when: (row: any) => true, // Agrega la propiedad "when" con una condición apropiada
         style: {
            backgroundColor: 'white',
            color: 'black'
         },
      }]
   }];

   profesionals.map((prof: any) => {
      columns.push({
         name: prof,
         selector: row => row[prof],
         sortable: false,
         grow: 1,
         style: { fontSize: '', backgroundColor: '', color: '' },
         conditionalCellStyles: [
            {
               when: (row: any) => {
                  let objetivo = (row.Objectiu != null && row.Objectiu[0] == '<') ? -row.Objectiu.substring(1) : row.Objectiu;

                  if (objetivo > 0 && row[prof] >= Math.abs(objetivo)) return true;
                  else {
                     if (objetivo < 0 && row[prof] <= Math.abs(objetivo)) return true;
                     else return false
                  }
               },
               style: {
                  backgroundColor: 'rgba(63, 195, 128, 0.9)',
                  color: 'white'
               },
            },
            {
               when: (row: any) => {
                  let objetivo = (row.Objectiu != null && row.Objectiu[0] == '<') ? -row.Objectiu.substring(1) : row.Objectiu;

                  if (objetivo > 0 && row[prof] <= Math.abs(objetivo)) return true;
                  else {
                     if (objetivo < 0 && row[prof] >= Math.abs(objetivo)) return true
                     else return false
                  }
               },
               style: {
                  backgroundColor: 'rgba(242, 38, 19, 0.9)',
                  color: 'white'
               },
            },
            {
               when: (row: any): any => row.Objectiu == null,
               style: {
                  backgroundColor: '#DDDDDD',
                  color: 'black',
               },
            },
         ]
      })
   });

   columns.push({
      name: 'Objectiu',
      selector: row => row.Objectiu,
      sortable: false,
      grow: 1,
      style: { fontSize: '', backgroundColor: '#666666', color: 'white' },
      conditionalCellStyles: [{
         when: () => true, // Agrega la propiedad "when" con una condición apropiada
         style: {
            backgroundColor: 'rgba(255,255,255, 1)',
            color: 'black'
         },
      }]
   })

   let tableData: any = [];
   for (const [key, indicador] of (Object.entries(data) as [string, any][])) {
      //let objetivo = (value[0].Objectiu < 0) ? `<${Math.abs(value[0].Objectiu)}` : value[0].Objectiu;
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

   return (
      <div className="rounded-lg overflow-hidden bg-body mb-5">
         <DataTable
            className='max-w-full shadow-lg'
            columns={columns}
            data={tableData}
            // conditionalRowStyles={conditionalRowStyles}
            theme={'dark'}
         />
      </div>
   )

};
