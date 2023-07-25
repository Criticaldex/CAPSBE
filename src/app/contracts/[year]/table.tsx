'use client'
import React from 'react';
import DataTable from 'react-data-table-component';
import { Chart } from "./[center]/chart";
import { createThemes } from "@/styles/themes"

const ExpandedComponent = ({ data }: any) => {
   const infoChart = data.values.map((i: any) => {
      return {
         name: i.name,
         data: i.data
      }
   })
   return (
      <Chart
         name={data.id}
         data={infoChart}
         objectiu={data.objectiu}
         invers={data.invers}
      />
   );
}

export function ContractsTable({ data, centros }: any) {
   let columns: any = [{
      name: 'Indicador',
      selector: (row: any) => row.Indicador,
      sortable: false,
      grow: 7,
      style: { fontSize: 'var(--table-font)', backgroundColor: '', color: '' },
      conditionalCellStyles: [
         // {
         //    when: (row: any) => {
         //       let pasaObjetivo = 0;
         //       let objetivo = (row.objectiu && row.invers) ? -row.objectiu : row.objectiu;
         //       centros.forEach((centro: { name: string | number; id: string | number; }, i: any) => {
         //          if (objetivo > 0) {
         //             if (row[centro.name] >= objetivo) pasaObjetivo++;
         //          } else {
         //             if (row[centro.name] <= objetivo) pasaObjetivo++;
         //          }
         //       })
         //       if (pasaObjetivo == 2) {
         //          return true;
         //       } return false;

         //    },
         //    style: {
         //       backgroundColor: 'var(--green)',
         //       color: 'var(--white)',
         //    },
         // },
         // {
         //    when: (row: any) => {
         //       let pasaObjetivo = 0;
         //       let objetivo = (row.objectiu != null && row.objectiu[0] == '<') ? -row.objectiu.substring(1) : row.objectiu
         //       centros.forEach((centro: { name: string | number; id: string | number; }, i: any) => {
         //          if (parseFloat(row[centro.name].replace(',', '.')) >= Math.abs(objetivo)) pasaObjetivo.push(true)
         //          else pasaObjetivo.push(false)
         //       });

         //       if (pasaObjetivo.includes(false) && pasaObjetivo.includes(true)) return true
         //    },
         //    style: {
         //       backgroundColor: 'var(--orange)',
         //       color: 'var(--white)',
         //    },
         // },
         // {
         //    when: (row: any) => {
         //       let pasaObjetivo = 0;
         //       let objetivo = (row.objectiu != null && row.objectiu[0] == '<') ? -row.objectiu.substring(1) : row.objectiu
         //       centros.forEach((centro: { name: string | number; id: string | number; }, i: any) => {
         //          if (parseFloat(row[centro.name].replace(',', '.')) <= Math.abs(objetivo)) pasaObjetivo.push(true)
         //          else pasaObjetivo.push(false)
         //       });

         //       if (objetivo > 0) {
         //          if (!pasaObjetivo.includes(false)) {
         //             return true
         //          }
         //       } else if (!pasaObjetivo.includes(true)) return true
         //    },
         //    style: {
         //       backgroundColor: 'var(--red)',
         //       color: 'var(--white)'
         //    },
         // },
         // {
         //    when: (row: any): any => row.objectiu == null,
         //    style: {
         //       backgroundColor: '',
         //       color: '',
         //    },
         // }
      ]
   }];

   centros.map((centro: any) => {
      columns.push({
         name: centro.name,
         cell: (row: any) => (
            <div title={row.objectiu}>
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
                  // let objetivo = (row.objectiu && row.invers) ? -row.objectiu : row.objectiu;
                  if (!row.invers) {
                     if (row[centro.name] >= row.objectiu) return true
                     else return false
                  } else {
                     if (row[centro.name] <= row.objectiu.replace(/\D/g, '')) return true
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
                  // let objetivo = (row.objectiu && row.invers) ? -row.objectiu : row.objectiu;
                  if (!row.invers) {
                     if (row[centro.name] <= row.objectiu) return true
                     else return false
                  } else {
                     if (row[centro.name] >= row.objectiu.replace(/\D/g, '')) return true
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
                  if (row.objectiu) {
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
      let objetivo = (value[0].invers) ? `<${value[0].objectiu}` : value[0].objectiu;
      let indicador: { [k: string]: any } = { id: key, Indicador: key, values: [], objectiu: objetivo };
      centros.forEach((centro: { name: string | number; id: string | number; }, i: any) => {
         indicador.Indicador = `${value[centro.id].identificador} - ${value[centro.id].indicador}`;
         indicador[centro.name] = value[centro.id].resultat[value[centro.id].resultat.length - 1];
         indicador.invers = value[centro.id].invers;
         //values for the chart
         indicador.values[centro.id] = {};
         indicador.values[centro.id].data = value[centro.id].resultat;
         indicador.values[centro.id].name = centro.name;
      });
      tableData.push(indicador);
   }

   createThemes();

   return (
      <div id='tabla_contratos' className="rounded-md overflow-hidden w-1/2 bg-body">
         <DataTable
            className='shadow-xl'
            columns={columns}
            data={tableData}
            // conditionalRowStyles={conditionalRowStyles}
            theme={'custom'}
            expandableRows
            // expandableRowsHideExpander
            expandOnRowClicked
            expandableRowsComponent={ExpandedComponent}
         />
      </div>
   )
};
