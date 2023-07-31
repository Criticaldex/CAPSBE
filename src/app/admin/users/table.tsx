'use client'
import React from 'react';
import DataTable from 'react-data-table-component';
import { createThemes } from "@/styles/themes"
import { UsersForm } from "./form";

export function AdminTable({ users, session }: any) {
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
         name: 'Accions',
         cell: (row: any) => (
            <div className='flex flex-col'>
               <button onClick={editHandler(row)}>Edit</button>
               <button onClick={deleteHandler(row)}>Delete</button>
            </div>
         ),
         ignoreRowClick: true,
         button: true,
      }
   ];

   let tableData: any = users;

   createThemes();

   return (
      <DataTable
         columns={columns}
         data={tableData}
         theme={'custom'}
      />
   )
};

const editHandler = (row: any) => (event: any) => {
   console.log('EDIT:', row);
   const form = document.getElementById('userForm');
   form.setValue("name", "Grace")
}

const deleteHandler = (row: any) => (event: any) => {
   console.log('DELETE: ', row)
}

