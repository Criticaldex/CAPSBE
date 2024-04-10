'use client'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
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

import { deleteInversions, upsertInversions } from '@/services/inversions';
import { styled } from '@mui/material/styles';

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
   border: 2,
   color: 'var(--text-color)',
   backgroundColor: 'var(--bg-light)',
   '& .super-app-theme--header': {
      backgroundColor: 'var(--bg-light)',
      color: 'var(--text-color)',
   },
   '& .MuiToolbar-root, .MuiButtonBase-root': {
      color: 'var(--text-color)'
   },
   '& .super-app-theme--Open': {
      backgroundColor: 'var(--bg-light)',
      '&:hover': {
         backgroundColor: 'var(--datagrid-hover)',
      },
      '&.Mui-selected': {
         backgroundColor: 'var(--datagrid-selected)',
         '&:hover': {
            backgroundColor: 'var(--datagrid-hover-selected)',
         },
      },
      '&.Mui-editing': {
         backgroundColor: 'var(--red)',
      },
   },
   '& .super-app-theme--Aprovat, .super-app-theme--Comprat': {
      backgroundColor: 'var(--datagrid-ok)',
      '&:hover': {
         backgroundColor: 'var(--datagrid-ok-hover)',
      },
      '&.Mui-selected': {
         backgroundColor: 'var(--datagrid-ok-selected)',
         '&:hover': {
            backgroundColor: 'var(--datagrid-ok-hover-selected)',
         },
      },
   },
   '& .super-app-theme--Rebutjat': {
      backgroundColor: 'var(--datagrid-ko)',
      '&:hover': {
         backgroundColor: 'var(--datagrid-ko-hover)',
      },
      '&.Mui-selected': {
         backgroundColor: 'var(--datagrid-ko-selected)',
         '&:hover': {
            backgroundColor: 'var(--datagrid-ko-hover-selected)',
         },
      },
   },
}));

interface EditToolbarProps {
   setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
   setRowModesModel: (
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
   ) => void;
}

function EditToolbar(props: EditToolbarProps) {
   const { setRows, setRowModesModel } = props;
   const handleClick = () => {
      //necessita 24 caracters per ser id MongoDB
      const genRanHex = (size: Number) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
      const id = genRanHex(24);
      setRows((oldRows) => [...oldRows, { id, control_def: '', element_dinversio: '', isNew: true }]);
      setRowModesModel((oldModel) => ({
         ...oldModel,
         [id]: { mode: GridRowModes.Edit, fieldToFocus: 'control_def' },
      }));
   };

   return (
      <GridToolbarContainer>
         <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
            Afegir Registre
         </Button>
      </GridToolbarContainer>
   );
}

export function AdminTable({ data, session, year }: any) {
   const initialRows: GridRowsProp = data;

   const [rows, setRows] = useState(initialRows);
   const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

   const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
      if (params.reason === GridRowEditStopReasons.rowFocusOut) {
         event.defaultMuiPrevented = true;
      }
   };

   const handleEditClick = (id: GridRowId) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
   };

   const handleSaveClick = (id: GridRowId) => () => {
      setRowModesModel({
         ...rowModesModel,
         [id]: { mode: GridRowModes.View }
      });
   };

   const handleDeleteClick = (id: GridRowId) => () => {
      confirmAlert({
         message: 'Vols eliminar el registre?',
         buttons: [
            {
               label: 'Eliminar!',
               onClick: async () => {
                  const del = await deleteInversions(id);
                  if (del) {
                     toast.error('Registre Eliminat!!', { theme: "colored" });
                     setRows(rows.filter((row) => row.id !== id));
                  }
               }
            },
            {
               label: 'Nooo!',
            }
         ]
      });
   };

   const handleCancelClick = (id: GridRowId) => () => {
      setRowModesModel({
         ...rowModesModel,
         [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });

      const editedRow = rows.find((row) => row.id === id);
      if (editedRow!.isNew) {
         setRows(rows.filter((row) => row.id !== id));
      }
   };

   const processRowUpdate = async (newRow: GridRowModel) => {
      newRow.t = (newRow.u * newRow.p_u);
      newRow.total = (newRow.unitats_definitives * newRow.preu_u_definitiu);
      newRow.diferencia = (newRow.total - newRow.t);

      const upsert = await upsertInversions({ ...newRow, any: year });

      if (upsert.lastErrorObject?.updatedExisting) {
         toast.success('Registre Modificat!', { theme: "colored" });
      } else {
         toast.success('Registre Afegit!', { theme: "colored" });
      }
      const updatedRow = { ...newRow, isNew: false };
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
      return updatedRow;
   };

   const handleProcessRowUpdateError = () => {
      toast.error("No s'han guardat els cambis!", { theme: "colored" });
   };

   const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
      setRowModesModel(newRowModesModel);
   };

   let columns: GridColDef[] = [
      {
         field: 'actions',
         type: 'actions',
         headerName: 'Actions',
         width: 70,
         cellClassName: 'actions',
         headerClassName: 'super-app-theme--header',
         getActions: ({ id }) => {
            const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
            if (isInEditMode) {
               return [
                  // eslint-disable-next-line react/jsx-key
                  <GridActionsCellItem
                     icon={< SaveIcon />}
                     label="Save"
                     sx={{
                        color: 'primary.main',
                     }}
                     onClick={handleSaveClick(id)}
                  />,
                  // eslint-disable-next-line react/jsx-key
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
               // eslint-disable-next-line react/jsx-key
               <GridActionsCellItem
                  icon={<EditIcon />}
                  label="Edit"
                  className="textPrimary"
                  onClick={handleEditClick(id)}
                  color="inherit"
               />,
               // eslint-disable-next-line react/jsx-key
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
         type: 'singleSelect',
         valueOptions: ['CR', 'Plus'],
         width: 100,
         editable: true,
         headerAlign: 'center',
         headerClassName: 'super-app-theme--header',
      },
      {
         field: 'element_dinversio',
         headerName: "Element d'inversió",
         width: 280,
         editable: true,
         headerAlign: 'center',
         headerClassName: 'super-app-theme--header',
      },
      {
         field: 'u',
         headerName: 'U',
         type: 'number',
         width: 70,
         editable: true,
         headerAlign: 'center',
         headerClassName: 'super-app-theme--header',
      },
      {
         field: 'p_u',
         headerName: 'P/U',
         type: 'number',
         width: 70,
         editable: true,
         headerAlign: 'center',
         headerClassName: 'super-app-theme--header',
      },
      {
         field: 't',
         headerName: 'T',
         type: 'number',
         width: 70,
         editable: false,
         headerAlign: 'center',
         headerClassName: 'super-app-theme--header',
      },
      {
         field: 'unitats_definitives',
         headerName: 'Unitats definitives',
         type: 'number',
         width: 130,
         editable: true,
         headerAlign: 'center',
         headerClassName: 'super-app-theme--header',
      },
      {
         field: 'preu_u_definitiu',
         headerName: 'Preu/u definitiu',
         type: 'number',
         width: 110,
         editable: true,
         headerAlign: 'center',
         headerClassName: 'super-app-theme--header',
      },
      {
         field: 'total',
         headerName: 'Total',
         type: 'number',
         width: 60,
         editable: false,
         headerAlign: 'center',
         headerClassName: 'super-app-theme--header',
      },
      {
         field: 'diferencia',
         headerName: 'Diferència',
         type: 'number',
         width: 80,
         editable: false,
         headerAlign: 'center',
         headerClassName: 'super-app-theme--header',
      },
      {
         field: 'classificacio',
         headerName: 'Classificació',
         type: 'singleSelect',
         valueOptions: [
            '',
            'MAQUINARIA I APARELLS US CLINIC',
            'MOBILIARI ÚS CLINIC',
            'MOBILIARI ÚS NO CLINIC',
            'CONSTRUCCIONS',
            "EQUIP PROCESSOS D'INFORMACIÓ (HARDWARE)",
            "EQUIPS I PROCESSOS D'INFORMACIÓ (SOFTWARE)",
            'ALTRE IMMOBILITZAT'
         ],
         width: 150,
         editable: true,
         headerAlign: 'center',
         headerClassName: 'super-app-theme--header',
      },
      {
         field: 'centre',
         headerName: 'Centre',
         type: 'singleSelect',
         valueOptions: [
            '',
            'Casanova',
            'Comte Borrell',
            'Les Corts',
            'Odontologia',
            'Unitat Docent',
            'Nutricionistes',
            'Recerca',
            'UTSI',
            'Pediatria'
         ],
         width: 110,
         editable: true,
         headerAlign: 'center',
         headerClassName: 'super-app-theme--header',
      },
      {
         field: 'contractacio',
         headerName: 'Contractació',
         type: 'singleSelect',
         valueOptions: [
            '',
            'Contracte Menor',
            'Expedient licitació'
         ],
         width: 150,
         editable: true,
         headerAlign: 'center',
         headerClassName: 'super-app-theme--header',
      },
      {
         field: 'previsio_execucio',
         headerName: 'Previsió execució',
         type: 'singleSelect',
         valueOptions: [
            '',
            '1r trimestre',
            '2n trimestre',
            '3r trimestre',
            '4t trimestre',
         ],
         width: 130,
         editable: true,
         headerAlign: 'center',
         headerClassName: 'super-app-theme--header',
      },
      {
         field: 'estat',
         headerName: 'Estat',
         type: 'singleSelect',
         valueOptions: [
            '',
            'Aprovat',
            'Rebutjat',
            'Comprat',
            'Lliurat pel proveïdor',
         ],
         width: 150,
         editable: true,
         headerAlign: 'center',
         headerClassName: 'super-app-theme--header',
      },
      {
         field: 'data_compra',
         headerName: 'Data Compra',
         type: 'date',
         width: 100,
         editable: true,
         headerAlign: 'center',
         headerClassName: 'super-app-theme--header',
         valueGetter: (value, row, column, apiRef) => {
            return new Date(value);
         }
      },
      {
         field: 'data_entrega',
         headerName: 'Data Entrega',
         type: 'date',
         width: 100,
         editable: true,
         headerAlign: 'center',
         headerClassName: 'super-app-theme--header',
         valueGetter: (value, row, column, apiRef) => {
            return new Date(value);
         }
      },
      {
         field: 'data_factura',
         headerName: 'Data Factura',
         type: 'date',
         width: 100,
         editable: true,
         headerAlign: 'center',
         headerClassName: 'super-app-theme--header',
         valueGetter: (value, row, column, apiRef) => {
            return new Date(value);
         }
      },
      {
         field: 'n_factura',
         headerName: 'Nº Factura',
         width: 100,
         editable: true,
         headerAlign: 'center',
         headerClassName: 'super-app-theme--header',
      },
      {
         field: 'proveidor',
         headerName: 'Proveïdor',
         type: 'singleSelect',
         valueOptions: [
            '',
            'MEINSA S.L.',
            'SONMEDICA S.L.',
            'ASMEDIC S.L.',
            'ARJO IBERICA S.L.U.',
            'INQUALAB DISTRIBUCIONES, S.L.',
         ],
         width: 300,
         editable: true,
         headerAlign: 'center',
         headerClassName: 'super-app-theme--header',
      },
   ];

   if (session.user.role == '2') {
      columns = [
         {
            field: 'element_dinversio',
            headerName: "Element d'inversió",
            width: 800,
            editable: false,
            headerAlign: 'center',
            headerClassName: 'super-app-theme--header',
         },
         {
            field: 'u',
            headerName: 'U',
            type: 'number',
            width: 70,
            editable: false,
            headerAlign: 'center',
            headerClassName: 'super-app-theme--header',
         },
         {
            field: 'centre',
            headerName: 'Centre',
            type: 'singleSelect',
            valueOptions: [
               '',
               'Casanova',
               'Comte Borrell',
               'Les Corts',
               'Odontologia',
               'Unitat Docent',
               'Nutricionistes',
               'Recerca',
               'UTSI',
               'Pediatria'
            ],
            width: 110,
            editable: false,
            headerAlign: 'center',
            headerClassName: 'super-app-theme--header',
         },
         {
            field: 'contractacio',
            headerName: 'Contractació',
            type: 'singleSelect',
            valueOptions: [
               '',
               'Contracte Menor',
               'Expedient licitació'
            ],
            width: 150,
            editable: false,
            headerAlign: 'center',
            headerClassName: 'super-app-theme--header',
         },
         {
            field: 'previsio_execucio',
            headerName: 'Previsió execució',
            type: 'singleSelect',
            valueOptions: [
               '',
               '1r trimestre',
               '2n trimestre',
               '3r trimestre',
               '4t trimestre',
            ],
            width: 130,
            editable: false,
            headerAlign: 'center',
            headerClassName: 'super-app-theme--header',
         },
         {
            field: 'estat',
            headerName: 'Estat',
            type: 'singleSelect',
            valueOptions: [
               '',
               'Aprovat',
               'Rebutjat',
               'Comprat',
               'Lliurat pel proveïdor',
            ],
            width: 150,
            editable: false,
            headerAlign: 'center',
            headerClassName: 'super-app-theme--header',
         },
         {
            field: 'data_compra',
            headerName: 'Data Compra',
            type: 'date',
            width: 100,
            editable: false,
            headerAlign: 'center',
            headerClassName: 'super-app-theme--header',
            valueGetter: (value, row, column, apiRef) => {
               return new Date(value);
            }
         },
         {
            field: 'data_entrega',
            headerName: 'Data Entrega',
            type: 'date',
            width: 100,
            editable: false,
            headerAlign: 'center',
            headerClassName: 'super-app-theme--header',
            valueGetter: (value, row, column, apiRef) => {
               return new Date(value);
            }
         },
         {
            field: 'proveidor',
            headerName: 'Proveïdor',
            type: 'singleSelect',
            valueOptions: [
               '',
               'MEINSA S.L.',
               'SONMEDICA S.L.',
               'ASMEDIC S.L.',
               'ARJO IBERICA S.L.U.',
               'INQUALAB DISTRIBUCIONES, S.L.',
            ],
            width: 300,
            editable: false,
            headerAlign: 'center',
            headerClassName: 'super-app-theme--header',
         },
      ];
   }

   return (
      <Box sx={{
         height: '90vh',
         width: '100%'
      }} >
         <ToastContainer />
         {session.user.role != '2' &&
            <StyledDataGrid
               rows={rows}
               columns={columns}
               editMode="row"
               rowModesModel={rowModesModel}
               onRowModesModelChange={handleRowModesModelChange}
               onRowEditStop={handleRowEditStop}
               processRowUpdate={processRowUpdate}
               onProcessRowUpdateError={handleProcessRowUpdateError}
               slots={{
                  toolbar: EditToolbar as GridSlots['toolbar'],
               }}
               slotProps={{
                  toolbar: { setRows, setRowModesModel },
               }}
               getRowClassName={(params) => `super-app-theme--${params.row.estat}`}
            />
         }
         {session.user.role == '2' &&
            <StyledDataGrid
               rows={rows}
               columns={columns}
               getRowClassName={(params) => `super-app-theme--${params.row.estat}`}
            />
         }
      </Box >
   );
}
