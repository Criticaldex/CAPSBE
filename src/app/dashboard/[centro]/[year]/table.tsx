'use client'
import React from 'react';
import DataTable from 'react-data-table-component';
import { Chart } from "./chart";
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
         objectiu={0}
         invers={data.invers}
      />
   );
}

export function CallsTable({ data, centros }: any) {
   let columns: any = [{
      name: 'Centre',
      selector: (row: any) => row.centro,
      sortable: true,
      grow: 5,
      style: { fontSize: 'var(--table-font)', backgroundColor: '', color: '' },
   },
   {
      name: 'abandoned',
      selector: (row: any) => row.abandoned,
      sortable: true,
      minWidth: '50px',
      wrap: true,
      grow: 2,
      style: { fontSize: 'var(--table-font)', backgroundColor: '', color: '' },
   },
   {
      name: 'answered',
      selector: (row: any) => row.answered,
      sortable: true,
      minWidth: '50px',
      wrap: true,
      grow: 2,
      style: { fontSize: 'var(--table-font)', backgroundColor: '', color: '' },
   },
   {
      name: 'offered',
      selector: (row: any) => row.offered,
      sortable: true,
      minWidth: '50px',
      wrap: true,
      grow: 2,
      style: { fontSize: 'var(--table-font)', backgroundColor: '', color: '' },
   },
   {
      name: 'overflowed',
      selector: (row: any) => row.overflowed,
      sortable: true,
      minWidth: '50px',
      wrap: true,
      grow: 2,
      style: { fontSize: 'var(--table-font)', backgroundColor: '', color: '' },
   },
   {
      name: 'answered_time',
      selector: (row: any) => row.answered_time,
      sortable: true,
      minWidth: '50px',
      wrap: true,
      grow: 2,
      style: { fontSize: 'var(--table-font)', backgroundColor: '', color: '' },
   },
   {
      name: 'abandoned_time',
      selector: (row: any) => row.abandoned_time,
      sortable: true,
      minWidth: '50px',
      wrap: true,
      grow: 2,
      style: { fontSize: 'var(--table-font)', backgroundColor: '', color: '' },
   }];

   data.map((center: any) => {
      centros.map((centro: any) => {
         if (center.centro == centro.id) {
            center.centro = centro.name;
         }
      });
   });

   createThemes();

   return (
      <DataTable
         columns={columns}
         data={data}
         theme={'custom'}
      // expandableRows
      // expandOnRowClicked
      //expandableRowsComponent={ExpandedComponent}
      />
   )
};