// eslint-disable-next-line import/named
import { DataGridPro, GridCellParams } from '@mui/x-data-grid-pro';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import uploadDataColDefs from './UploadDataColDefs.tsx';

interface UploadDataGridProps {
    data: any[];
    headers: any[];
    handleDelete: (id: any) => void;
    handleShowCellErrors: (cell: GridCellParams) => void;
}

const UploadDataGrid = ({
    data,
    headers,
    handleDelete,
    handleShowCellErrors,
}: UploadDataGridProps) => {
    const { t } = useTranslation();
    return (
        <Box
            sx={{
                '& .super-app-theme--cell': {
                    backgroundColor: 'rgba(224, 183, 60, 0.55)',
                    color: '#1a3e72',
                    fontWeight: '600',
                },
                '& .super-app.warning': {
                    backgroundColor: '#FFEAD5',
                    color: '#262626',
                    fontWeight: '600',
                },
                '& .super-app.negative': {
                    backgroundColor: '#FFE4E8',
                    color: '#B42318',
                    fontWeight: '600',
                },
            }}
        >
            <DataGridPro
                sx={{
                    '.MuiDataGrid-cell:focus': {
                        outline: 'none',
                    },
                    // pointer cursor on ALL rows
                    '& .MuiDataGrid-row:hover': {
                        cursor: 'pointer',
                    },
                }}
                getRowId={(row) => {
                    return row.REF;
                }}
                disableRowSelectionOnClick
                rows={data}
                columns={uploadDataColDefs(t, headers, handleDelete)}
                pagination
                initialState={{
                    pagination: { paginationModel: { pageSize: 15 } },
                }}
                pageSizeOptions={[5, 15, 25]}
                onCellClick={(e) => {
                    if (e.colDef.field === 'delete') return;

                    handleShowCellErrors(e);
                }}
            />
        </Box>
    );
};

export default UploadDataGrid;
