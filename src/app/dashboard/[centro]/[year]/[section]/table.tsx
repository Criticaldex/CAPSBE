'use client'
import React from 'react';
import DataTable from 'react-data-table-component';
import { Eqa } from "../eqa";
import { createThemes } from "@/styles/themes"

const ExpandedComponent = ({ data }: any) => {
   const infoChart = data.values.map((i: any) => {
      return {
         name: i.name,
         data: i.data
      }
   })

   return (
      <Eqa
         name={data.id}
         data={infoChart}
         objectiu={data.objectiu}
         invers={data.invers}
      />
   );
}

export function DashboardTable({ data, centros }: any) {
   let columns: any = [{
      name: 'Indicador',
      selector: (row: any) => row.Indicador,
      sortable: false,
      grow: 7,
      style: { fontSize: 'var(--table-font)', backgroundColor: '', color: '' },
   }];

   centros.map((centro: any) => {
      columns.push({
         name: centro.name,
         cell: (row: any) => (
            <div className={`${row.objectiu == '' ? '' : 'tags'} w-full text-center`} data-tag="allowRowEvents" data-gloss={`Objectiu: ${row.objectius[centro.name]}`}>
               {row[centro.name]}
            </div>
         ),
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
                  if (!row.invers[centro.name]) {
                     if (row[centro.name] >= row.objectius[centro.name]) return true
                     else return false
                  } else {
                     console.log('row: ', row);

                     if (row[centro.name] <= row.objectius[centro.name].replace(/\D/g, '')) return true
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
                  if (!row.invers[centro.name]) {
                     if (row[centro.name] <= row.objectius[centro.name]) return true
                     else return false
                  } else {
                     if (row[centro.name] >= row.objectius[centro.name].replace(/\D/g, '')) return true
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
                  if (row.objectius[centro.name]) {
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

   let tableData: any = [];
   for (const [key, value] of (Object.entries(data) as [string, any][])) {
      let obj = (value[0].objectiu) ? ((value[0].invers) ? `<${value[0].objectiu}` : value[0].objectiu) : '';
      let indicador: { [k: string]: any } = { id: key, Indicador: '', values: [], objectius: {}, invers: {} };
      centros.forEach((centro: { name: string | number; id: string | number; }, i: any) => {
         value.forEach((val: any) => {
            if (val.centre == centro.id) {
               const ind = (val.codi) ? val.codi : val.identificador;
               indicador.Indicador = `${ind} - ${val.indicador}`;
               indicador[centro.name] = val.resultat[val.resultat.length - 1];
               indicador.objectius[centro.name] = (val.objectiu) ? ((val.invers) ? `<${val.objectiu}` : val.objectiu) : '';
               indicador.invers[centro.name] = val.invers;
               //values for the chart
               indicador.values[centro.id] = {};
               indicador.values[centro.id].data = val.resultat;
               indicador.values[centro.id].name = centro.name;
            }
         });
      });
      tableData.push(indicador);
   }

   createThemes();

   return (
      <DataTable
         columns={columns}
         data={tableData}
         theme={'custom'}
         expandableRows
         expandOnRowClicked
         expandableRowsComponent={ExpandedComponent}
      />
   )
};