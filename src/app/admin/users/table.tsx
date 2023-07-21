'use client'
import React from 'react';
import DataTable from 'react-data-table-component';
import { createThemes } from "@/styles/themes"
import $ from "jquery";

export function ContractsTable({ users, session }: any) {
   let columns: any = [
      {
         name: 'Email',
         selector: (row: any) => row.email,
         sortable: true,
         style: { fontSize: 'var(--table-font)', backgroundColor: '', color: '' },
      },
      {
         name: 'Nom',
         selector: (row: any) => row.name,
         sortable: true,
         style: { fontSize: 'var(--table-font)', backgroundColor: '', color: '' },
      },
      {
         name: 'Cognom',
         selector: (row: any) => row.lastname,
         sortable: true,
         style: { fontSize: 'var(--table-font)', backgroundColor: '', color: '' },
      },
      {
         name: 'Server',
         selector: (row: any) => row.server,
         sortable: true,
         style: { fontSize: 'var(--table-font)', backgroundColor: '', color: '' },
      },
      {
         name: 'databse',
         selector: (row: any) => row.db,
         sortable: true,
         style: { fontSize: 'var(--table-font)', backgroundColor: '', color: '' },
      },
      {
         name: 'role',
         selector: (row: any) => row.role,
         sortable: true,
         style: { fontSize: 'var(--table-font)', backgroundColor: '', color: '' },
      },
      {
         name: 'License Start',
         selector: (row: any) => row.license.start,
         sortable: true,
         style: { fontSize: 'var(--table-font)', backgroundColor: '', color: '' },
      },
      {
         name: 'License End',
         selector: (row: any) => row.license.end,
         sortable: true,
         style: { fontSize: 'var(--table-font)', backgroundColor: '', color: '' },
      },
      {
         cell: () => <button onClick={clickHandler}>Delete</button>,
         ignoreRowClick: true,
         allowOverflow: true,
         button: true,
      }
   ];

   let tableData: any = users;

   createThemes();

   return (
      <div id='tabla_usuarios' className="rounded-md overflow-hidden w-1/2 bg-body">
         <DataTable
            className='shadow-xl'
            columns={columns}
            data={tableData}
            theme={'custom'}
            onRowClicked={onRowClicked}
         />
      </div>
   )
};

function clickHandler(event: MouseEvent<HTMLButtonElement, MouseEvent>): void {
   console.log('Clicked!!!')
   // throw new Error('Function not implemented.');
}

const onRowClicked = (row: any, event: any) => {
   console.log('CLICKED row: ', row);
   document.getElementById("formEmail").value = row.email;
   document.getElementById("formName").value = row.name;
   document.getElementById("formLastname").value = row.lastname;
};

