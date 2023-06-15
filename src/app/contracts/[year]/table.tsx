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
         objectiu={data.Objectiu}
      />
   );
}

export function ContractsTable({ data, centros }: any) {

   let columns = [{
      name: 'Indicador',
      selector: (row: any) => row.Indicador,
      sortable: false,
      grow: 7,
      style: { fontSize: '16px', backgroundColor: '', color: '' }
   }];

   centros.map((centro: any) => {
      columns.push({
         name: centro.name,
         selector: row => row[centro.name],
         sortable: false,
         grow: 1,
         style: { fontSize: '', backgroundColor: '', color: '' }
      })
   });

   columns.push({
      name: 'Objectiu',
      selector: row => row.Objectiu,
      sortable: false,
      grow: 1,
      style: { fontSize: '', backgroundColor: '#666666', color: 'white' }
   })

   let tableData: any = [];
   for (const [key, value] of (Object.entries(data) as [string, any][])) {
      let objetivo = (value[0].Objectiu < 0) ? `<${Math.abs(value[0].Objectiu)}` : value[0].Objectiu;
      let indicador: { [k: string]: any } = { id: key, Indicador: key, values: [], Objectiu: objetivo };
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
         when: (row: any) => {
            let pasaObjetivo: boolean[] = []
            let objetivo = (row.Objectiu != null && row.Objectiu[0] == '<') ? -row.Objectiu.substring(1) : row.Objectiu;

            centros.forEach((centro: { name: string | number; id: string | number; }, i: any) => {
               if (parseFloat(row[centro.name].replace(',', '.')) >= Math.abs(objetivo)) pasaObjetivo.push(true)
               else pasaObjetivo.push(false)
            });

            if (objetivo > 0 && !pasaObjetivo.includes(false)) return true
            else if (!pasaObjetivo.includes(true)) return true
         },
         style: {
            backgroundColor: 'rgba(63, 195, 128, 0.9)',
            color: 'white'
         },
      },
      {
         when: (row: any) => {
            let pasaObjetivo: boolean[] = []
            let objetivo = (row.Objectiu != null && row.Objectiu[0] == '<') ? -row.Objectiu.substring(1) : row.Objectiu
            centros.forEach((centro: { name: string | number; id: string | number; }, i: any) => {
               if (parseFloat(row[centro.name].replace(',', '.')) >= Math.abs(objetivo)) pasaObjetivo.push(true)
               else pasaObjetivo.push(false)
            });

            if (pasaObjetivo.includes(false) && pasaObjetivo.includes(true)) return true
         },
         style: {
            backgroundColor: 'rgba(248, 148, 6, 0.9)',
            color: 'white'
         },
      },
      {
         when: (row: any) => {
            let pasaObjetivo: boolean[] = []
            let objetivo = (row.Objectiu != null && row.Objectiu[0] == '<') ? -row.Objectiu.substring(1) : row.Objectiu
            centros.forEach((centro: { name: string | number; id: string | number; }, i: any) => {
               if (parseFloat(row[centro.name].replace(',', '.')) <= Math.abs(objetivo)) pasaObjetivo.push(true)
               else pasaObjetivo.push(false)
            });

            if (objetivo > 0) {
               if (!pasaObjetivo.includes(false)) {
                  return true
               }
            } else if (!pasaObjetivo.includes(true)) return true
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
      }
   ];

   return (
      <div className="rounded-lg overflow-hidden basis-1/2 bg-body">
         <DataTable
            className='max-w-full shadow-lg'
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
