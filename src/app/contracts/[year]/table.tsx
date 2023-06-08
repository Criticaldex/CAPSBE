'use client'
import React from 'react';
import DataTable from 'react-data-table-component';
import { Chart } from "./[center]/chart";

const ExpandedComponent = ({ data }: any) => {
   const infoChart = data.values.map((i: any) => {
      return {
         name: i.name,
         data: i.data.map((res: string) => parseFloat(res.replaceAll(',', '.')))
      }
   })
   return (
      <Chart
         name={data.id}
         data={infoChart}
      />
   );
}

export function ContractsTable({ data, centros }: any) {

   let columns = [{
      name: 'Indicador',
      selector: (row: any) => row.Indicador,
      sortable: false,
      grow: 7,
      style: {
         fontSize: '16px'
      }
   }];

   centros.map((centro: any, i: number) => {
      columns.push({
         name: centro.name,
         selector: row => row[centro.name],
         sortable: false,
         grow: 1,
         style: { fontSize: '' }
      })
   });

   columns.push({
      name: 'Objectiu',
      selector: row => row.Objectiu
   })

   let tableData: any = [];
   for (const [key, value] of Object.entries(data)) {
      let indicador: { [k: string]: any } = { id: key, Indicador: key, values: [], Objectiu: value[0].Objectiu };
      centros.forEach((centro: { name: string | number; id: string | number; }, i: any) => {
         indicador[centro.name] = value[centro.id].Resultat[value[centro.id].Resultat.length - 1];
         indicador.values[centro.id] = {};
         indicador.values[centro.id].data = value[centro.id].Resultat;
         indicador.values[centro.id].name = centro.name;
      });
      tableData.push(indicador);
   }

   const conditionalRowStyles = [
      {
         when: (row: any) => parseFloat(row['Sarrià'].replace(',', '.')) < 65,
         style: {
            backgroundColor: 'rgba(63, 195, 128, 0.9)',
            color: 'white',
            '&:hover': {
               cursor: 'pointer',
            },
         },
      },
      {
         when: (row: any) => parseFloat(row['Sarrià'].replace(',', '.')) >= 65 && parseFloat(row['Sarrià'].replace(',', '.')) <= 85,
         style: {
            backgroundColor: 'rgba(248, 148, 6, 0.9)',
            color: 'white',
            '&:hover': {
               cursor: 'pointer',
            },
         },
      },
      {
         when: (row: any) => parseFloat(row['Sarrià'].replace(',', '.')) > 85,
         style: {
            backgroundColor: 'rgba(242, 38, 19, 0.9)',
            color: 'white',
         },
      },
   ];

   return (
      <div className="border rounded-lg overflow-hidden shadow-lg basis-1/2">
         <DataTable
            columns={columns}
            data={tableData}
            conditionalRowStyles={conditionalRowStyles}
            theme={'dark'}
            expandableRows
            expandableRowsHideExpander
            expandOnRowClicked
            expandableRowsComponent={ExpandedComponent}
         />
      </div>
   )

};
