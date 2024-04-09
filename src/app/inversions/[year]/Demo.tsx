'use client'
import * as React from 'react';
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

import {
   randomCreatedDate,
   randomTraderName,
   randomId,
   randomArrayItem,
} from '@mui/x-data-grid-generator';

const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
   return randomArrayItem(roles);
};

const initialRows2: GridRowsProp = [
   {
      id: randomId(),
      name: randomTraderName(),
      age: 25,
      joinDate: randomCreatedDate(),
      role: randomRole(),
   },
   {
      id: randomId(),
      name: randomTraderName(),
      age: 36,
      joinDate: randomCreatedDate(),
      role: randomRole(),
   },
   {
      id: randomId(),
      name: randomTraderName(),
      age: 19,
      joinDate: randomCreatedDate(),
      role: randomRole(),
   },
   {
      id: randomId(),
      name: randomTraderName(),
      age: 28,
      joinDate: randomCreatedDate(),
      role: randomRole(),
   },
   {
      id: randomId(),
      name: randomTraderName(),
      age: 23,
      joinDate: randomCreatedDate(),
      role: randomRole(),
   },
];

const initialRows: GridRowsProp = [
   {
      _id: "660babc976a430756676da1f",
      control_def: "CR",
      element_dinversio: "Acondicionament relax professionals",
      u: 1,
      p_u: 0,
      t: 0,
      unitats_definitives: 0,
      preu_u_definitiu: 0,
      total: 0,
      diferencia: 0,
      classificacio: "CONSTRUCCIONS",
      centre: "Les Corts",
      contractacio: "Contracte Menor",
      previsio_execucio: null,
      estat: "Lliurat pel proveïdor",
      data_compra: "12/21/2023",
      data_entrega: "12/21/2023",
      data_factura: "12/21/2023",
      n_factura: "20240007",
      proveidor: "INQUALAB DISTRIBUCIONES, S.L.",
      any: "2024",
      id: "660babc976a430756676da1f"
   },
   {
      _id: "660d15fa4dac723a05e272bf",
      control_def: "CR",
      element_dinversio: "Acondicionament relax professionals",
      u: 2,
      p_u: 0,
      t: 0,
      unitats_definitives: 0,
      preu_u_definitiu: 0,
      total: 0,
      diferencia: 0,
      classificacio: "CONSTRUCCIONS",
      centre: "Les Corts",
      contractacio: "Contracte Menor",
      previsio_execucio: null,
      estat: "Lliurat pel proveïdor",
      data_compra: "12/21/2023",
      data_entrega: "12/21/2023",
      data_factura: "12/21/2023",
      n_factura: "20240007",
      proveidor: "INQUALAB DISTRIBUCIONES, S.L.",
      any: "2024",
      id: "660d15fa4dac723a05e272bf"
   }
];

interface EditToolbarProps {
   setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
   setRowModesModel: (
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
   ) => void;
}

function EditToolbar(props: EditToolbarProps) {
   // console.log('props Demo: ', props);

   const { setRows, setRowModesModel } = props;

   const handleClick = () => {
      const id = randomId();
      console.log('RowsdDemo: ', initialRows);
      setRows((oldRows) => [...oldRows, { id, control_def: '', element_dinversio: '', isNew: true }]);
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

export default function FullFeaturedCrudGrid() {
   console.log('initialRowsDemo: ', initialRows);

   const [rows, setRows] = React.useState(initialRows);
   const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
   console.log('rowsDemo: ', rows);

   const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
      if (params.reason === GridRowEditStopReasons.rowFocusOut) {
         event.defaultMuiPrevented = true;
      }
   };

   const handleEditClick = (id: GridRowId) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
   };

   const handleSaveClick = (id: GridRowId) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
   };

   const handleDeleteClick = (id: GridRowId) => () => {
      setRows(rows.filter((row) => row.id !== id));
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

   const processRowUpdate = (newRow: GridRowModel) => {
      const updatedRow = { ...newRow, isNew: false };
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
      return updatedRow;
   };

   const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
      setRowModesModel(newRowModesModel);
   };

   const columns2: GridColDef[] = [
      { field: 'name', headerName: 'Name', width: 180, editable: true },
      {
         field: 'age',
         headerName: 'Age',
         type: 'number',
         width: 80,
         align: 'left',
         headerAlign: 'left',
         editable: true,
      },
      {
         field: 'joinDate',
         headerName: 'Join date',
         type: 'date',
         width: 180,
         editable: true,
      },
      {
         field: 'role',
         headerName: 'Department',
         width: 220,
         editable: true,
         type: 'singleSelect',
         valueOptions: ['Market', 'Finance', 'Development'],
      },
      {
         field: 'actions',
         type: 'actions',
         headerName: 'Actions',
         width: 100,
         cellClassName: 'actions',
         getActions: ({ id }) => {
            const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

            if (isInEditMode) {
               return [
                  // eslint-disable-next-line react/jsx-key
                  <GridActionsCellItem
                     icon={<SaveIcon />}
                     label="Save"
                     sx={{
                        color: 'primary.main',
                     }}
                     onClick={handleSaveClick(id)}
                  />,
                  // eslint-disable-next-line react/jsx-key
                  <GridActionsCellItem
                     icon={<CancelIcon />}
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
   ];

   const columns: GridColDef[] = [
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
      <Box
         sx={{
            height: '100%',
            width: '100%',
            '& .actions': {
               color: 'text.secondary',
            },
            '& .textPrimary': {
               color: 'text.primary',
            },
         }}
      >
         <DataGrid
            rows={rows}
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
         />
      </Box>
   );
}
