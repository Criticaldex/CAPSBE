/* eslint-disable react/jsx-key */
'use client'
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
   GridRowsProp,
   GridRowModesModel,
   GridRowModes,
   DataGrid,
   GridColDef,
   GridToolbarContainer,
   GridActionsCellItem,
   GridEventListener,
   GridRowId,
   GridRowModel,
   GridRowEditStopReasons,
   GridSlots,
} from '@mui/x-data-grid';
import InversioIface from '@/schemas/inversio'

interface EditToolbarProps {
   setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
   setRowModesModel: (
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
   ) => void;
}

function EditToolbar(props: EditToolbarProps) {
   const { setRows, setRowModesModel } = props;

   const handleClick = () => {
      const id = 0;
      setRows((oldRows) => [...oldRows, { id: '0', control_def: '', element_dinversio: '', isNew: true }]);
      setRowModesModel((oldModel) => ({
         ...oldModel,
         [id]: { mode: GridRowModes.Edit, fieldToFocus: 'control_def' },
      }));
   };

   return (
      <GridToolbarContainer>
         <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
            Add record
         </Button>
      </GridToolbarContainer>
   );
}

export function AdminTable({ data, session }: any) {
   const [rows, setRows] = useState(data);
   const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

   const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
      if (params.reason === GridRowEditStopReasons.rowFocusOut) {
         event.defaultMuiPrevented = true;
      }
   };

   const handleEditClick = (id: GridRowId) => () => {
      console.log('rowModesModelPre: ', rowModesModel);
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
      console.log('rowModesModel: ', rowModesModel);

   };

   const handleSaveClick = (id: GridRowId) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
   };

   const handleDeleteClick = (id: GridRowId) => () => {
      console.log('AAAAAAAAAAAAAAAAAAAA');
      setRows(rows.filter((row: typeof InversioIface) => row.id !== id));
   };

   const handleCancelClick = (id: GridRowId) => () => {
      setRowModesModel({
         ...rowModesModel,
         [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });

      const editedRow = rows.find(({ row }: any) => row.id === id);
      if (editedRow!.isNew) {
         setRows(rows.filter(({ row }: any) => row.id !== id));
      }
   };

   const processRowUpdate = (newRow: GridRowModel) => {
      const updatedRow = { ...newRow, isNew: false };
      setRows(rows.map(({ row }: any) => (row.id === newRow.id ? updatedRow : row)));
      return updatedRow;
   };

   const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
      setRowModesModel(newRowModesModel);
   };

   const columns: GridColDef<(typeof InversioIface)[]>[] = [
      {
         field: 'actions',
         type: 'actions',
         headerName: 'Actions',
         width: 100,
         cellClassName: 'actions',
         headerClassName: 'super-app-theme--header',
         getActions: ({ id }) => {
            const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

            if (isInEditMode) {
               return [
                  <GridActionsCellItem
                     icon={< SaveIcon />}
                     label="Save"
                     sx={{
                        color: 'primary.main',
                     }
                     }
                     onClick={handleSaveClick(id)}
                  />,
                  < GridActionsCellItem
                     icon={< CancelIcon />}
                     label="Cancel"
                     className="textPrimary"
                     onClick={handleCancelClick(id)}
                     color="inherit"
                  />,
               ];
            }

            return [
               <GridActionsCellItem
                  icon={<EditIcon />}
                  label="Edit"
                  className="textPrimary"
                  onClick={handleEditClick(id)}
                  color="inherit"
               />,
               <GridActionsCellItem
                  icon={<DeleteIcon />}
                  label="Delete"
                  onClick={handleDeleteClick(id)}
                  color="inherit"
               />,
            ];
         },
      },
      {
         field: 'control_def',
         headerName: 'Control DEF',
         width: 100,
         editable: true,
         headerAlign: 'center',
         headerClassName: 'super-app-theme--header',
      },
      {
         field: 'element_dinversio',
         headerName: "Element d'inversió",
         width: 260,
         editable: true,
         headerAlign: 'center',
         headerClassName: 'super-app-theme--header',
      },
      {
         field: 'u',
         headerName: 'U',
         type: 'number',
         width: 30,
         editable: true,
         headerAlign: 'center',
         headerClassName: 'super-app-theme--header',
      },
      {
         field: 'p_u',
         headerName: 'P/U',
         type: 'number',
         width: 30,
         editable: true,
         headerAlign: 'center',
         headerClassName: 'super-app-theme--header',
      },
      {
         field: 't',
         headerName: 'T',
         type: 'number',
         width: 30,
         editable: true,
         headerAlign: 'center',
         headerClassName: 'super-app-theme--header',
      },
      {
         field: 'unitats_definitives',
         headerName: 'Unitats definitives',
         type: 'number',
         width: 150,
         editable: true,
         headerAlign: 'center',
         headerClassName: 'super-app-theme--header',
      },
      {
         field: 'preu_u_definitiu',
         headerName: 'Preu/u definitiu',
         type: 'number',
         width: 150,
         editable: true,
         headerAlign: 'center',
         headerClassName: 'super-app-theme--header',
      },
      {
         field: 'total',
         headerName: 'Total',
         type: 'number',
         width: 110,
         editable: true,
         headerAlign: 'center',
         headerClassName: 'super-app-theme--header',
      },
      {
         field: 'diferencia',
         headerName: 'Diferència',
         width: 150,
         editable: true,
         headerAlign: 'center',
         headerClassName: 'super-app-theme--header',
      },
      {
         field: 'classificacio',
         headerName: 'Classificació',
         width: 150,
         editable: true,
         headerAlign: 'center',
         headerClassName: 'super-app-theme--header',
      },
      {
         field: 'centre',
         headerName: 'Centre',
         width: 110,
         editable: true,
         headerAlign: 'center',
         headerClassName: 'super-app-theme--header',
      },
      {
         field: 'contractacio',
         headerName: 'Contractació',
         width: 150,
         editable: true,
         headerAlign: 'center',
         headerClassName: 'super-app-theme--header',
      },
      {
         field: 'previsio_execucio',
         headerName: 'Previsió execució',
         width: 150,
         editable: true,
         headerAlign: 'center',
         headerClassName: 'super-app-theme--header',
      },
      {
         field: 'estat',
         headerName: 'Estat',
         width: 110,
         editable: true,
         headerAlign: 'center',
         headerClassName: 'super-app-theme--header',
      },
      {
         field: 'data_compra',
         headerName: 'Data Compra',
         width: 150,
         editable: true,
         headerAlign: 'center',
         headerClassName: 'super-app-theme--header',
      },
      {
         field: 'data_entrega',
         headerName: 'Data Entrega',
         width: 150,
         editable: true,
         headerAlign: 'center',
         headerClassName: 'super-app-theme--header',
      },
      {
         field: 'data_factura',
         headerName: 'Data Factura',
         width: 110,
         editable: true,
         headerAlign: 'center',
         headerClassName: 'super-app-theme--header',
      },
      {
         field: 'n_factura',
         headerName: 'Nº Factura',
         width: 150,
         editable: true,
         headerAlign: 'center',
         headerClassName: 'super-app-theme--header',
      },
      {
         field: 'proveidor',
         headerName: 'Proveïdor',
         width: 150,
         editable: true,
         headerAlign: 'center',
         headerClassName: 'super-app-theme--header',
      },
   ];

   return (
      <Box sx={{
         height: '100%',
         width: '100%',
         rowBorderColor: 'var(--background-color)',
         borderColor: 'var(--background-color)',
         '& .actions': {
            color: 'text.secondary',
         },
         '& .textPrimary': {
            color: 'text.primary',
         }
      }}>
         <DataGrid
            rows={data}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            slots={{
               toolbar: EditToolbar as GridSlots['toolbar'],
            }}
            slotProps={{
               toolbar: { setRows, setRowModesModel },
            }}
            sx={{
               border: 2,
               color: 'var(--text-color)',
               backgroundColor: 'var(--bg-light)',
               borderColor: 'var(--bg-light)',
               rowBorderColor: 'var(--background-color)',
               '& .MuiDataGrid-cell:hover': {
                  backgroundColor: 'var(--bg-dark)',
               },
               '& .super-app-theme--header': {
                  backgroundColor: 'var(--bg-light)',
                  color: 'var(--text-color)',
                  borderColor: 'var(--background-color)',
                  rowBorderColor: 'var(--background-color)',
               },
               '& .MuiDataGrid-footerContainer': {
                  backgroundColor: 'var(--bg-light)',
                  borderColor: 'var(--background-color)',
               },
               '& .MuiToolbar-root, .MuiButtonBase-root': {
                  color: 'var(--text-color)'
               },
               '& .MuiDataGrid-cell, .MuiDataGrid-cell:editing .MuiDataGrid-columnHeaders .MuiDataGrid-topContainer, .MuiDataGrid-columnHeaders': {
                  borderColor: 'var(--background-color)',
                  rowBorderColor: 'var(--background-color)',
                  backgroundColor: 'var(--bg-light)',
               },

            }}
         />
      </Box>
   );
}