'use client'
import React from 'react';
import DataTable from 'react-data-table-component';
import { Chart } from "./[center]/chart";

const ExpandedComponent = ({ data }: any) => {
   console.log(data);
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
      selector: row => row.Indicador,
      sortable: true,
   }];

   centros.map((centro: any, i: number) => {
      columns.push({
         name: centro.name,
         selector: row => row[centro.name],
         sortable: true,
      })
   });

   let tableData: any = [];
   for (const [key, value] of Object.entries(data)) {
      let indicador: { [k: string]: any } = { id: `${key}`, Indicador: `${key}`, values: [] };
      centros.forEach((centro: { name: string | number; id: string | number; }, i: any) => {
         indicador[centro.name] = value[centro.id].Resultat[value[centro.id].Resultat.length - 1];
         indicador.values[centro.id] = {};
         indicador.values[centro.id].data = value[centro.id].Resultat;
         indicador.values[centro.id].name = centro.name;
      });
      tableData.push(indicador);
   }

   return (
      <DataTable
         columns={columns}
         data={tableData}
         expandableRows
         expandableRowsComponent={ExpandedComponent}
      />
   )

};