'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import InversioIface from '@/schemas/inversio'

const columns: GridColDef<(typeof InversioIface)[]>[] = [
   {
      field: 'control_def',
      headerName: 'Control DEF',
      width: 50,
      editable: true,
   },
   {
      field: 'element_dinversio',
      headerName: "Element d'inversió",
      width: 260,
      editable: true,
   },
   {
      field: 'u',
      headerName: 'U',
      width: 30,
      editable: true,
   },
   {
      field: 'p_u',
      headerName: 'P/U',
      width: 30,
      editable: true,
   },
   {
      field: 't',
      headerName: 'T',
      type: 'number',
      width: 30,
      editable: true,
   },
   {
      field: 'unitats_definitives',
      headerName: 'Unitats definitives',
      width: 150,
      editable: true,
   },
   {
      field: 'preu_u_definitiu',
      headerName: 'Preu/u definitiu',
      width: 150,
      editable: true,
   },
   {
      field: 'total',
      headerName: 'Total',
      type: 'number',
      width: 110,
      editable: true,
   },
   {
      field: 'diferencia',
      headerName: 'Diferència',
      width: 150,
      editable: true,
   },
   {
      field: 'classificacio',
      headerName: 'Classificació',
      width: 150,
      editable: true,
   },
   {
      field: 'centre',
      headerName: 'Centre',
      width: 110,
      editable: true,
   },
   {
      field: 'contractacio',
      headerName: 'Contractació',
      width: 150,
      editable: true,
   },
   {
      field: 'previsio_execucio',
      headerName: 'Previsió execució',
      width: 150,
      editable: true,
   },
   {
      field: 'estat',
      headerName: 'Estat',
      width: 110,
      editable: true,
   },
   {
      field: 'data_compra',
      headerName: 'Data Compra',
      width: 150,
      editable: true,
   },
   {
      field: 'data_entrega',
      headerName: 'Data Entrega',
      width: 150,
      editable: true,
   },
   {
      field: 'data_factura',
      headerName: 'Data Factura',
      width: 110,
      editable: true,
   },
   {
      field: 'n_factura',
      headerName: 'Nº Factura',
      width: 150,
      editable: true,
   },
   {
      field: 'proveidor',
      headerName: 'Proveïdor',
      width: 150,
      editable: true,
   }
];

export function AdminTable({ data, session }: any) {

   return (
      <Box sx={{ height: '100%', width: '100%' }}>
         <DataGrid
            rows={data}
            columns={columns}
            initialState={{
               pagination: {
                  paginationModel: {
                     pageSize: 10,
                  },
               },
            }}
            sx={{
               border: 2,
               color: 'var(--text-color)',
               borderColor: 'var(--text-color)',
               '& .MuiDataGrid-cell:hover': {
                  color: 'var(--text-color)',
               },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
         />
      </Box>
   );
}