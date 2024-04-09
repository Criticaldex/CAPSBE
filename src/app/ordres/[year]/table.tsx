'use client'

import DataTable from "react-data-table-component";
import { OrdresChart } from "./chart";
import { createThemes } from "@/styles/themes";

export default function OrdresTable({ data, centros }: any) {

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
            <div data-tag="allowRowEvents" >
               {row[centro.name]}
            </div>
         ),
         sortable: false,
         minWidth: '30px',
         compact: true,
         center: true,
         wrap: true,
         grow: 1,
      })
   });

   let tableData: any = [];
   for (const [key, value] of (Object.entries(data) as [string, any][])) {
      let indicador: { [k: string]: any } = { id: key, Indicador: '', values: [], };
      centros.forEach((centro: { name: string | number; id: string | number; }, i: any) => {
         value.forEach((val: any) => {
            if (val.centre == centro.id) {
               const ind = val.identificador;
               indicador.Indicador = `${ind} - ${val.indicador}`;
               indicador[centro.name] = val.resultat[val.resultat.length - 1];
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
         persistTableHead
      />
   )
}

const ExpandedComponent = ({ data }: any) => {
   const infoChart = data.values.map((i: any) => {
      return {
         name: i.name,
         data: i.data
      }
   })

   return (
      <OrdresChart
         name={data.id}
         data={infoChart}
         objectius={data.objectius}
      />
   );
}