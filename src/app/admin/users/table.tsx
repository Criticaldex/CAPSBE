'use client'
import { Dispatch, SetStateAction, useState } from 'react';
import DataTable from 'react-data-table-component';
import { createThemes } from "@/styles/themes"
import { UsersForm } from "@/components/userForm.component";
import { UserIface } from "@/schemas/user";
import { Path, useForm, UseFormSetValue, UseFormRegister, SubmitHandler, UseFormReset } from "react-hook-form";

export function AdminTable({ users, session }: any) {

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors }
   } = useForm<UserIface>();

   const onSubmit: SubmitHandler<UserIface> = data => {
      alert(JSON.stringify(data));
   };

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
               <button onClick={editHandler(row, reset)}>Edit</button>
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
      <div className="flex flex-row flex-nowrap justify-between mt-2">
         <div className="flex mr-2 basis-3/4 rounded-md">
            <DataTable
               columns={columns}
               data={tableData}
               theme={'custom'}
            />
         </div>
         <div className="flex basis-1/4 rounded-md bg-light">
            <UsersForm
               register={register}
               handleSubmit={handleSubmit}
            />
         </div>
      </div>
   )
};

const editHandler = (
   row: UserIface,
   reset: UseFormReset<UserIface>
) => (event: any) => {
   // console.log('EDIT:', row);
   reset(row)
}

const deleteHandler = (row: any) => (event: any) => {
   console.log('DELETE: ', row)
}

